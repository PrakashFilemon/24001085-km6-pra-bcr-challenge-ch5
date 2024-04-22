"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("carOptions", "car_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "cars", // nama tabel target
        key: "id",
      },
    });
    await queryInterface.addColumn("carSpecs", "car_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "cars", // nama tabel target
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("carOptions", "car_id");
    await queryInterface.removeColumn("carSpecs", "car_id");
  },
};
