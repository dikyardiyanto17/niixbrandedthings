'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {foreignKey: "authorId", onDelete: "CASCADE"})
      Product.belongsTo(models.Category, {foreignKey: "categoryId", onDelete: "CASCADE"})
      Product.hasMany(models.Favorite, {foreignKey: "ProductId", onDelete: "CASCADE"})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name cannot be empty"
        },
        notEmpty: {
          msg: "name cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description cannot be empty"
        },
        notEmpty: {
          msg: "description cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price cannot be empty"
        },
        notEmpty: {
          msg: "price cannot be empty"
        },
        min: {
          args: 100,
          msg: "Price is less than 100"
        }
      }
    },
    stock: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active"
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};