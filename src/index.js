const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('koa-session');
const ssr = require('./ssr');
const serve = require('koa-static');
//.env파일 적용하는 문법
dotenv.config();

// 프론트엔드 디렉터리의 build 디렉터리를 파라미터로 넣어주면 웹 서버를 이용하여 build 디렉터리 안에 있는 파일에 접근할 수 있습니다.
const staticPath = path.join(__dirname,'../../blogproject/build');

//.env파일의 변수는 process.env에 저장됨
const {PORT : port, MONGO_URI : mongoURI, COOKIE_SIGN_KEY : signKey } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useNewUrlParser: true}).then(()=>{
    console.log('connected to mongodb');
}).catch((e)=>{
    console.error(e);
});

const app = new Koa();
const router = new Router();

const api = require('./api');
router.get('/', ssr);
router.use('/api', api.routes());           //api 라우트 적용
// app 인스턴스에 라우팅을 적용하기 전에 bodyParser를 넣어줘야 라우트안에서 bodyParser를 사용할 수 있다.
app.use(bodyParser());
// 세션, 키 적용
const sessionConfig = {
    maxAge: 86400000,       // 하루
    signed: true            // 기본값
}
// 세션을 적용하는 방법
app.use(session(sessionConfig, app));
app.keys = [signKey];
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());
// 일치하는 것이 없으면 ssr을 실행한다.
app.use(ssr);

app.listen(port, () => {
    console.log('listening to port', port);
});