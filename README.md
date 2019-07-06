# 리액트 블로그 프로젝트 - 백엔드

## 01. 프로젝트 개요

### (01) 프로젝트 스택

#### 01) 백 엔드

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

### (03) Mongoose | 몽구스

#### 01) Mongoose 란?

- mongoose는 Node.js 환경에서 사용하는 **MongoDB 기반 ODM(Object Data Modeling) 라이브러리 입니다.**

- 이 라이브러리를 통해 데이터베이스 문서들을 자바스크립트 객체처럼 사용할 수 있습니다.

- ``` yarn add mongoose dotenv ``` 릍 통해 설치

- **dotenv**는 환경변수들을 파일에 넣고 사용할 수 있게 하는 개발도구입니다. 몽구스를 연결할 때 이용하는 서버 계정과 비밀번호등을 보관하는 역활을 합니다.