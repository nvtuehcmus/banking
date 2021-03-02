const express = require('express');
const db = require('../../services/db');
const trans = require('../../repository/trans');
const asyncHandler = require('express-async-handler');



const router = express.Router();

router.get('/',asyncHandler(async (req,res)=>{
    const id = req.session.userId;
    const inform = await db.any(trans.get,[id,id]);
    inform.reverse(); 
   return res.render('inform',{inform});

}))

module.exports = router;