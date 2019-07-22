/*
클라이언트에서 사용하는 라이브러리 중 웹 브라우저에만 존재하는 window, document, navigator 등의 값을 사용할 때가 있습니다.
이 객체들을 필요할 때만 호출하는 함수에서 조회하는 것은 문제없지만, 로딩 과정에서 조회하면 이 값들이 undefined이므로 오류가 발생합니다.
이를 위해 Node.js에서 웹 브라우저에만 존재하는 객체들을 조회해도 오류가 발생하지 않도록 가상의 웹 브라우저 환경을 설정하는 라이브러리인
browserr-env를 사용합니다.
 */
require('browser-env')();
const render = require('./render').default;
const manifest = require('./asset-manifest.json');

const buildHtml = (rendered) => {
    return `
    <!doctype html>
    <html lang="en">
        <head>
        <meta charset="utf-8"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <link rel="manifest" href="${manifest['main.css']}"/>
        <title>BLOG PROJECT</title>
        <link href="/static/css/main.216f714f.css" rel="stylesheet">
        </head>
        <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${rendered}</div>
        <script src="${manifest['main.js']}"></script>
        </body>
        </html>
    `
}

module.exports = async (ctx) => {
    const rendered = render(ctx);
    ctx.body = buildHtml(rendered);
}