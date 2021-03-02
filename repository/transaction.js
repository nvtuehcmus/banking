const transaction = {
    create:"insert into transaction(fromid,toid,description,balance,from_email,to_email,token) values($1,$2,$3,$4,$5,$6,$7)",
    update:"update transaction set status = true where toid = $1 and fromid = $2",
    getTrans:"select * from transaction where token = $1",
    deleteTrans:"delete from transaction where token = $1",
}
module.exports = transaction;