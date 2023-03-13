const { comparePassword } = require('../helpers/bcryptjs')
const { encodeToken, decodeToken } = require('../helpers/jwt')
const {User, Category, Product, History, Favorite} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const { Op } = require("sequelize");
const { use } = require('../app');
const axios = require('axios');
const { query } = require('express');

class Controller {
    static async register (req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, role: "Admin", phoneNumber, address})
            res.status(201).json({statusCode: 201, user})
        } catch (error) {next(error)}
    }

    static async google (req, res, next) {
        try {
            const {access_token_google} = req.headers
            const ticket = await client.verifyIdToken({
            idToken: access_token_google,
            audience: CLIENT_ID
            });
            const {name, email} = ticket.getPayload();
            const [user, create] = await User.findOrCreate({
                where: {email}, defaults: {
                    username: name, password: String(Math.random()),  email, role: "User"
                }
            })
            if (user){
                const access_token = encodeToken({id: user.id})
                res.status(200).json({statusCode: 200, access_token})
            } else {
                const access_token = encodeToken({id: create.id})
                res.status(201).json({statusCode: 201, access_token})
            }
        } catch (error) {next(error)}
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            const users = await User.findOne({where: {email: email}})
            if (users){
                if (comparePassword(password, users.password)){
                    const access_token = encodeToken({id: users.id})
                    res.status(201).json({statusCode: 201, message: "Log In Succes", access_token, role: users.role})
                } else throw {name: "Invalid email or password", message: "Invalid email or password"} 
            } else throw {name: "Invalid email or password", message: "Invalid email or password"}
        } catch (error) {next(error)}
    }

    static async createUser (req, res, next) {
        try {
            const {username, email, password, role, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, role: "User", phoneNumber, address})
            res.status(201).json({statusCode: 201, user})
        } catch (error) {next(error)}
    }

    static async users (req, res, next) {
        try {
            const users = await User.findAll({attributes: ["username", "email", "address"]})
            res.status(200).json({statusCode: 200, users})
        } catch (error) {next(error)}
    }
    
    static async findUser (req, res, next) {
        try {
            const {id} = decodeToken(req.headers.access_token)
            const user = await User.findByPk(id, {attributes: ["username", "email", "address", "role"]})
            if (user == null)  throw {name: "is not exist", message: "User is not exist"}
            else res.status(200).json({statusCode: 200, user})
            
        } catch (error) {next(error)}
    }

    static async deleteUser (req, res, next) {
        try {
            const {id} = req.params
            let name
            const user = await User.findByPk(id)
            if (user == null)  throw {name: "is not exist", message: "User is not exist"}
            else name = user.username
            await User.destroy({where: {id: id}})
            res.status(200).json({statusCode: 200, message: `${name} succes to delete`})
        } catch (error) {next(error)}
    }

    static async createCategory (req, res, next) {
        try {
            let history = {}
            let categories = {}
            const {name} = req.body
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            const category = await Category.create({name})
            categories = category
            history.id = category.id
            history.name = category.name
            await History.create({name: history.name, description: `Category with id ${history.id} has been created`, updatedBy: history.email})
            res.status(201).json({statusCode: 201, categories})
        } catch (error) {next(error)}
    }

    static async categories (req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json({statusCode: 200, categories})
        } catch (error) {next(error)}
    }

    static async findCategory (req, res, next) {
        try {
            const {id} = req.params
            const category = await Category.findByPk(id)
            if (category == null) throw {name: "is not exist", message: "Category is not exist"}
            else res.status(200).json({statusCode: 200, category})
        } catch (error) {next(error)}
    }

    static async updateCategory (req, res, next){
        try {
            const {id} = req.params
            const {name} = req.body
            let history = {id}
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            const category = await Category.findByPk(id)
            if (category == null) throw {name: "is not exist", message: "Category is not exist"}
            else history.name = category.name
            await Category.update({name}, {where: {id}})
            const histories = await History.create({name, description: `Category with id ${id} has been updated from ${history.name} to ${name}`, updatedBy: history.email})
            res.status(200).json({statusCode: 200, histories})
        } catch (error) {next(error)}
    }

    static async deleteCategory (req, res, next) {
        try {
            const {id} = req.params
            let history = {id}
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            const category = await Category.findByPk(id)
            if (category == null) throw  {name: "is not exist", message: "Category is not exist"}
            else history.name = category.name
            await History.create({name: history.name, description: `Category with id ${id} has been deleted`, updatedBy: history.email})
            await Category.destroy({where: {id: id}})
            res.status(200).json({statusCode: 200, message: `${history.name} succes to delete`})
        } catch (error) {next(error)}
    }

    static async createProduct (req, res, next) {
        try {
            const {authorId} = req.user
            const {name, description, price, stock, imgUrl, categoryId} = req.body
            let history = {}
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            const product = await Product.create({name, description, price, stock, imgUrl, categoryId, authorId})
            history.product = product
            await History.create({name, description: `Product ${name} has been created`, updatedBy: history.email})
            res.status(201).json({statusCode: 201, ...history.product})
        } catch (error) {next(error)}
    }

    static async products (req, res, next) {
        try {
            const products = await Product.findAll({include: [{model: User, attributes: ["username", "email"]}, {model: Category, attributes: ["name"]}]})
            res.status(200).json({statusCode: 200, products})
        } catch (error) {next(error)}
    }

    static async findProduct (req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(+id, {include: {model: User, attributes: ["username", "email"]}})
            if (product == null) throw {name: "is not exist", message: "Product is not exist"}
            else res.status(200).json({statusCode: 200, product})
        } catch (error) {next(error)}
    }

    static async updateProduct (req, res, next){
        try {
            let history = {}
            const {id} = req.params
            const {name, description, price, stock, imgUrl, categoryId} = req.body
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            await Product.update({name, description, price, stock, imgUrl, categoryId}, {where: {id: id}})
            const producthistory = await Product.findByPk(id, {include: {model: User, attributes: ["username", "email"]}})
            if (producthistory == null) throw {name: "is not exist", message: "Product is not exist"}
            else {
                history.name = producthistory.name
            }
            const histories = await History.create({name: history.name, description: `Product with id ${id} has been updated`, updatedBy: history.email})
            res.status(200).json({statusCode: 200, histories})
        } catch (error) {next(error)}
    }

    static async patchProduct (req, res, next){
        try {
            let history = {}
            const {id} = req.params
            const {status} = req.body
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            const producthistory = await Product.findByPk(id, {include: {model: User, attributes: ["username", "email"]}})
            if (producthistory == null) throw {name: "is not exist", message: "Product is not exist"}
            else {
                history.name = producthistory.name
                history.before = producthistory.status
            }
            await Product.update({status}, {where: {id: id}})
            const histories = await History.create({name: history.name, description: `Product with id ${id} has been updated from ${history.before} to ${status}`, updatedBy: history.email})
            res.status(200).json({statusCode: 200, histories})
        } catch (error) {next(error)}
    }

    static async deleteProduct (req, res, next) {
        try {
            const {id} = req.params
            let history = {id}
            const userHistory = await User.findByPk(req.user.authorId)
            history.email = userHistory.email
            const product = await Product.findByPk(id)
            if (product == null) throw {name: "is not exist", message: "Product is not exist"}
            else history.name = product.name
            await History.create({name: history.name, description: `Product with id ${id} has been deleted`, updatedBy: history.email})
            Product.destroy({where: {id: id}})
            res.status(200).json({statusCode: 200, message: `${history.name} succes to delete`})
        } catch (error) {next(error)}
    }

    static async histories (req, res, next){
        try {
            const histories = await History.findAll({order: [["createdAt", "DESC"]]})
            res.status(200).json({statusCode: 200, histories})    
        } catch (error) {next(error)}
    }

    static async all (req, res, next) {
        try {
            let data = {}
            const users = await User.findAll({attributes: ["username", "email", "address"]})
            data.users = users
            const categories = await Category.findAll()
            data.categories = categories
            const products = await Product.findAll()
            data.products = products
            res.status(200).json({statusCode: 200, data})
        } catch (error) {next(error)}
    }
}

class PublicController {
    static async register (req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, role: "Customer", phoneNumber, address})
            res.status(201).json({statusCode: 201, user})
        } catch (error) {next(error)} }

    static async google (req, res, next) {
        try {
            const {access_token_google} = req.headers
            const ticket = await client.verifyIdToken({
            idToken: access_token_google,
            audience: CLIENT_ID
            });
            const {name, email} = ticket.getPayload();
            const [user, create] = await User.findOrCreate({
                where: {email}, defaults: {
                    username: name, password: String(Math.random()),  email, role: "Customer"
                }
            })
            if (user){
                const access_token = encodeToken({id: user.id})
                res.status(200).json({statusCode: 200, access_token})
            } else {
                const access_token = encodeToken({id: create.id})
                res.status(201).json({statusCode: 201, access_token})
            }
        } catch (error) {next(error)}}

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            if (!email) throw({name: "is empty", message: "Email is empty"})
            if (!password) throw({name: "is empty", message: "Password is empty"})
            const users = await User.findOne({where: {email: email}})
            if (users){
                if (comparePassword(password, users.password)){
                    const access_token = encodeToken({id: users.id})
                    res.status(201).json({statusCode: 201, message: "Log In Succes", access_token, role: users.role})
                } else throw {name: "Invalid email or password", message: "Invalid email or password"} 
            } else throw {name: "Invalid email or password", message: "Invalid email or password"}
        } catch (error) {next(error)}}

    static async products (req, res, next) {
        const { filter, sort, page, search} = req.query;
        console.log(req.query, "<<<<<<<<<<<<<<<<")
        const paramQuerySQL = {include: [{model: User, attributes: ["username", "email"]}, {model: Category, attributes: ["name"]}], order: [['id', 'DESC']], where: {status: "Active"}};
        let limit = 9;
        let offset;

        // searching by name
        if (search !== '' && typeof search !== 'undefined') {
            paramQuerySQL.where.name = {[Op.iLike]: `%${search}%`}
        }

        // filtering by category
        if (filter !== '' && typeof filter !== 'undefined') {
          paramQuerySQL.where.categoryId = +filter
        }
      
        // sorting
        if (sort !== '' && typeof sort !== 'undefined') {
          let query;
          if (sort.charAt(0) !== '-') query = [[sort, 'ASC']]
          else query = [[sort.replace('-', ''), 'DESC']];
          paramQuerySQL.order = query;
        }
      
        // pagination
        if (page !== '' && typeof page !== 'undefined') {
            if (typeof offset == NaN ) offset = 0
            else {
                offset = page * limit - limit;
                paramQuerySQL.offset = offset;
                paramQuerySQL.limit = limit;

            }
        } else {
          offset = 0;
          paramQuerySQL.limit = limit;
          paramQuerySQL.offset = offset;
        }

        try {
            const products = await Product.findAndCountAll(paramQuerySQL)
            res.status(200).json({statusCode: 200, products})
        } catch (error) {next(error)}}

    static async myBookmark (req, res, next) {
        try {
            const {authorId} = req.user
            const bookmark = await Favorite.findAll({where: {UserId: authorId}, include: [{model: User, attributes: ["username", "email"]}, {model: Product}]})
            res.status(200).json({statusCode: 200, bookmark})
        } catch (error) {next(error)}}

    static async findProduct (req, res, next) {
        try {
            const {id} = req.params
            let qrCode = ''
            const qr = await axios({
                method: "get",
                url: `https://api.qrserver.com/v1/create-qr-code/?data=https://localhost:3000/pub/products/${id}&size=100x100`,
            })
            console.log(qr.data)
            qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=https://localhost:3000/pub/products/${id}&size=100x100`
            const product = await Product.findByPk(+id, {include: [{model: User, attributes: ["username", "email"]}, {model: Category, attributes: ["name"]}]})
            if (product == null) throw {name: "is not exist", message: "Product is not exist"}
            else res.status(200).json({statusCode: 200, product, qrCode})
        } catch (error) {next(error)}}

    static async bookmark(req, res, next) {
        try {
            const {id} = req.params
            const {authorId} = req.user
            const product = await Product.findByPk(id)
            if (!product) throw ({name: "is not exist", message: "Product is not found"})
            const [user, create] = await Favorite.findOrCreate({where: {ProductId: id, UserId: authorId}, defaults: {ProductId: id, UserId: authorId}})
            if (!create) res.status(200).json({message: 'You have already bookmarked this product'})
            else res.status(201).json({statusCode: 201, message: "Bookmarking is success" })

        } catch (error) {next(error)}}
    
    static async unbookmark (req, res, next) {
        try {
            const {authorId} = req.user
            const {id} = req.params
            const product = await Favorite.destroy({where: {ProductId: id, UserId: authorId}})
            if (!product) throw ({name: "is not exist", message: "Bookmark is not found"})
            res.status(200).json({statusCode: 200, message: "Unbookmarking is success"})
        } catch (error) {next(error)}}

    static async qrCode (req, res, next) {
        try {
            const qrApi = "c085a80LhNSV5nZD8BB7XrvfJnvaIMsIKZyw17bZdGbez7h44Vz9ELD2"
            const qr = await axios({
                method: "post",
                url: `https://api.happi.dev/v1/qrcode?data=https://niix-brandedthings.web.app/`,
                headers: {
                    "x-happi-key": qrApi
                },
                data: {
                    data: `http://localhost:3000/pub/products/${id}`
                }
            })
        } catch (error) {next(error)}}

    static async categories (req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json({statusCode: 200, categories})
        } catch (error) {next(error)}}

    static async findCategory (req, res, next) {
        try {
            const {id} = req.params
            const category = await Category.findByPk(id)
            if (category == null) throw {name: "is not exist", message: "Category is not exist"}
            else res.status(200).json({statusCode: 200, category})
        } catch (error) {next(error)}}
}

module.exports = {Controller, PublicController}