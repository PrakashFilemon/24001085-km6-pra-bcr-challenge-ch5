const bcrypt = require("bcrypt");
const crypto = require("crypto");
const path = require("path");
const { user } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const { getData, setData } = require("../../helper/redis");

exports.createUser = async (payload) => {
  // encrypt the password
  payload.password = bcrypt.hashSync(payload.password, 10);

  //upload image to cloudinary
  if (payload.photo) {
    const { photo } = payload;

    photo.publicId = crypto.randomBytes(16).toString("hex");

    photo.name = `${photo.publicId}${path.parse(photo.name).ext}`;

    const imageUpload = await uploader(photo);
    payload.photo = imageUpload.secure_url;
  }
  // Save To DB
  const data = await user.create(payload);

  // Save To Redis
  //Save ID
  const keyID = `user:${data.id}`;
  await setData(keyID, data, 300);

  // Save Email
  const keyEmail = `user:${data.email}`;
  await setData(keyEmail, data, 300);

  return data;
};

exports.getUserByID = async (id) => {
  const key = `user:${id}`;

  //Get data From Redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  //Get data From DB
  data = await user.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // Save Data To Redis
    await setData(key, data[0], 300);

    return data[0];
  }
  throw new Error(`User Not Found`);
};

exports.getUserByEmail = async (email) => {
  const key = `user:${email}`;

  //Get data From Redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  //Get data From DB
  data = await user.findAll({
    where: {
      email,
    },
  });
  if (data.length > 0) {
    // Save Data To Redis
    await setData(key, data[0], 300);

    return data[0];
  }
  throw new Error(`User Not Found`);
};
