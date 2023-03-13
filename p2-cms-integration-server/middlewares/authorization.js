const {User, Category, Product} = require('../models')

const authorization = async (req, res, next) => {
    try {
        const {id} = req.params
        const {authorId} = req.user
        const user = await User.findByPk(authorId)
        if (user.role == "Admin") next()
        else {
            const product = await Product.findByPk(id)
            if (authorId == product.authorId) next()
            else throw {name: "previlege", message: `You're not authorized to access this ${product.name}`}
        }
    } catch (error) {next(error)}
}

module.exports = authorization