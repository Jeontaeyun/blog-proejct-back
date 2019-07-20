const { ADMIN_PASS : adminPass } = process.env;

exports.login = (ctx) => {
    const {password} = ctx.request.body;
    if(adminPass === password){
        ctx.body = {
            success: true
        };
        // 로그인에 성공하면 logged 값을 true로 변경
        ctx.session.logged = true;
    }
    else{
        ctx.body = {
            success: false
        }
        ctx.status = 401; // Unauthorized
    }
};

exports.checkLogin = (ctx) => {
    ctx.body = {
        /* !! 문자를 두번 입력하여 값이 존재하지 않을 때도 false를 반환하도록 설정합니다. undefined나 null 방지 */
        logged: !!ctx.session.logged
    };
};

exports.logout = (ctx) => {
    // session 값을 설정할 때는 "ctx.session.이름 = 값" 형식을 사용.
    // session 값을 상요할 때는 "ctx.session.이름" 형식으로 사용.
    // session 을 파기할 때는 "ctx.session = null"을 통해서 파기한다.
    ctx.session = null;
    ctx.status = 204;   //No Content
};