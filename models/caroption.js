"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      carOption.belongsTo(models.car, { foreignKey: "car_id" });
    }
  }
  carOption.init(
    {
      car_id: DataTypes.INTEGER,
      option: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "carOption",
    }
  );
  return carOption;
};
