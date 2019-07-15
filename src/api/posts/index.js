const Router = require('koa-router');
const postCtrl = require('./index.ctrl');

const posts = new Router();

posts.get('/:page',postCtrl.list);
posts.post('/',postCtrl.write);
posts.get('/id/:id',postCtrl.checkObjectId,postCtrl.read);
posts.delete('/:id',postCtrl.checkObjectId,postCtrl.remove);
posts.patch('/:id',postCtrl.checkObjectId,postCtrl.update);

module.exports = posts;