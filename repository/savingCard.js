const Saving={
    create:"insert into saving(id,balance,rate,period,status) values($1,$2,$3,$4,'c')",
    getInfo:"select * from saving where id = $1",
    getById:"select * from saving where ident = $1",
    getAccept:"select * from saving where status = 'c'",
    accept:"update saving set status = 'o' where id = $1",
    getEnd:"select create_at + period *30* interval '1 day' as deadline from saving where ident = $1",
    deleted:"delete from saving where ident = $1"
}
module.exports = Saving;