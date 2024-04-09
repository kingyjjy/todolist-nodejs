const mongoose = require('mongoose');

require('dotenv').config();

const mongodbid = process.env.MONGODB_ID;
const mongodbpass = process.env.MONGODB_PASS;
const mongodbhost = process.env.MONGODB_HOST;
const mongodbport = process.env.MONGODB_PORT;
const mongodbDB = process.env.MONGODB_DB;

const connect =()=>{
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }
    mongoose.connect(
        `mongodb://${mongodbid}:${mongodbpass}@${mongodbhost}:${mongodbport}/${mongodbDB}`,{
            dbName:'mytodo'
        }
    ).then(()=>{
        console.log('🎈몽고디비 연결 성공🎈');
    }).catch((err)=>{
        console.log('💢몽고디비 연결 에러💢',err);
    });
};
mongoose.connection.on('error',(error)=>{
    console.error('💦db연결 실패💦');
});
mongoose.connection.on('disconnected',()=>{
    console.log('db연결 끊김, 연결 재시도');
    connect();
});

module.exports = connect;