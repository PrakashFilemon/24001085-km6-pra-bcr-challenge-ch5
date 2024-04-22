"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car.belongsTo(models.carsize, { foreignKey: "carsize_id" });
      car.hasMany(models.carOption, { foreignKey: "car_id" });
      car.hasMany(models.carSpec, { foreignKey: "car_id" });
    }
  }
  car.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      image: DataTypes.TEXT,
      rentPerDay: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      carsize_id: DataTypes.INTEGER,
      availableAt: DataTypes.DATE,
      transmission: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      typeCar: DataTypes.STRING,
      Year: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "car",
      paranoid: true,
    }
  );
  return car;
};
