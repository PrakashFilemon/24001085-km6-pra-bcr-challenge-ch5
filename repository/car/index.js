const crypto = require("crypto");
const { carsize, car, carOption, carSpec } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const path = require("path");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getCar = async (id) => {
  // Cek apakah ada data didalam redis Jika ada akan mengembalikan data
  const key = `Car:${id}`;
  let data = await getData(key);
  if (data) {
    return data;
  }
  data = await car.findAll({
    include: [
      {
        model: carOption,
      },
      {
        model: carSpec,
      },
    ],
  });
  if (data.length > 0) {
    await setData(key, data, 300);

    return data[0];
  }
  throw new Error(`Car Not Found`);
};

exports.getAllCar = async () => {
  const data = await car.findAll({
    include: [
      {
        model: carOption,
      },
      {
        model: carSpec,
      },
      {
        model: carsize,
      },
    ],
  });
  return data;
};

exports.createCar = async (payload) => {
  //upload image to cloudinary
  if (payload.image) {
    const { image } = payload;

    image.publicId = crypto.randomBytes(16).toString("hex");
    uploader(payload.image);

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  const data = await car.create(payload);

  const key = `Car${data.id}`;
  await setData(key, data, 300);
  return data;
};

exports.updateCar = async (id, payload) => {
  const key = `Car:${id}`;

  await car.update(payload, {
    where: {
      id,
    },
  });
  //Get data from Postgres
  const data = await car.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.deleteCar = async (id) => {
  const key = `car:${id}`;

  await car.destroy({ where: { id } });

  await deleteData(key);
  return null;
};
