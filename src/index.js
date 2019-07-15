const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//.env파일 적용하는 문법
dotenv.config();

//.env파일의 변수는 process.env에 저장됨
const {PORT, MONGO_URI : mongoURI} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useNewUrlParser: true}).then(()=>{
    console.log('connected to mongodb');
}).catch((e)=>{
    console.error(e);
});

const app = new Koa();
const router = new Router();

const api = require('./api/posts');

router.use('/api/posts', api.routes());           //api 라우트 적용
// app 인스턴스에 라우팅을 적용하기 전에 bodyParser를 넣어줘야 라우트안에서 bodyParser를 사용할 수 있다.
app.use(bodyParser());
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port', PORT);
});