const Post = require('../../models/post');
const {ObjectId} = require('mongoose').Types;
const Joi = require('joi');

/*포스트 작성| POST /api/posts*/
exports.write= async (ctx) => {
    const schema = Joi.object.keys({
        title: Joi.string().required(),
        body: Joi.string().require(),
        tags: Joi.array().items(Joi.string()).required()
    });

    const result = Joi.validate(ctx.request.body, schema);
    
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    const post = new Post ({
       title,body,tags
    });
    try{
    await post.save();  // 데이터베이스에 save()메소드를 통해서 등록합니다.
    ctx.body = post;    // 저장된 결과를 반환합니다.
    console.log('hi');
    }
    catch(e){
       // 데이터베이스의 오류가 발생합니다.
       console.log(e);
       ctx.throw(e,500);
    }
};

/*포스트 목록 조회 GET /api/posts*/

exports.list = async (ctx) => {

    const page = parseInt(ctx.query.page || 1, 10);
    // 잘못된 페이지가 주어졌다면 오류
    if(page<1){
        ctx.status = 400;
        return;
    }

    try{
        //sort({key: 1 or -1}) | key값을 기준으로 1은 오름차순으로 정렬, -1은 내림차순으로 정렬
        //list(value) | 한 번에 보이는 개수를 제한하는 함수
        const posts = await Post.find().sort({_id : -1}).limit(10).skip((page-1)*10).exec();
        const postCount = await Post.count().exec();
        //마지막 페이지 알려주기
        //ctx.set은 response haeder를 설정
        ctx.set('Last-Page', Math.ceil(postCount/10));
        // 본문 내용이 200자 이상 넘을 때 ...으로 표현하는 기법
        const limitBodyLength = post => ({
            ...post.toJson(),
            body: post.body.length < 200? post.body : `${post.body.slice(0,200)}...`
        });
        // 위 아래와 같이 map을 다음과 같이 스플리팅 할 수 있다.
        ctx.body = posts.map(limitBodyLength);
    }
    catch(e){
        ctx.throw(e, 500);
    }
};

/*특정 포스트 조회 GET /api/posts/:id */

exports.read = async (ctx) => {
   const {id} = ctx.params;
   try{
    const post = await Post.findById(id).exec();
    //포스트가 존재하지 않을 때
    if(!post){
       ctx.status = 404;
       return;
    }
    ctx.body = post;
   }
   catch(e){
       ctx.throw(e, 500);
   }
};

/*특정 포스트 제거 DELETE /api/posts/:id */

exports.remove = async (ctx) => {
   const {id} = ctx.params;
   try{
       await Post.findByIdAndRemove(id).exec();
       // exec()은 어떤 역할을 하는 것일까?
       ctx.status = 204;
   }
   catch(e){
       ctx.throw(e, 500);
   }
};

/* 포스트 수정(특정 필드 변경) PATCH /api/posts/:id
PATCH 메서드는 주어진 필드만 교체합니다.
*/

exports.update = async (ctx) => {

    const schema = Joi.object.keys({
        title: Joi.string().required(),
        body: Joi.string().require(),
        tags: Joi.array().items(Joi.string()).required()
    });

    const result = Joi.validate(ctx.request.body, schema);
    
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {id} = ctx.prams;
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            // 이 값을 설정해야 업데이트 된 객체를 반환합니다.
            // 설정하지 않으면 업데이트 되기 전의 객체를 반환합니다.
        });
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    }
    catch(e){
        ctx.throw(e, 500);
    }
};

// DB에서 자동으로 설정해주는 id값이 유효한지 판단하는 함수

exports.checkObjectId = (ctx, next) => {
    const {id} = ctx.params;
    
    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return null;
    }
    return next();
}