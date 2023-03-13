'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, {foreignKey: "authorId", onDelete: "CASCADE"})
      User.hasMany(models.Favorite, {foreignKey: "UserId", onDelete: "CASCADE"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username is empty"
        },
        notEmpty: {
          msg: "username is empty"
        }
      },
      unique: {
        args: true,
        msg: "this username has been taken"
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is empty"
        },
        notEmpty: {
          msg: "password is empty"
        },
        len: {
          args: [5,24],
          msg: "password must between 5 and 24"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg : "email is empty"
        },
        notEmpty: {
          msg : "email is empty"
        },
        isEmail: {
          msg: "email is not valid"
        }
      },
      unique: {
        args: true,
        msg: "this email has been taken"
      },
    },
    role : DataTypes.STRING,
    phoneNumber : DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        let hash = hashPassword(user.password)
        user.password = hash
      }
    }
  });
  return User;
};