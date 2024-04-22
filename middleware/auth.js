const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth/index");

exports.authMiddleware = (roles) => async (req, res, next) => {
  try {
    //Get Token From Headers
    const token = getTokenFromHeaders(req?.headers);

    //Extrct Token to get user id
    const extractedToken = extractToken(token);

    // Get User detail by id
    const user = await profile(extractedToken?.id);

    //Get Role
    if (!roles.includes(user?.role)) {
      return next({
        message: "Forbidden!",
        statusCode: 403,
      });
    }

    // Pass the user profile to request
    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
