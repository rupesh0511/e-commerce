const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authmiddleware = (role) => async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_secret_key);

    const payload = jwt.decode(token);

    if (role.includes(payload.role)) {
      const user = await userModel.findById(payload.id);
      // console.log(user);
      req.user = user;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "forbiddden",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      succes: false,
      message: "forbidden",
    });
  }
};

module.exports = authmiddleware;
