const { carsize, car, carOption, carSpec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCarsize = async (id) => {
  //Mengecek apakah data berada didalam redis Jika ada maka akan mengembalikan data
  const key = `carsize:${id}`;
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await carsize.findAll({
    where: {
      id,
    },
    include: {
      model: car,
    },
  });
  if (data.length > 0) {
    await setData(key, data, 300);

    return data[0];
  }
  throw new Error(`carsize Not Found`);
};

exports.getAllCarsize = async () => {
  const data = await carsize.findAll({
    include: {
      model: car,
    },
  });
  return data;
};

exports.createCarsize = async (payload) => {
  const data = await carsize.create(payload);
  const key = `carsize${data.id}`;
  await setData(key, data, 300);
  return data;
};

exports.updateCarsize = async (id, payload) => {
  const key = `carsize:${id}`;
  const data = await carsize.update(payload, {
    where: {
      id,
    },
  });
  data = await carsize.findByPk(id, {
    where: {
      model: car,
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }
  throw new Error(`size is not found!`);
};

exports.deleteCarsize = async (id) => {
  const key = `carsize:${id}`;

  await carsize.destroy({ where: { id } });
  await deleteData(key);
  return null;
};
