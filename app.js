const express = require("express")
const cors = require("cors")
const { authenticateJWT } = require("./middleware/auth")

const ExpressError = require("./expressError")
const app = express()

app.use(express.json())//allow json body parsing
app.use(express.urlencoded({extended: true}))//allow form-encoded body parsing

app.use(cors())// allow connections to all routes from any browser

app.use(authenticateJWT)// get auth token for all routes

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const messageRoutes = require("./routes/messages")

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/messages", messageRoutes)

app.use((req, res, next)=>{//404 handler
    const err = new ExpressError("Not Found", 404)
    return next(err)
})
app.use((err, req, res, next)=>{//general error handler
    res.status(err.status || 500)
    if (process.env.NODE_ENV != "test") console.error(err.stack)

    return res.json({
        error: err,
        message: err.message
    })
})
module.exports = app
