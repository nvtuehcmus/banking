const period ={
    getPeriod:"select * from period where rate = $1",
}

module.exports = period;