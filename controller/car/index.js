const carUsecase = require("../../usecase/car");

exports.getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCar(id);

    if (!data) {
      return next({
        message: `Class with id ${id} is not found!`,
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

exports.getAllCar = async (req, res, next) => {
  try {
    const data = await carUsecase.getAllCar();
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCar = async (req, res, next) => {
  try {
    const {
      plate,
      manufacture,
      model,
      rentPerDay,
      capacity,
      description,
      carsize_id,
      availableAt,
      transmission,
      available,
      typeCar,
      Year,
    } = req.body;
    const { image } = req.files;
    if (!plate || plate == " ") {
      return next({
        message: "Plate must be provided!!",
        statusCode: 400,
      });
    }
    if (!manufacture || manufacture == " ") {
      return next({
        message: "Manufacture must be provided!!",
        statusCode: 400,
      });
    }
    if (!model || model == " ") {
      return next({
        message: "Model must be provided!!",
        statusCode: 400,
      });
    }
    if (!rentPerDay || rentPerDay == " ") {
      return next({
        message: "rentPerDay must be provided!!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity == " ") {
      return next({
        message: "Capacity must be provided!!",
        statusCode: 400,
      });
    }
    if (!description || description == " ") {
      return next({
        message: "Description must be provided!!",
        statusCode: 400,
      });
    }
    if (!carsize_id || carsize_id == " ") {
      return next({
        message: "Carsize_id must be provided!!",
        statusCode: 400,
      });
    }
    if (!availableAt || availableAt == " ") {
      return next({
        message: "AvailableAt must be provided!!",
        statusCode: 400,
      });
    }
    if (!transmission || transmission == " ") {
      return next({
        message: "Transmission must be provided!!",
        statusCode: 400,
      });
    }
    if (!available || available == " ") {
      return next({
        message: "Available must be provided!!",
        statusCode: 400,
      });
    }
    if (!typeCar || typeCar == " ") {
      return next({
        message: "typeCar must be provided!!",
        statusCode: 400,
      });
    }
    if (!Year || Year == " ") {
      return next({
        message: "Year must be provided!!",
        statusCode: 400,
      });
    }

    const data = await carUsecase.createCar({
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      carsize_id,
      availableAt,
      transmission,
      available,
      typeCar,
      Year,
    });
    res.status(201).json({
      message: "Success Created Car",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      plate,
      manufacture,
      model,
      rentPerDay,
      capacity,
      description,
      carsize_id,
      availableAt,
      transmission,
      available,
      typeCar,
      Year,
    } = req.body;
    if (!plate || plate == " ") {
      return next({
        message: "Plate must be provided!!",
        statusCode: 400,
      });
    }
    if (!manufacture || manufacture == " ") {
      return next({
        message: "Manufacture must be provided!!",
        statusCode: 400,
      });
    }
    if (!model || model == " ") {
      return next({
        message: "Model must be provided!!",
        statusCode: 400,
      });
    }
    if (!rentPerDay || rentPerDay == " ") {
      return next({
        message: "rentPerDay must be provided!!",
        statusCode: 400,
      });
    }
    if (!capacity || capacity == " ") {
      return next({
        message: "Capacity must be provided!!",
        statusCode: 400,
      });
    }
    if (!description || description == " ") {
      return next({
        message: "Description must be provided!!",
        statusCode: 400,
      });
    }
    if (!carsize_id || carsize_id == " ") {
      return next({
        message: "Carsize_id must be provided!!",
        statusCode: 400,
      });
    }
    if (!availableAt || availableAt == " ") {
      return next({
        message: "AvailableAt must be provided!!",
        statusCode: 400,
      });
    }
    if (!transmission || transmission == " ") {
      return next({
        message: "Transmission must be provided!!",
        statusCode: 400,
      });
    }
    if (!available || available == " ") {
      return next({
        message: "Available must be provided!!",
        statusCode: 400,
      });
    }
    if (!typeCar || typeCar == " ") {
      return next({
        message: "typeCar must be provided!!",
        statusCode: 400,
      });
    }
    if (!Year || Year == " ") {
      return next({
        message: "Year must be provided!!",
        statusCode: 400,
      });
    }

    const data = await carUsecase.updateCar(id, {
      plate,
      manufacture,
      model,
      rentPerDay,
      capacity,
      description,
      carsize_id,
      availableAt,
      transmission,
      available,
      typeCar,
      Year,
    });
    res.status(201).json({
      message: "Success Update Car",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.deleteCar(id);

    res.status(200).json({
      message: "SUCCESS",
      data,
    });
  } catch (error) {
    next(error);
  }
};
