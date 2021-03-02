const cif={
    createCif:"INSERT INTO cif(id, email, status, active ) VALUES($1 , $2, 'c',false)",
    findById:'select * from cif where id = $1',
    findByEmail:'select * from cif where email = $1',
    close:"update cif SET status = 'c' where id = $1",
    open:"update cif SET status = 'o' where id = $1 ",
    viewProfile: "SELECT email,name,age,identiferid FROM cif WHERE id=$1",
    spendInfo:"SELECT id,balance,limitd FROM spend where id = (SELECT spendid FROM CARDS WHERE cid = $1)",
    savingInfo:"SELECT id,balance,rate FROM saving where id = (SELECT savingid FROM CARDS WHERE cid = $1)",
    updateInfo:"UPDATE cif SET name = $1, age = $2, identifer = $3, identiferid = $4, phone_number = $5, address = $6 WHERE id = $7",
    viewCif: "SELECT * FROM cif WHERE active = false ",
    activeCif:"update cif set active = true where id = $1",
    viewAll: "SELECT * FROM cif",
    sendMoney:"update spend set balance = balance - $1 where id =$2",
    getMoney:"update spend set balance = balance + $1 where id =$2"

}
module.exports = cif;

