const carsizeUsecase = require("../../usecase/carsize");

exports.getCarsize = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await carsizeUsecase.getCarsize(id);

    if (!data) {
      return next({
        message: `Carsize with id ${id} is not found!`,
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

exports.getAllCarsize = async (req, res, next) => {
  try {
    const data = await carsizeUsecase.getAllCarsize();
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCarsize = async (req, res, next) => {
  try {
    const { size } = req.body;
    if (!size || size == "") {
      return next({
        message: "Size must be provided!!",
        statusCode: 400,
      });
    }
    const data = await carsizeUsecase.createCarsize({
      size,
    });
    res.status(201).json({
      message: "Success Create Data",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateCarsize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { size } = req.body;
    if (!size || size == "") {
      return next({
        message: "Size must be provided!!",
        statusCode: 400,
      });
    }
    const data = await carsizeUsecase.updateCarsize(id, { size });

    res.status(200).json({
      message: "Update Carsize Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCarsize = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await carsizeUsecase.deleteCarsize(id);

    res.status(200).json({
      message: "Delete Data Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
