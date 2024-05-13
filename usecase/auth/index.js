const {
  createUser,
  getUserByEmail,
  getUserByID,
} = require("../../repository/auth");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (payload) => {
  let user = await createUser(payload);

  // Deleted Password From user object
  delete user.dataValues.password;

  // CreateToken
  const jwtPayload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Return user data and token
  const data = {
    user,
    token,
  };
  return data;
};

exports.login = async (email, password) => {
  //Get User
  let user = await getUserByEmail(email);

  if (!user) {
    throw new Error(`User is not found`);
  }

  // compare password
  const isValid = await bcrypt.compare(password, user?.password);
  if (!isValid) {
    throw new Error(`Wrong Password`);
  }
  //delete Password
  if (user?.dataValues?.password) {
    delete user?.dataValues?.password;
  } else {
    delete user?.password;
  }

  // CreateToken
  const jwtPayload = {
    id: user.id,
  };

  const token = jsonwebtoken.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Return user data and token
  const data = {
    user,
    token,
  };
  return data;
};

exports.googleLogin = async (accessToken) => {
  // validate the token and get data from google
};

exports.profile = async (id) => {
  //Get user
  let data = await getUserByID(id);

  if (!data) {
    throw new Error(`User is not found`);
  }

  //delete Password
  if (data?.dataValues?.password) {
    delete data?.dataValues?.password;
  } else {
    delete data?.password;
  }

  return data;
};
