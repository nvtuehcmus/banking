const express =require('express');
const db = require('../../services/db');
const spend =  require('../../repository/spendingCard');
const asyncHandler = require('express-async-handler');

const saving = require('../../repository/savingCard');

const router =express.Router();
router.use(express.static('public'));

router.get('/',async(req,res)=>{
        var infoSaving = await db.any(saving.getInfo,req.session.userId);
        return res.render('saving',{infoSaving});
});
router.get('/getSaving/:id',asyncHandler(async(req,res)=>{

    
    const savingInfo = await db.one(saving.getById,req.params.id);

    if(savingInfo.status == "c"){
        return res.redirect('/saving');
    }
    else{

            const info={
                id:req.session.userId,
                period:savingInfo.pariod,
                balance:savingInfo.balance

            }

            var rate = 0;
            if(info.period == 1){rate = 0.5}
            else if(info.period == 3){rate = 1}
            else if(info.period == 6){rate = 2}
            else if(info.period == 9){rate = 3}
            else if(info.period == 12){rate = 5}
            else if(info.period == 24){rate = 7}
            else if(info.period == 36){rate = 8}
             var balance = info.balance* Math.pow((1+rate/100),info.period) // lãi kép thực nhận


            const time = await db.one(saving.getEnd,req.params.id)
            if((time.deadline/1000-new Date()/1000)>0){
                await db.none(spend.upload,[savingInfo.balance,info.id]);
                await db.none(saving.deleted,req.params.id);
            }
            else{
                await db.none(spend.upload,[balance,info.id]);
                await db.none(saving.deleted,req.params.id);
            }
            

    }
    return res.redirect('/saving');
}))

module.exports =router;