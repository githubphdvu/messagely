//npm init
//npm i bcrypt body-parser cors dotenv express express-cors jsonwebtoken pg supertest
//psql<data.sql
//nodemon -L server.js -e js,html,css (or node...)
const app = require("./app")
app.listen(3000,()=>console.log("Listening on 3000"))