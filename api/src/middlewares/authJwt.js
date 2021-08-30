const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = async (req, res, next) => {
  try {
    //Asking for token in header
    const token = req.headers["token"];

    if (!token) {
      res.status(403).json({
        message: "No token provided",
      });
    } else {
      const decoded = jwt.verify(token, config.SECRET);

      //Verifying if exist an user with that token
      const userExist = await models.User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (!userExist) {
        res.status(403).json({
          message: "User does not exist",
        });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
};

export const verifyAccess = async (req, res, next) => {
  try {
    //Asking for token in header
    const token = req.headers["token"];

    const decoded = jwt.verify(token, config.SECRET);

    const userExist = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (userExist.user_type != 1) {
      next();
    } else {
      res.json({
        message: "You are not allowed to do that",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
};

export const verifyBelongsToUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    //Asking for token in header
    const token = req.headers["token"];

    if (!token) {
      res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, config.SECRET);

    //Verifying if exist an user with that token
    const userExist = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!userExist) {
      res.status(401).json({
        message: "User does not exist",
      });
    } else {
      //Verifying that only the client has access to update/delete of his account, or the admin
      if (userExist.user_type == 1 && userExist.id != id) {
        res.status(500).json({
          message: "You are not allowed to do that",
        });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong in authJwt " + error,
      data: {},
    });
  }
};
