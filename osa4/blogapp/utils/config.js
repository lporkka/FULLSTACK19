if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
let dburl = process.env.DB_URL
let PORT = process.env.PORT

module.exports = {
    dburl,
    PORT
}