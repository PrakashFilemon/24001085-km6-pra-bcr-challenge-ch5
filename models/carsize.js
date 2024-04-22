"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class carsize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      carsize.hasMany(models.car, { foreignKey: "carsize_id" });
    }
  }
  carsize.init(
    {
      size: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "carsize",
      paranoid: true,
    }
  );
  return carsize;
};
