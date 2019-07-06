const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const api = require('./api');
const posts = require('./posts');

router.use('/api', api.routes());           //api 라우트 적용
router.use('/posts', posts.routes());
// app 인스턴스에 라우팅을 적용하기 전에 bodyParser를 넣어줘야 라우트안에서 bodyParser를 사용할 수 있다.
app.use(bodyParser());
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000');
});