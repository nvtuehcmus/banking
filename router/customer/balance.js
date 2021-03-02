const express =require('express');
const db = require('../../services/db');
const spend =  require('../../repository/spendingCard')
const cif = require('../../repository/cif');
const asyncHandler = require('express-async-handler');
const {send} = require('../../services/sendMail');
const crypto = require('crypto');
const moment = require('moment');
const form = require('../../services/form');
const saving = require('../../repository/savingCard');

const router =express.Router();
router.use(express.static('public'));

router.get('/',(req,res)=>{
    res.render('balance');
})


router.post('/recharge',asyncHandler(async(req,res)=>{
    try {
        var balance = req.body.balance.split(',');
        var temp="";
        balance.map(e=>temp+=e);
        temp = Number(temp);
        await db.none(spend.recharge,[temp,req.session.userId]);

    } catch (error) {
        res.render('info',{status:"Có lỗi sảy ra vui lòng thử lại",type:"e"})       
    }
   return res.redirect('/balance');
}))

router.post('/getMoney',async(req,res)=>{
    var balance = req.body.balance.split(',');
    var temp="";
    balance.map(e=>temp+=e);
    temp = Number(temp);

    const info = await db.one(spend.getSpendCard,req.session.userId)
    if(info.balance<temp){
        return res.render('info',{status:"Tài khoản không đủ",type:"e"})  
    }
    else{
        try {
            const token =crypto.randomBytes(4).toString('hex').toUpperCase();
            const user = await db.one(cif.findById,req.session.userId);
            console.log(user);
            await db.none(spend.getMoney,[temp,req.session.userId]);
            send(user.email,"MÃ RÚT TIỀN",form.trans(token));

        } catch (error) {
           return res.render('info',{status:"Có lỗi sảy ra vui lòng thử lại sau",type:"e"})     
        }
        return res.redirect('/balance');    
     
    }
})



module.exports = router;