const { register, login, profile } = require("../usecase/auth");

exports.register = async (req, res, next) => {
  try {
    //get body
    const { email, password, name } = req.body;

    const photo = req?.files?.photo;

    if (email == "" || !email) {
      return next({
        message: "Email Must be filled!!",
        statusCode: 400,
      });
    }

    if (password == "" || !password) {
      return next({
        message: "Password Must be filled!!",
        statusCode: 400,
      });
    }

    if (name == "" || !name) {
      return next({
        message: "Name Must be filled!!",
        statusCode: 400,
      });
    }

    const data = await register({ email, password, name, photo });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email == "" || !email) {
      return next({
        message: "Email Must be filled!!",
        statusCode: 400,
      });
    }

    if (password == "" || !password) {
      return next({
        message: "Password Must be filled!!",
        statusCode: 400,
      });
    }

    //Login Logic
    const data = await login(email, password);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    //Get user by Id
    const data = req.user;

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.addAdmin = async (req, res, next) => {
  try {
    // get the body
    const { email, password, name, role } = req.body;

    // get the photo
    const photo = req?.files?.photo;

    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      });
    }
    if (name == "" || !name) {
      return next({
        message: "Name must be filled!",
        statusCode: 400,
      });
    }
    if (role == "" || !role) {
      return next({
        message: "role must be filled!",
        statusCode: 400,
      });
    }

    const data = await register({
      email,
      password,
      name,
      photo,
      role,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
