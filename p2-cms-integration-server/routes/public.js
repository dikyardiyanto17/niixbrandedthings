const {PublicController} = require('../controllers')
const express = require('express')
const authenthication = require('../middlewares/authentication')
const router = express.Router()

router.post('/login', PublicController.login)
router.post('/register', PublicController.register)
router.post('/google-sign-in', PublicController.google)
router.get('/products', PublicController.products)
router.get('/products/:id', PublicController.findProduct)
router.get('/categories', PublicController.categories)
router.get('/categories/:id', PublicController.findCategory)

router.use(authenthication)

router.get('/mybookmark', PublicController.myBookmark)
router.post('/bookmark/:id', PublicController.bookmark)
router.delete('/bookmark/:id', PublicController.unbookmark)

module.exports = router