const carSpecRepo = require("../../repository/carspec");

exports.getSpec = async (id) => {
  const data = await carSpecRepo.getSpec(id);
  return data;
};

exports.getAllSpec = async () => {
  const data = await carSpecRepo.getAllSpec();
  return data;
};

exports.createSpec = async (payload) => {
  const data = await carSpecRepo.createSpec(payload);
  return data;
};
exports.updateSpec = async (id, payload) => {
  await carSpecRepo.updateSpec(id, payload);
  const data = await carSpecRepo.getSpec(id);
  return data;
};
exports.deleteSpec = async (id) => {
  const data = await carSpecRepo.deleteSpec(id);
  return data;
};
