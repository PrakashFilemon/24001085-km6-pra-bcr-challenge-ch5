"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      manufacture: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      rentPerDay: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      carsize_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "carsizes",
          },
          key: "id",
        },
      },
      availableAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      transmission: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      available: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      typeCar: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cars");
  },
};
