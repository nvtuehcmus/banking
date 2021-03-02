const express = require('express');
const userQuery = require('../../repository/cif');
const db = require('../../services/db');
const AWS = require('aws-sdk');
const spend = require('../../repository/spendingCard');
const asyncHandler = require('express-async-handler');
const router = express.Router();



router.get('/',asyncHandler(async (req,res) => {
    const customer = await db.any(userQuery.viewAll);
    console.log(customer)
    const img = [];
    var s3 = new AWS.S3();

    var credentials = {
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey : process.env.SECRET
    };


    AWS.config.update({credentials: credentials, region: 'ap-southeast-1'});
    for(let i = 0;i<customer.length;i++){
        const avatar = {Bucket: 't-bank',Key:`${customer[i].email}/avatar.jpg`}
        const backImg = {Bucket: 't-bank',Key:`${customer[i].email}/back.jpg`}
        const frontImg = {Bucket: 't-bank',Key:`${customer[i].email}/front.jpg`}
        img.push(s3.getSignedUrl('getObject',avatar));
        img.push(s3.getSignedUrl('getObject',backImg));
        img.push(s3.getSignedUrl('getObject',frontImg));
    }
    res.render('admin',{data:customer,img:img});
}));

module.exports =router;

