const {Controller} = require('../controllers')
const express = require('express')
const authorization = require('../middlewares/authorization')
const router = express.Router()

router.post('/', Controller.createProduct)
router.get('/', Controller.products)
router.get('/:id', Controller.findProduct)
router.put('/:id', authorization, Controller.updateProduct)
router.patch('/:id', authorization, Controller.patchProduct)
router.delete('/:id', authorization,Controller.deleteProduct)

module.exports = router