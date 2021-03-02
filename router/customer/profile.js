const express = require('express');
const asyncHandler = require('express-async-handler');
const cifQuery = require( '../../repository/cif');
const userQuery = require('../../repository/account');
const db = require('../../services/db');
const AWS = require('aws-sdk');
const dotenv = require( 'dotenv');


const router =express.Router();
router.use(express.static('public'));
dotenv.config(); // set environment variables

router.get('/',asyncHandler( async (req,res)=>{
    
    const customer = await db.any(cifQuery.findById,req.session.userId);


    if (customer.length != 0){
        if(customer.status == 'c'){
            res.render('profile',{status:"c"}); // kêu khách hàng updata thông tin
        }
        else{
        var info = []
    
            
            
        var s3 = new AWS.S3();

        var credentials = {
            accessKeyId: process.env.ACCESSKEY,
            secretAccessKey : process.env.SECRET
        };


        AWS.config.update({credentials: credentials, region: 'ap-southeast-1'});
        const avatar = {Bucket: 't-bank',Key:`${customer[0].email}/avatar.jpg`}
        const backImg = {Bucket: 't-bank',Key:`${customer[0].email}/back.jpg`}
        const frontImg = {Bucket: 't-bank',Key:`${customer[0].email}/front.jpg`}
        info.push(s3.getSignedUrl('getObject',avatar));
        info.push(s3.getSignedUrl('getObject',backImg));
        info.push(s3.getSignedUrl('getObject',frontImg));
        console.log(info);

 
        return res.render('profile',{customer:customer,info});   
    }
}
}));


router.get('/upload',asyncHandler(async (req,res)=>{

    var s3 = new AWS.S3();
    var credentials = {
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey : process.env.SECRET
    };

    AWS.config.update({credentials: credentials, region: 'ap-southeast-1'});
    const customer = await db.one(userQuery.findById,req.session.userId);
    var params = { Bucket: 't-bank', Key: `${customer.email}/`, ACL: 'public-read', Body:'' };
    s3.upload(params, async function(err, data) {
    if (err) {
        console.log("folder is exists");
        }
        const info = {
            avatar: "",
            backId: "",
            frontId:""
        }
        
        const avatar = {Bucket: 't-bank',Key:`${customer.email}/avatar.jpg`,Expires: 3600,ContentType: "image/jpg"}
        const backImg = {Bucket: 't-bank',Key:`${customer.email}/back.jpg`,Expires: 3600,ContentType: "image/jpg"}
        const frontImg = {Bucket: 't-bank',Key:`${customer.email}/front.jpg`,Expires: 3600,ContentType: "image/jpg"}

         s3.getSignedUrl('putObject',avatar,(err,url)=>{if(!err){info.avatar=url;}});
         s3.getSignedUrl('putObject',backImg,(err,url)=>{if(!err){info.backId=url;}});
         s3.getSignedUrl('putObject',frontImg,(err,url)=>{if(!err){info.frontId=url;return res.render('uploadProfile',{info});}});
    });
    

}));

router.post('/upload',asyncHandler(async(req,res)=>{
    const info = {
        id:req.session.userId,
        name:req.body.name,
        age:req.body.age,
        address:req.body.address,
        identifer:req.body.identifer,  
        identiferid:req.body.identiferid,
        phoneNumber:req.body.phoneNumber,
    };
    
    await db.none(cifQuery.updateInfo,[info.name,info.age,info.identifer,info.identiferid,info.phoneNumber,info.address,info.id]);
    console.log(info);
    return res.redirect('profile')

}))



module.exports = router;

