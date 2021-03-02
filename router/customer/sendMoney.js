const db = require('../../services/db');
const express = require('express');
const asyncHandler = require('express-async-handler');
const cifQuery = require('../../repository/cif');
const spend = require('../../repository/spendingCard');
const trans = require('../../repository/trans');
const {send} = require('../../services/sendMail');
const crypto = require('crypto');
const form = require('../../services/form');
const transaction = require('../../repository/transaction');
const { reject, resolve } = require('bluebird');
const router = express.Router();
router.use(express.static('public'));

router.get('/',(req,res)=>{
    if(req.session.userId){
        return res.render('send');
     }
     return res.render('home');
});

router.post('/',asyncHandler(async (req,res)=>{
    const source = await db.oneOrNone(cifQuery.findById,[req.session.userId]);

    if(source.status == 'c' || source.active == false){
       return res.render('info',{status:"tài khoản chưa được kích hoạt",type:"e"}) // tai khoan chua duoc kich hoat
    }
    else{
        const destination = await db.oneOrNone(cifQuery.findById,[req.body.toId]);
        console.log(req.body.toId);
      
        
        console.log(destination);
        if(destination!=null && source!=null){
            const info = {
                fromMail:source.email,
                toEmail:destination.email,
                formId: source.id,
                sourceName: source.name,
                toId:req.body.toId,
                change:req.body.change,
                decription:req.body.decription
            }
            const sourceCart = await db.oneOrNone(spend.getSpendCard,info.formId);  
            if(Number(sourceCart.balance) >= Number(info.change)){
                if(Number(sourceCart.limid )>= Number(info.change)){
                    const token =crypto.randomBytes(4).toString('hex').toUpperCase();

                    await db.none(transaction.create,[info.formId,info.toId,info.decription,info.change,info.fromMail,info.toEmail,token]);
                    await send(info.fromMail,"MÃ XÁC NHẬN",form.trans(token));


                    return  res.render('verify');

                }else{
                return res.render('info',{status:"vượt hạn mức gửi ngày",type:"e"});
                }

            }
            else{
            return res.render('info',{status:"số dư không đủ giao dịch",type:"e"});
            }
        }
        else{
            return res.render('info',{status:"Tài khoản không tồn tại",type:"e"});
        }
    }
}));

router.post('/confirm',asyncHandler(async (req,res)=>{
    

    const tran = await db.oneOrNone(transaction.getTrans,req.body.token);

    if(tran != null){

        const info = {
            fromMail:tran.from_email,
            toEmail:tran.to_email,
            formId: tran.fromid,
            toId:tran.toid,
            change:tran.balance,
            decription:tran.description
        }  
        console.log(info.toId);
        const destinationCart = await db.oneOrNone(spend.getSpendCard,info.toId);
        const sourceCart = await db.oneOrNone(spend.getSpendCard,info.formId); 
        console.log("source",sourceCart);
        console.log(destinationCart);
        if(destinationCart!=null){
        const sourceCart = await db.oneOrNone(spend.getSpendCard,info.formId); 
            db.tx(async t => {
                await t.none(cifQuery.sendMoney,[info.change,info.formId]);
                await t.none(cifQuery.getMoney,[info.change,info.toId]);
            }).then(async data => {
                console.log("then ok");
                    const time = await db.one(trans.createTrans,[info.formId,info.toId,info.decription,info.change]);
                    console.log(time.created_at.toLocaleString());
                    await db.none(spend.updateLimit,[info.change,info.formId]);

                    
                    await send(info.fromMail,"Thay đổi số dư",form.transaction(
                        info.formId,
                        "bị trừ",
                        Number(sourceCart.balance)-Number(info.change),
                        info.change,
                        time.created_at.toLocaleString(),
                        info.formId,
                        info.toId,
                        info.decription
                        
                    ));
                    await send(info.toEmail,"Thay đổi số dư",form.transaction(
                        info.toId,
                        "được cộng",
                        Number(destinationCart.balance)+Number(info.change),
                        info.change,
                        time.created_at.toLocaleString(),
                        info.formId,
                        info.toId,
                        info.decription));
                    return res.render('info',{status:"giao dịch thành công",type:"s"})// thông báo thành công và điều hướng về trang chủ
    
                })
                .catch(error => {
                    console.log(error);
                    return res.render('info',{status:"giao dịch không thành công",type:"e"})// trả về 1 trang lỗi thông báo giao dịch không thành công
                    
                });
            }
            else{
                return res.render('info',{status:"sai người nhận",type:"e"});
            }

    }
    else{

        return res.render('info',{status:"mã không hợp lệ",type:"e"})
    }
})
)

module.exports = router;