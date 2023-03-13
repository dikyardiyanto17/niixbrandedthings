'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {foreignKey: "categoryId", onDelete: "CASCADE"})
    }
  }
  Category.init({
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
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};