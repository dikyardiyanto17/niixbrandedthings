const {Controller} = require('../controllers')
const express = require('express')
const router = express.Router()

router.post('/', Controller.createUser)
router.get('/', Controller.users)
router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.get('/:id', Controller.findUser)
router.delete('/:id', Controller.deleteUser)

module.exports = router