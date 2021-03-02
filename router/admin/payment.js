const express = require('express')
const saving = require('../../repository/savingCard');
const db = require('../../services/db');

const router = express.Router();


router.get('/',async(req,res)=>{
    const acceptSaving = await db.any(saving.getAccept);
    res.render('payment',{data:acceptSaving});

})

router.post('/accept',async(req,res)=>{
    const id = req.body.id;
        await db.none(saving.accept,id);
        const acceptSaving = await db.any(saving.getAccept);
        return res.redirect('/payment');
})

module.exports = router;