const trans ={
    createTrans:"insert into trans(fromid, toid,description,change) values($1,$2,$3,$4) RETURNING created_at",
    get:'select * from trans where fromid = $1 or toid = $2',
}

module.exports = trans;