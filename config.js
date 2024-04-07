require("dotenv").config()
const DB_URI = (process.env.NODE_ENV === "test")//jest test.js will set NODE_ENV to 'test' https://jestjs.io/docs/environment-variables
    ? "postgresql:///messagely_test"
    : "postgresql:///messagely"
const SECRET_KEY = process.env.SECRET_KEY || "secret"
const BCRYPT_WORK_FACTOR = 12
module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}