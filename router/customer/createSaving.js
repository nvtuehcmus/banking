const express = require('express');
const userQuery = require('../../repository/cif');
const db = require('../../services/db');
const Rate = require('../../repository/interestRate');
const asyncHandler = require('express-async-handler');
const saving = require('../../repository/savingCard');
const { render } = require('ejs');
const router = express.Router();
// from đăng kí lãi kép sẽ post lên những thông tin như sau
// số kì gui period
// số tiền gửi
// hệ thống sẽ tạo một tktt trong trạng thái chờ admin active nếu active thì mới được đưa vào hoạt động
router.post('/',asyncHandler(async(req,res)=>{
    const id = req.session.userId;
        const cif = await db.one(userQuery.findById,id);
        if(cif.status == 'c' || cif.active == false){
            return res.render('info',{status:"tài khoản chưa kích hoạt, hoặc bị khóa",type:"e"});
        }
        else{
            const info={
                id:id,
                period:Number(req.body.period),
                balance:Number(req.body.balance)
            }
                var rate = 0;
               if(info.period == 1){rate = 0.5}
               else if(info.period == 3){rate = 1}
               else if(info.period == 6){rate = 2}
               else if(info.period == 9){rate = 3}
               else if(info.period == 12){rate = 5}
               else if(info.period == 24){rate = 7}
               else if(info.period == 36){rate = 8}
                let balance = info.balance* Math.pow((1+rate/100),info.period) // lãi kép thực nhận
                await db.none(saving.create,[info.id,balance,rate,(info.period)]);
                return res.render("info",{status:"Thông tin đã được ghi nhận vui lòng đến ngân hàng để thanh toán trong ngày",type:"s"}) // thông báo tạo thành công và kêu người dùng đến ngân hàng thanh toán
            
               
            }
           
}));

router.get('/',(req,res)=>{
    return res.render('createSaving');
})

module.exports =router;

