if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
let dburl = process.env.DB_URL
let PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
    dburl = process.env.TEST_DB_URL
}

module.exports = {
    dburl,
    PORT
}