'use strict';

const { hashPassword } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let password = hashPassword("22222")
   let data = [
     {
       username: "Diky", password, email: "2@gmail.com", role: "Admin", phoneNumber: "085222222222", address: "Dersalam", createdAt: new Date(), updatedAt: new Date()
     }
   ]
   await queryInterface.bulkInsert("Users", data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {truncate: true, cascade: true, restartIdentity: true})
  }
};
