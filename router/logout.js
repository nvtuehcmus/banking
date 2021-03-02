const express = require('express'); 

const router = express.Router();

router.get('/',(req,res)=>{
    delete req.session.userId;
    res.redirect('/');
});

module.exports = router;