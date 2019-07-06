const Router = require('koa-router');
const postCtrl = require('./index.ctrl');

const posts = new Router();

posts.get('/',postCtrl.list);
posts.post('/',postCtrl.write);
posts.get('/',postCtrl.read);
posts.delete('/:id',postCtrl.remove);
posts.put('/:id',postCtrl.replace);
posts.patch('/:id',postCtrl.update);

module.exports = posts;