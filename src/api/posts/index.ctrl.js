let postId = 1;

const posts = [
   {
      id: 1,
      title: '제목',
      body: '내용'
   }
];

/*포스트 작성| POST /api/posts*/

exports.write= (ctx) => {
   const { title, body } = ctx.request.body;
   postId += 1;
   const newPost = {
      id: postId,
      title,
      body
   };
   posts.push(newPost);
   ctx.body = post;
};

/*포스트 목록 조회 GET /api/posts*/

exports.list = (ctx) => {
   ctx.body = posts;
};

/*특정 포스트 조회 GET /api/posts/:id */

exports.read = (ctx) => {
   const {id} = ctx.params;
   const post = posts.find(post => post.id.toString() === id);
   if(!post){
      ctx.status = 404;
      ctx.body = {
         message: '포스트가 존재하지 않습니다.'
      };
      return;
   }
   ctx.body = post;
};

/*특정 포스트 제거 DELETE /api/posts/:id */

exports.remove = (ctx) => {
   const {id} = ctx.params;
   const index = posts.findIndex(post => post.id.toString() === id);

   // 포스트가 없으면 오류를 반환
   if(index === -1){
    ctx.status = 404;
    ctx.body = {
        message: '포스트가 존재하지 않습니다.'
    };
    return;
   }
   posts.splice(index, 1);
   ctx.status= 204;
};

/*포스트 수정(교체) PUT /api/posts/:id {title, body} */

exports.replace = (ctx) => {
    const {id} = ctx.prams;

    const index = posts.findIndex(post => post.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        };
        return;
    }
    posts[index] = {
        id,
        ...ctx.request.body
    };
    ctx.body = posts[index];
};

/* 포스트 수정(특정 필드 변경) PATCH /api/posts/:id
PATCH 메서드는 주어진 필드만 교체합니다.
*/

exports.update = (ctx) => {
    const {id} = ctx.prams;

    const index = posts.findIndex(post => post.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않습니다.'
        };
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    };
    ctx.body = posts[index];
};