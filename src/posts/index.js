const Router = require('koa-router');

const posts = new Router();

posts.get('/', (ctx)=>{
   ctx.body = "api라우팅 성공"; 
});

 module.exports= posts;