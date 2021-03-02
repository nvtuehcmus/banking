const bcrybt =require('bcrypt');
const account={
hashPassWord:(password)=>{
        return bcrybt.hashSync(password,10);
    },
verifyPassWord:(password,passwordhash)=>{
        return bcrybt.compareSync(password,passwordhash);
    },
    
getUid:()=>{
    uid = "3006" // source id ngân hàng sống mãi với thời gian
    for(let i=0;i<3;i++){
        uid +=" "+ String( Math.floor(Math.random() * (9999 - 1111 + 1) ) + 1111);
    }
   return uid;
  }

}
module.exports = account;