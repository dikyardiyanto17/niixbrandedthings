const request = require('supertest');
const { response } = require('../app');
const app = require('../app');
const { hashPassword } = require('../helpers/bcryptjs');
const { encodeToken } = require('../helpers/jwt');
const {sequelize} = require('../models')
const {User, Product} = require('../models')
const fs = require('fs');

let token
beforeAll(async () => {
    const user = await User.create({username: "diky", email: "22@gmail.com", password: "22222", phoneNumber: "0852222222", address: "Dersalam", role: "Customer"})
    const product = JSON.parse(fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')).map(x => {
        x.createdAt = x.updatedAt = new Date()
        return x
    })
    await sequelize.queryInterface.bulkInsert('Products', product, {})
    token = encodeToken({id: user.id})
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Products", null, {truncate: true, cascade: true, restartIdentity: true})
    await sequelize.queryInterface.bulkDelete("Users", null, {truncate: true, cascade: true, restartIdentity: true})
})

describe("api public", () => {
    describe("POST /pub/registers", () => {
        it("Should create customer", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "diky2123",
                    email: "123@gmail.com",
                    password: "22222",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(201)
                    expect(response.body.user).toHaveProperty("id", expect.any(Number))
                    expect(response.body.user).toHaveProperty("username", expect.any(String))
                    expect(response.body.user).toHaveProperty("email", expect.any(String))
                    expect(response.body.user).toHaveProperty("password", expect.any(String))
                    expect(response.body.user).toHaveProperty("role", expect.any(String))
                    expect(response.body.user).toHaveProperty("phoneNumber", expect.any(String))
                    expect(response.body.user).toHaveProperty("address", expect.any(String))
                    expect(response.body.user).toHaveProperty("createdAt", expect.any(String))
                    expect(response.body.user).toHaveProperty("updatedAt", expect.any(String))
                })
            })

        it("Shouldnot create customer because email is empty", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "dikyy",
                    password: "22222",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Shouldnot create customer because password is empty", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "dikyyy",
                    email: "22@gmail.com",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Shouldnot create customer because email is empty", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "dikyyyy",
                    email: "",
                    password: "22222",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Shouldnot create customer because password is empty", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "dikyyyyy",
                    email: "22222222@gmail.com",
                    password: "",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Should create customer email is alreadery registered", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "dikyyyyyyyyy",
                    email: "22@gmail.com",
                    password: "22222",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })

        it("Should create customer because invalid email", () => {
            return request(app)
                .post("/pub/register")
                .send({
                    username: "dikyyyyyyyyyyyy",
                    email: "21111",
                    password: "22222",
                    phoneNumber: "0852222222",
                    address: "Dersalam"
                })
                .then((response) => {
                    expect(response.status).toBe(400)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                })
            })
    })

    describe("POST /pub/login", () => {
        it("Should login (customer)", () => {
            return request(app)
                .post("/pub/login")
                .send({
                    email: "22@gmail.com",
                    password: "22222",
                })
                .then((response) => {
                    expect(response.status).toBe(201)
                    expect(response.body).toHaveProperty("message", expect.any(String))
                    expect(response.body).toHaveProperty("access_token", expect.any(String))
                    expect(response.body).toHaveProperty("role", expect.any(String))
                })
            })

            it("Shouldnot login (customer)", () => {
                return request(app)
                    .post("/pub/login")
                    .send({
                        email: "2@gmail.com",
                        password: "222222",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
                })

            it("Shouldnot login (customer) because email havent registered", () => {
                return request(app)
                    .post("/pub/login")
                    .send({
                        email: "222@gmail.com",
                        password: "22222",
                    })
                    .then((response) => {
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })
        })
            
        describe("GET /pub/products", () => {
            it("Get all products with limit", () => {
                return request(app)
                    .get("/pub/products")
                    .then((response) => {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty("products", expect.any(Object))
                        expect(response.body.products).toHaveProperty("count", expect.any(Number))
                        expect(response.body.products).toHaveProperty("rows", expect.any(Array))
                    })
            })

            it("Get all products with limit with query filter", () => {
                return request(app)
                    .get("/pub/products?filter=1")
                    .then((response) => {
                        expect(response.body).toHaveProperty("products", expect.any(Object))
                        expect(response.body.products).toHaveProperty("count", expect.any(Number))
                        expect(response.body.products).toHaveProperty("rows", expect.any(Array))
                    })
            })

            it("Get all products with limit with query page", () => {
                return request(app)
                    .get("/pub/products?page=1")
                    .then((response) => {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty("products", expect.any(Object))
                        expect(response.body.products).toHaveProperty("count", expect.any(Number))
                        expect(response.body.products).toHaveProperty("rows", expect.any(Array))
                    })
            })

            it("Find products with params id", () => {
                return request(app)
                    .get("/pub/products/10")
                    .then((response) => {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty("product", expect.any(Object))
                        expect(response.body).toHaveProperty("qrCode", expect.any(String))
                        expect(response.body.product).toHaveProperty("id", expect.any(Number))
                        expect(response.body.product).toHaveProperty("name", expect.any(String))
                        expect(response.body.product).toHaveProperty("description", expect.any(String))
                        expect(response.body.product).toHaveProperty("price", expect.any(Number))
                        expect(response.body.product).toHaveProperty("stock", expect.any(Number))
                        expect(response.body.product).toHaveProperty("imgUrl", expect.any(String))
                        expect(response.body.product).toHaveProperty("authorId", expect.any(Number))
                        expect(response.body.product).toHaveProperty("categoryId", expect.any(Number))
                    })
            })

            it("Find products with params id but not found", () => {
                return request(app)
                    .get("/pub/products/2222")
                    .then((response) => {
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })
        })

        describe("GET and POST Bookmark /mybookmark", () => {
            it("Show my bookmark", () => {
                return request(app)
                    .get("/pub/mybookmark")
                    .set("access_token", token)
                    .then((response) => {
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty("bookmark", expect.any(Array))
                    })
            })

            it("Success bookmark product", () => {
                return request(app)
                    .post("/pub/bookmark/10")
                    .set("access_token", token)
                    .then((response) => {
                        expect(response.status).toBe(201)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })

            it("Failed bookmark product because product is not found", () => {
                return request(app)
                    .post("/pub/bookmark/111")
                    .set("access_token", token)
                    .then((response) => {
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })

            it("Failed bookmark product because user havenot login", () => {
                return request(app)
                    .post("/pub/bookmark/111")
                    .then((response) => {
                        expect(response.status).toBe(401)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })

            it("Failed bookmark product because token is invalid", () => {
                return request(app)
                    .post("/pub/bookmark/111")
                    .set("access_token", "InvalidToken")
                    .then((response) => {
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty("message", expect.any(String))
                    })
            })
        })
})