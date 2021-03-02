const express = require('express');
const spendQuery = require('../../repository/spendingCard');
const db = require('../../services/db');
const accountQuery = require('../../repository/account');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/');
})
router.get('/:email/:token',asyncHandler(async(req,res)=>{

    if(req.session.userId){
        return res.redirect('/');
    }
    else{
    const email = req.params.email;
    const token = req.params.token;
    const account = await db.oneOrNone(accountQuery.findByEmail,email);
    if(account != null){
        if(account.token == token){
            db.tx(async t=>{
                await t.none(accountQuery.active,account.id);
                await t.none(spendQuery.create,account.id);
            }).then(()=>{
                req.session.userId = account.id;
                return res.redirect('/');
            }).catch(()=>{
                return res.redirect('/');
            })
    
        }
        else{
            return res.redirect('/');
        }

    }
    else{
        return res.redirect('/');
    }
}
}));

module.exports = router;