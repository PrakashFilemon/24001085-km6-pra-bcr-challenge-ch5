const { carsize, car, carOption, carSpec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getSpec = async (id) => {
  const key = `carspec:${id}`;
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await carSpec.findAll({
    where: {
      id,
    },
    include: {
      model: car,
      attributes: ["id"],
    },
  });
  if (data.length > 0) {
    await setData(key, data, 300);

    return data[0];
  }
  throw new Error(`Spec Not Found`);
};

exports.getAllSpec = async () => {
  const data = await carSpec.findAll({
    include: {
      model: car,
      attributes: ["id"],
    },
  });
  return data;
};

exports.createSpec = async (payload) => {
  const data = await carSpec.create(payload);
  const key = `carspec${data.id}`;
  await setData(key, data, 300);
  return data;
};

exports.updateSpec = async (id, payload) => {
  const key = `carspec:${id}`;

  await carSpec.update(payload, {
    where: {
      id,
    },
  });
  const data = await carSpec.findAll({
    where: {
      id,
    },
    include: {
      model: car,
      attributes: ["id"],
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Spec is not found!`);
};

exports.deleteSpec = async (id) => {
  const key = `carspec:${id}`;

  await carSpec.destroy({ where: { id } });
  await deleteData(key);
  return null;
};
