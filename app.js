const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');
const indexRouter = require('./routes');
const connect = require('./schema');
const methodOverride = require('method-override');


const app = express();

require('dotenv').config();
app.set('port',process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views',{
    express:app,
    autoescape:true,
    watch:true
});
connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'images')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.use('/',indexRouter);

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터 없음`);
    error.status=404;
    next(error);
});
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error');
});


app.listen(app.get('port'),()=>{
    console.log(app.get('port')+'에서 응답을 기다리는 중... http://localhost:3001');
})