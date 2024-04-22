"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carSpec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      carSpec.belongsTo(models.car, { foreignKey: "car_id" });
    }
  }
  carSpec.init(
    {
      car_id: DataTypes.INTEGER,
      spec: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "carSpec",
    }
  );
  return carSpec;
};
