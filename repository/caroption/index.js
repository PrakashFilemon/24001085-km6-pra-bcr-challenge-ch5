const { carsize, car, carOption, carSpec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCarOption = async (id) => {
  const key = `caroption:${id}`;
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await carOption.findAll({
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
  throw new Error(`Option Not Found`);
};

exports.getAllOption = async () => {
  const data = await carOption.findAll({
    include: {
      model: car,
      attributes: ["id"],
    },
  });
  return data;
};

exports.createOption = async (payload) => {
  const data = await carOption.create(payload);
  const key = `caroption${data.id}`;
  await setData(key, data, 300);
  return data;
};

exports.updateOption = async (id, payload) => {
  const key = `caroption:${id}`;

  await carOption.update(payload, {
    where: {
      id,
    },
  });
  const data = await carOption.findAll({
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

  throw new Error(`Option is not found!`);
};

exports.deleteOption = async (id) => {
  const key = `caroption:${id}`;
  await carOption.destroy({ where: { id } });
  await deleteData(key);
  return null;
};
