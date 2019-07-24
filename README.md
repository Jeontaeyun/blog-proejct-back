# 리액트 블로그 프로젝트 - 백엔드

## 01. 프로젝트 개요

### (01) 프로젝트 스택

- **Language** : Node.js

- **Framework** : Koa.js, koa-router(Routing)

- **Database** : MongoDB, Mongoose(ODM)

#### 02) 프론트 엔드

## 02. 프로젝트 이론

### (01) 백 엔드 서버 Koa

#### 01) Koa 프레임 워크 설치 및 환경설정

- ``` yarn init ``` 을 통해서 NODE.js 프로젝트를 생성합니다.

- ``` yarn add koa ```를 통해 koa 프레임워크를 설치합니다.

#### 02) ESLint 설정

- 서버 파일을 작성하기 전에 자바스크립트 문법과 코드 스타일을 검토하는 ESLint 도구를 설치합니다.

- ``` yarn global add eslint  ```를 통해 ESLint를 설치합니다.

- ``` eslint --init ``` 명령어를 통해서 ESLint를 적용합니다.

- .eslintrc.js 파일을 통해 ESlLint를 커스터마이징 할 수 있습니다.

```javascript
module.exports = {
    "extends" : "airbnb-base",
    "rules" : {
        /*0: 아무것도 안함, 1: 경고, 2:오류*/
        "no-unused-vars" : 1,
        "comma-dangle" : 0,
        "eol-last" : 0,
        "no-console" : 0
    }
};
```

- ESLint는 반드시 사용해야 하는 것은 아니며 디버깅을 원활하게 하고, 좀 더 깨끗한 코드를 작성하려고 사용합니다.

#### 03) Nodemon 사용

- 서버 코드를 변경할 때마다 서버를 재시작하는 번거로운 작업을 자동으로 해주는 개발용 모듈

- ``` yarn add --dev nodemon ``` 으로 설치

- package.json 파일의 scripts 부분에서 nodemon을 사용하는 스크립트를 생성할 수 있습니다.

```javascript
...

"scripts" : {
    "start" : "node src",
    "dev" : "nodemon src/index.js"
}

...
```

### (02) REST API | Representational State Transfer

- 웹 어플리케이션을 만들려면 데이터베이스에 정보를 입력하고 읽어오는 CRUD의 기능을 수행해야 합니다. 하지만 웹 브라우저에서 데이터베이스에 직접 접속해서 데이터를 변경한다면 보안상 문제가 생기게 됩니다.

- 이런 보안 상의 문제를 해결하기 위해 우리는 REST API를 만들어서 사용합니다.

#### 01) 컨트롤러 Controller

- 해당 API들의 처리 함수만 모아 놓은 파일을 컨틀로러라고 합니다. 컨트롤러에서는 백엔드 기능을 구현합니다.

#### 02) BodyParser

- 해당 미들웨어는 **POST/PUT/PATCH 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어 주면, 이를 파싱하여 서버에서 사용할 수 있도록 합니다.**

#### 03) 프록시(Proxy) 기능

- 웹팩의 프록시 기능을 사용하면 개발 서버로 들어온 요청을 백엔드 서버에 전달하고, 응답을 그대로 반환할 수 있습니다.

- package.json에서 프록시 설정을 추가해주면 됩니다.

```json
{
    (...)
    "proxy": "http://localhost: 4000"
}
```

#### 04) axios

- REST API 웹 요청을 프로미스 기반으로 간편하게 할 수 있는 라이브러리

### (03) Mongo DB | 몽고디비

#### 01) Mongo DB 란?

- 관계형 데이터 베이스(RDBMS)인 MySQL, Oracle DB, PostgreSQL 등은 데이터 스키마가 고정적이라는 것과 확장성이 낮다는 한계가 있습니다.

    - 새로 등록하는 데이터의ㅣ 형식이 기존에 있던 데이터와 다르면 기존 데이터를 모두 수정해야 합니다.

    - RDBMS는 저장하고 처리해야 할 데이터양이 늘어나면 해당 데이터 베이ㅣ스 서버의 성능을 업그레이드 하는 방식으로 확장해주어야 합니다.

- MongoDB는 이런 한계를 극복한 문서 지향적 NoSQL 데이터베이스입니다. MongoDB에 저장하는 데이터들은 유동적인 스키마를 지닐 수 있습니다.

- 서버의 데이터 양이 늘어나도 한 컴퓨터에서만 처리하는 것이 아니라 여러 컴퓨터로 분산하여 처리할 수 있도록 확장하기 쉽게 설계되어 있습니다.

#### 02) Document 문서란?

- RDBMS의 레코드(Record)와 비슷한 개념. 문서의 데이터 구조는 한 개 이상의 key-value 쌍으로 되어 있습니다.

- MongoDB의 문서 예시

```javascript
{
    "_id": "jow1813",
    "name": "Stark",
    "pass": "wfewjqfqhgoiqhweofijwefijwo"
}
```

- 문서는 BSON(바이너리 형태의 JSON) 형태로 저장합니다. 그렇기 때문에 나중에 JSON 형태의 객체를 데이터베이스에 저장할 때, 큰 공수를 들이지 않고도 데이터를 데이터베이스에 등록할 수 있어 편리합니다. 

- MongoDB는 다른 스키마를 가지고 있는 문서들이 한 컬렉션에서 공존할 수 있습니다. MongoDB 안의 데이터가 같은 스키마를 가지고 있을 필요가 없으므로 그냥 넣어 주면 됩니다.

#### 03) MongoDB 설치

- ``` brew update ```

- ``` brew install mongodb ```

- ``` brew services start mongodb ```

- 이후 터미널에 **mongo** 키워드를 입력하면 MongoDB가 제대로 동작하는지 확인할 수 있다.

### (04) Mongoose | 몽구스

#### 01) Mongoose 란?

- mongoose는 Node.js 환경에서 사용하는 **MongoDB 기반 ODM(Object Data Modeling) 라이브러리 입니다.**

- 이 라이브러리를 통해 데이터베이스 문서들을 자바스크립트 객체처럼 사용할 수 있습니다.

- ``` yarn add mongoose dotenv ``` 릍 통해 설치

- **dotenv**는 환경변수들을 파일에 넣고 사용할 수 있게 하는 개발 도구입니다. 몽구스를 연결할 때 이용하는 서버 계정과 비밀번호등을 보관하는 역활을 합니다.

#### 02) Mongoose와 Koa 연결하기

```javascript
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {useNewUrlParser: true}).then(()=>{
    console.log('connected to mongodb');
}).catch((e)=>{
    console.error(e);
});
```

- MONGO_URI는 환경변수로 .env파일에 저장해주며 데이터베이스가 없다면 자동으로 만드므로 사전에 따로 생성할 필요는 없다.

#### 03) 데이터베이스의 스키마와 모델

- **스키마 Schema** : 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체

- **모델 Model** : 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체

- 모델을 만들기 위해서는 사전에 스키마를 만들어 주어야 한다.

- 스키마를 만들기 위해서는 **mongoose 모듈의 Schema를 사용**하여 정의 합니다.

- 모델을 만들 때는 **mongoose.model** 함수를 사용합니다.

- 모델과 스키마 관련 코드는 보통 **src/models** 디렉토리에 저장한다.

```javascript

const mongoose = require('mongoose');

const {Schema} = mongoose;

/*스키마 생성 함수*/
const Post = new Schema({
    title : String,
    body : String,
    tags : [String],
    publishedDate: {
        type: Date,
        default: new DataCue()
    }
});

/*모델 생성 함수*/
module.exports = mongoose.model('Post', Post);
/*
mongoose.model('스키마 이름','스키마 객체')
데이터베이스는 스키마 이름을 정해주면 이 이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만듭니다.
*/

```

#### 04) Mongoose 에서 지언하는 자료 타입

타입 | 설명
----|-----
String | 문자열
Number | 숫자
Date | 날짜
Buffer | 파일을 담을 수 있는 버퍼
Boolean | True 또는 False rkqt
Mixed(Schema.Types.Mixed) | 어떤 데이터도 넣을 수 있는 형식
ObjectedId(Schema.Types.ObjectId) | 객체 아이디, 주로 다른 객체를 참조할 때 넣음
Array | 배열 형태의 값으로 []로 감싸서 사용

### (05) Authentication

#### 01) 세션과 쿠키 | 인증된 쿠키

- 인증된 쿠키는 쿠키를 설정할 때, 쿠키 내용과 사전 설정한 비밀 키를 가지고 HMAC(해시 메시지 인증 코드)를 생성하여 함께 보관하는 것입니다.

- 이것으로 유저가 쿠키를 변조하지 않았음을 검증할 수 있습니다.

#### 02) Koa-session

- ``` yarn add koa-session ``` 로 설치

- Koa 프레임워크에서 세션을 사용하기 위한 라이브러리

## 03. 프로젝트 고찰

### (01) REST API에 대한 학습

 해당 프로젝트를 진행하기에 앞서 개발자가 되기로 결심한 후 자주 접하게되는 REST API에 대해 다시금 파악하게 되었다. 지난 NodeBird 프로젝트에서도 REST API를 통해서 백엔드 API 서버를 만들고 여기에 REST API개념을 적용했던 것을 복습하는 계기가 되었다.

 다만 현재까지는 서적에서 제공해주는 이미 디자인된 REST API를 구축하지만 실제롤 사람들과 일을 할 때는 내가 URL을 통한 REST API를 설계해야한다. 이 과정에서 최근에 배우고 있는 자료구조가 도움이 될 것 같다는 생각이 든다.

 내가 보기에 URL도 HTML과 비슷하게 트리(Tree)형 자료구조를 가지는 개념인 것 같다. 해당 도메인(Root)에서 그 뒤에 어떤 URI가 붙는지에 따라서 트리형 구조가 된다.

 따라서 **혹시나 REST API를 설계할 일이 생긴다면 트리형 자료 구조의 관점에서 마인드맵 형태로 API를 고민하는 것이 설계의 아이디네이션 단계에서 효율적일 것이라고 생각한다.**

 ### (02) NoSQL의 대표 MongoDB에 대한 학습

 지난 NodeBird 프로젝트에서는 RDBS(Relational DataBase System)으로 데이터베이스를 구축한 후 ORM인 sequelize를 통해서 데이터베이스를 구축하였다. 하지만 이번 프로젝트에서는 NoSQL의 대표격인 MongDB를 사용한 후 Moongoose라는 ODM을 통해서 데이터베이스를 구축하였다.

 이 부분에서 소규모 어플리케이션을 설계하는 나로서는 아직 MySQL과 MongoDB에 대한 차이를 잘 느끼지 못한다. 하지만 확실한 점은 MongoDB는 매우 가볍고 사용이 쉽다는 점이다. 따라서 토이 프로젝트를 할 때 앞으로 MongoDB에 익숙해지도록 노력해야겠다는 생각을 하였다.

 ### (03) Architecture에 대한 고민

> 화려한 디자인과 좋은 코딩 기술도 중요하지만 백엔드 개발자로서 살아남기 위해서는 아키텍쳐에 대한 고민을 게을리 하지마세요.

 해당 프로젝트를 진행하면서 NODE.js 커뮤니티에서 백엔드를 진행할 때 아키텍쳐에 대한 고민을 많이 하라는 말을 들었다. 처음에는 아키텍쳐를 고민하라는 말이 이해가 잘 안되어서 이 말의 의미를 끊임없이 되물었는데 어느 순간 아키텍쳐라는 것이 이해가 되기 시작하였다. 

 프로젝트를 진행하기 위해서 데이터 베이스는 무엇을 사용할지, 데이터 베이스와 API를 제공하는 부분을 분리할 것인지 아닌지, API 서버는 어떤 것을 사용할 것인지 등 등 서버측의 프로젝트를 진행하기 위한 전체적인 틀을 **아키텍쳐**라고 하는 것 같다. 그리고 그 내부에 들어가는 각각의 구성 요소를 **스택(Stack)** 혹은 **레이어(Layer)**라는 용어로 칭하는 것 같다.

 또한 **아키텍쳐를 설계한다는 것은 DevOps의 관점에서도 접근할 수 있는 것 같다.** CI/CD 환경을 구축해 개발팀이 제품의 개발에만 초점을 맞출 수 있게 도와준다던가, 혹은 로그 수집 서버를 따로 만들어 서비스가 운영되는 동안 발생하는 Error를 관리해준다든가 하는 전체적인 설계가 아키텍쳐에 대한 고민인 것 같다.

 아직 나는 아키텍쳐를 설계할 만큼 프로그래밍 분야에 오랜 시간을 투자한 것이 아니다. 하지만, 아키텍쳐를 고민하는 시니어 개발자들의 생각을 이해하면서 개발 역량을 늘린다면, 방향성 없이 프로그램을 만드는 것보다 더 좋은 수준의 성장이 가능하지 않을까 한다.

