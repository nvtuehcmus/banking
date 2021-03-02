const spend={
    create:"insert into spend(id,balance,limid,limid_id) values($1,0,5000000,1)",
    getSpendCard:"select * from spend where id = $1",
    updateLimit:"update spend set limid = limid - $1 where id = $2",
    resetLimid:"update spend set limid = $1 where id = $2",
    upload:"update spend set balance = balance + $1 where id = $2",
    getAll:"select * from spend",
    recharge:"update spend set change = $1 where id = $2",
    getMoney :"update spend set balance = balance - $1 where id = $2",
    setNull:"update spend set change = null where id = $1",
    mergeBalance:"update spend set balance = balance + change where id =$1",
    getAccept:"select * from spend where change is not null"
}
module.exports = spend;