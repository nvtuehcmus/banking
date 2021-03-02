const express = require('express');
const userQuery = require('../../repository/cif');
const db = require('../../services/db');
const asyncHandler =require ('express-async-handler');
const router = express.Router();
// tạo một trang cho phép view tất cả customer kế bên có cái button để đóng mở tài khoản


router.get('/',asyncHandler(async (req,res) => {
    const cif = await db.any(userQuery.viewAll);
    res.render('viewcus',{cif});
}));

router.post('/change',asyncHandler(async (req,res) => {////////////////// doing
    const id = req.body.id;
    const cus= await db.one(userQuery.findById,id);
    if (cus.status=='c'){
        await db.none(userQuery.open,id)
    }
    else if(cus.status == 'o'){
        await db.none(userQuery.close,id)
    }
    res.redirect('/admin');
}))


module.exports =router;

