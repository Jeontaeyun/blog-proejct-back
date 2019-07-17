const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('koa-session');
//.env파일 적용하는 문법
dotenv.config();

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

app.listen(port, () => {
    console.log('listening to port', port);
});