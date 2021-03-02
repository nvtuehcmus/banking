const express = require('express')
const spend = require('../../repository/spendingCard');
const db = require('../../services/db');

const router = express.Router();


router.get('/',async(req,res)=>{
    const acceptSpend = await db.any(spend.getAccept);
    res.render('paymentSpend',{data:acceptSpend});

})

router.post('/accept',async(req,res)=>{
    console.log("in");
        const id = req.body.id;
        await db.none(spend.mergeBalance,id);
        await db.none(spend.setNull,id);
        return res.redirect('/paymentSpend');
})

module.exports = router;