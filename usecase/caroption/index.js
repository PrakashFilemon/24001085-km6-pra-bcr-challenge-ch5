const carOptionRepo = require("../../repository/caroption");

exports.getCarOption = async (id) => {
  const data = await carOptionRepo.getCarOption(id);
  return data;
};

exports.getAllOption = async () => {
  const data = await carOptionRepo.getAllOption();
  return data;
};

exports.createOption = async (payload) => {
  const data = await carOptionRepo.createOption(payload);
  return data;
};
exports.updateOption = async (id, payload) => {
  await carOptionRepo.updateOption(id, payload);
  const data = await carOptionRepo.getCarOption(id);
  return data;
};

exports.deleteOption = async (id) => {
  const data = await carOptionRepo.deleteOption(id);
  return data;
};
