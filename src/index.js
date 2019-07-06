const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const api = require('./api');
const posts = require('./posts');

router.use('/api', api.routes());           //api 라우트 적용
router.use('/posts', posts.routes());

router.get('/', (ctx)=>{
   ctx.body = "홈"; 
});

router.get('/about', (ctx)=>{
   ctx.body = "소개"; 
});

router.get('/post/:postId', (ctx)=>{
    const {postId} = ctx.params;
    ctx.body = postId + "소개"; 
 });

// app 인스턴스에 라우터 적용코드
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000');
});