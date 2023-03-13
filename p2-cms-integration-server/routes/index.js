const {Controller, PublicController} = require('../controllers')
const express = require('express')
const authenthication = require('../middlewares/authentication')


const router = express.Router()

router.use('/pub', require('./public'))
router.get('/all', Controller.all)
router.use('/users', require('./users'))


router.post('/google-sign-in', Controller.google)
router.use(authenthication)
router.get('/histories', Controller.histories)
router.get('/users/find', Controller.findUser)
router.use('/categories', require('./categories'))
router.use('/products', require('./products'))

module.exports = router