/*
클라이언트에서 사용하는 라이브러리 중 웹 브라우저에만 존재하는 window, document, navigator 등의 값을 사용할 때가 있습니다.
이 객체들을 필요할 때만 호출하는 함수에서 조회하는 것은 문제없지만, 로딩 과정에서 조회하면 이 값들이 undefined이므로 오류가 발생합니다.
이를 위해 Node.js에서 웹 브라우저에만 존재하는 객체들을 조회해도 오류가 발생하지 않도록 가상의 웹 브라우저 환경을 설정하는 라이브러리인
browserr-env를 사용합니다.
 */
require('browser-env')();
const render = require('./render').default;
const manifest = require('../../../blogproject/build/asset-manifest.json');

const buildHtml = ({html, preloadedState, helmet}) => {
    // Helmet을 통해 받아온 meta와 title을 바인딩해준다.
    const {title, meta} = helmet;
    return `
    <!doctype html>
    <html lang="en">
        <head>
        <meta charset="utf-8"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        ${meta.toString()}
        <link rel="manifest" href="/manifest"/>
        ${title.toString()}
        <link href="${manifest['files']['app.css']}" rel="stylesheet">
        </head>
        <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${html}</div>
        <script>
            window.__PRELOADED_STATE__=${preloadedState}
        </script>
        <script src="${manifest['files']['app.js']}"></script>
        <script src="${manifest['files']['runtime~app.js']}"></script>
        <script src="${manifest['files']['runtime~vendor.js']}"></script>
        <script src="${manifest['files']['vendor.js']}"></script>
        <script src="${manifest['files']['precache-manifest.3564be287c8c860b2466210cdf5e2fb4.js']}"></script>
        </body>
        </html>
    `
}
// 프론트에서 빌드한 프론트 엔드의 Application의 브라우저에 대한 js파일을 모두 넣어주어야 정상 동작한다.
// Helmet이 바로 동작하지 않고 1번 새로고침을 해야지 동작한다.
module.exports = async (ctx) => {
    try{
        const rendered = await render(ctx);
        console.log(rendered);
        ctx.body = buildHtml(rendered);
    }
    catch(e){
        ctx.body = buildHtml({})
    }
}