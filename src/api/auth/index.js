const Router = require('koa-router');

const auth = new Router();
const authCtrl = require('./index.ctrl');

auth.post('/login', authCtrl.login);
auth.get('/checkLogin', authCtrl.checkLogin);
auth.post('/logout', authCtrl.logout);

module.exports = auth;
