'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model:{tableName: "Categories"}, key: "id"},
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model:{tableName: "Users"}, key: "id"},
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false, 
        defaultValue: "Active"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};