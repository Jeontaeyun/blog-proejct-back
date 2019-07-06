const mongoose = require('mongoose');

const {Schema} = mongoose;

const Post = new Schema({
    title : String,
    body : String,
    tags : [String],
    publishedDate: {
        type: Date,
        default: new DataCue()
    }
});

module.exports = mongoose.model('Post', Post);
/*
mongoose.model('스키마 이름','스키마 객체')
데이터베이스는 스키마 이름을 정해주면 이 이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만듭니다.
*/