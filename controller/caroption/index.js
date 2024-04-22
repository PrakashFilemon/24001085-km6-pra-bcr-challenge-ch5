const carOptionUsecase = require("../../usecase/caroption");

exports.getCarOption = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await carOptionUsecase.getCarOption(id);

    if (!data) {
      return next({
        message: `option with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllOption = async (req, res, next) => {
  try {
    const data = await carOptionUsecase.getAllOption();
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createOption = async (req, res, next) => {
  try {
    const { car_id, option } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "Car id must be provided!!",
        statusCode: 400,
      });
    }
    if (!option || option == "") {
      return next({
        message: "Option must be provided!!",
        statusCode: 400,
      });
    }
    const data = await carOptionUsecase.createOption({
      car_id,
      option,
    });
    res.status(201).json({
      message: "Success Create Data",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { car_id, option } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "Car id must be provided!!",
        statusCode: 400,
      });
    }
    if (!option || option == "") {
      return next({
        message: "Option must be provided!!",
        statusCode: 400,
      });
    }
    const data = await carOptionUsecase.updateOption(id, {
      car_id,
      option,
    });
    res.status(200).json({
      message: "Update Data Car Option Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOption = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await carOptionUsecase.deleteOption(id);

    res.status(200).json({
      message: "Delete Data Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
