const express = require('express');
const spend = require('../../repository/spendingCard');
const db =  require('../../services/db');



const router =express.Router();
router.get('/',async(req,res)=>{
    
        const infoSpend = await db.any(spend.getSpendCard,req.session.userId);
        return res.render('spend',{infoSpend});
      

})

module.exports =router;