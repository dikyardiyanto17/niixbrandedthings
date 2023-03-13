'use strict';

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
    let data = [
     {
       name: "Toys", createdAt: new Date(), updatedAt: new Date()
     }, {
       name: "Games", createdAt: new Date(), updatedAt: new Date()
     }, {
       name: "Tools", createdAt: new Date(), updatedAt: new Date()
     }, {
       name: "Foods", createdAt: new Date(), updatedAt: new Date()
     }, {
       name: "Drinks", createdAt: new Date(), updatedAt: new Date()
     }
    ]
    await queryInterface.bulkInsert("Categories", data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {truncate: true, cascade: true, restartIdentity: true})
  }
};
