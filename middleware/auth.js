//helper Middlewares for handling req authorization for routes
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

function authenticateJWT(req, res, next) {//authenticate user
    try {
        const tokenFromBody = req.body._token
        const payload = jwt.verify(tokenFromBody, SECRET_KEY)
        req.user = payload// create a current user
        return next()
    } 
    catch (err) {return next()}
}
function ensureLoggedIn(req, res, next) {//Requires user is authenticated
    console.log(req.user)
    if (!req.user) return next({ status: 401, message: "Unauthorized 123" })
    else return next()
}
function ensureCorrectUser(req, res, next) {//Requires correct username
    try {
        if (req.user.username === req.params.username)return next()
        else return next({ status: 401, message: "Unauthorized" })
    } 
    catch (err){return next({status:401,message:"Unauthorized"})}//errors would happen here if we made a request and req.user is undefined
}
module.exports = {authenticateJWT,ensureLoggedIn,ensureCorrectUser}
