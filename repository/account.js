const account={
    createAccount: "INSERT INTO account (id, email, password, types,token) VALUES($1, $2, $3,'c', $4)",
    active:'UPDATE account SET token = null WHERE id = $1',
    findByEmail:'select * from account where email = $1',
    findById:'select * from account where id = $1',
    findToken:'select * from account where token = $1',
    resetPassword:'update account set password = $1',
}
module.exports= account;
