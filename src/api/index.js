const Router = require('koa-router');

const api = new Router();

api.get('/', (ctx)=>{
   ctx.body = "api라우팅 성공"; 
});

 module.exports= api;