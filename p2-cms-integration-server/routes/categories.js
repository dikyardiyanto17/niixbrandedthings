const {Controller} = require('../controllers')
const express = require('express')
const router = express.Router()

router.post('/', Controller.createCategory)
router.get('/', Controller.categories)
router.get('/:id', Controller.findCategory)
router.put('/:id', Controller.updateCategory)
router.delete('/:id', Controller.deleteCategory)

module.exports = router