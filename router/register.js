const express = require('express');
const asyncHandler = require('express-async-handler');
const Account = require( '../services/account');
const accountQuery = require('../repository/account');
const cifQuery = require('../repository/cif');
const db = require('../services/db');
const crypto = require('crypto');
const form = require('../services/form');
const {send} = require('../services/sendMail');


const router =express.Router();
router.get('/',(req,res)=>{
    if(req.session.userId){
       return res.redirect('/home');
    }
    res.render('register');
})
router.post('/',asyncHandler(async (req,res)=>{
    const regis ={
        email:req.body.email,
        password:req.body.password
    }
    const user = await db.any(accountQuery.findByEmail,regis.email)
    
    if(user.length == 0){
        const checkPass = /^([\x2B-\x39]|[\x41-\x7A]){6,}$/ //more than 6 digis
        const checkMail = /^([\x2B-\x39]|[\x41-\x7A]){1,}\x40([\x2B-\x39]|[\x41-\x7A]){1,}\x2E\w{1,}$/


        if(checkMail.test(regis.email) && checkPass.test(regis.password)){
            const token =crypto.randomBytes(4).toString('hex').toUpperCase();
            const uid =Account.getUid()
            await db.none(accountQuery.createAccount,([
                uid,
                regis.email,
                Account.hashPassWord(regis.password),
                token
            ]
            ))


            await db.none(cifQuery.createCif,[uid,regis.email]);
            
            const url = `http://localhost:3000/${regis.email}/${token}`
            await send(regis.email,"Xác nhận địa chỉ email",form.verify(url));
            return res.render('info',{status:"vui lòng kiểm tra email",type:"s"});
    }
    }
    else if(user.token!=null){
        return res.render('info',{status:"vui lòng kiểm tra email",type:"s"});
    }
    
    req.session.userId=user.id;
    res.redirect('/home')
}));


module.exports = router;