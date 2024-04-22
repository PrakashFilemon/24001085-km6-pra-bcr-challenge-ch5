const carspecUsecase = require("../../usecase/carspec");

exports.getSpec = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await carspecUsecase.getSpec(id);

    if (!data) {
      return next({
        message: `Spec with id ${id} is not found!`,
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

exports.getAllSpec = async (req, res, next) => {
  try {
    const data = await carspecUsecase.getAllSpec();
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createSpec = async (req, res, next) => {
  try {
    const { car_id, spec } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "Car id must be provided!!",
        statusCode: 400,
      });
    }
    if (!spec || spec == "") {
      return next({
        message: "Spec must be provided!!",
        statusCode: 400,
      });
    }
    const data = await carspecUsecase.createSpec({
      car_id,
      spec,
    });
    res.status(201).json({
      message: "Success Create Data",
      data,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateSpec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { car_id, spec } = req.body;
    if (!car_id || car_id == "") {
      return next({
        message: "Car id must be provided!!",
        statusCode: 400,
      });
    }
    if (!spec || spec == "") {
      return next({
        message: "Spec must be provided!!",
        statusCode: 400,
      });
    }
    const data = await carspecUsecase.updateSpec(id, { car_id, spec });
    res.status(200).json({
      message: "Update Data Car Spec Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSpec = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await carspecUsecase.deleteSpec(id);

    res.status(200).json({
      message: "Delete Data Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
