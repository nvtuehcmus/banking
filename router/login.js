const express = require('express');
const asyncHandler = require('express-async-handler');
const Account = require( '../services/account');
const userQuery = require('../repository/account');
const db = require('../services/db');
const router =express.Router();

router.get('/',(req,res)=>{
    if(req.session.userId){
       return res.redirect('/home');
    }
    res.render('login');
})

router.post('/',asyncHandler(async (req,res)=>{
    
    const user = await db.oneOrNone(userQuery.findByEmail,req.body.email);
    if(user==null||!Account.verifyPassWord(req.body.password,user.password)&&user.token == null){
        return res.render('login');

    }
    else if(user.token!=null){
        return res.render('verify');
    }
    req.session.userId=user.id;
    if(user.types=='c'){return  res.redirect('/home');}
    else{return res.redirect('/admin')}
   
}));


module.exports = router;