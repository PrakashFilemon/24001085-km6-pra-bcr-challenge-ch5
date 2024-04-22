const carsizeRepo = require("../../repository/carsize");

exports.getCarsize = async (id) => {
  const data = await carsizeRepo.getCarsize(id);
  return data;
};

exports.getAllCarsize = async () => {
  const data = await carsizeRepo.getAllCarsize();
  return data;
};

exports.createCarsize = async (payload) => {
  const data = await carsizeRepo.createCarsize(payload);
  return data;
};
exports.updateCarsize = async (id, payload) => {
  await carsizeRepo.updateCarsize(id, payload);
  const data = await carsizeRepo.getCarsize(id);
  return data;
};

exports.deleteCarsize = async (id) => {
  const data = await carsizeRepo.deleteCarsize(id);
  return data;
};
