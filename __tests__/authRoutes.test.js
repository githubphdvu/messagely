const request = require("supertest")
const jwt = require("jsonwebtoken")

const app = require("../app")
const db = require("../db")
const User = require("../models/user")

describe("",  ()=>{
    beforeEach(async  ()=>{
        await db.query("DELETE FROM messages")
        await db.query("DELETE FROM users")
        let u1 = await User.register({
            username: "test1",
            password: "password",
            first_name: "Test1",
            last_name: "Testy1",
            phone: "+14155550000",
        })
    })
    test("", async  ()=>{
        let response = await request(app).post("/auth/register").send({
            username: "bob",
            password: "secret",
            first_name: "Bob",
            last_name: "Smith",
            phone: "+14150000000"
        })
        let token = response.body.token
        expect(jwt.decode(token)).toEqual({username: "bob",iat: expect.any(Number)})
    })
    test("", async  ()=>{
        let response = await request(app).post("/auth/login").send({ username: "test1", password: "password" })
        let token = response.body.token
        expect(jwt.decode(token)).toEqual({username: "test1",iat: expect.any(Number)})
    })
    test("", async  ()=>{
        let response = await request(app).post("/auth/login").send({ username: "test1", password: "WRONG" })
        expect(response.statusCode).toEqual(400)//bad request
    })
    test("", async  ()=>{
        let response = await request(app).post("/auth/login").send({ username: "not-user", password: "password" })
        expect(response.statusCode).toEqual(400)
    })
})
afterAll(async  ()=>await db.end())
