const express = require('express');
const Writes = require('../schema/write');
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

router.get('/',async(req,res,next)=>{
    try{
        const row = await Writes.find({});
        res.render('index',{title:'Todo List', row});
    }catch(err){
        console.error(err);
        next(err);
    }
   
});

router.get('/write',(req,res,next)=>{
    res.render('write',{title:'Todo List 메모 작성'});
});
router.post('/write', async(req,res,next)=>{
    try{
        const data = {content:req.body.content}
        const write = await Writes.create({...data})
        console.log(write);
        res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.route('/edit/:id')
    .get(async(req,res,next)=>{
        try{
            const id = req.params.id;
            const row = await Writes.find({_id:id});
            const rs = row[0];
            res.render('edit',{rs, title:'Todo List 수정'});
        }catch(err){
            console.error(err);
            next(err);
        }
    });
router.route('/edit')
    .put(async(req,res,next)=>{
        try{
            const id =new ObjectId(req.body.id);
            const content = req.body.content;
            const edit = await Writes.updateOne({ _id:id},{content:content});
            console.log(edit);
            console.log('수정 완료');
            res.redirect('/');

            
        }catch(err){
            console.error(err);
            next(err);
        }
    });

router.route('/del')
    .post(async(req,res,next)=>{
        try{
            const id = req.body.id;
            const rs = await Writes.deleteOne({_id:id});
            console.log(rs);
            res.send('1');
        }catch(err){
            console.error(err);
            next(err);
            res.send('0');
        }
    });
module.exports = router;