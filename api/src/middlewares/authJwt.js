const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export const passwordAccess = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      res.status(500).json({
        message: "No token provided",
      });
    } else {
      const decoded = jwt.verify(token, config.SECRET);
      const userExist = await models.User.findOne({
        where: {
          id: decoded.id,
        },
      });

      if (userExist) {
        if (userExist.user_type == 1 && userExist.id != id) {
          res.status(500).json({
            message: "You are not allowed to do that",
          });
        } else {
          next();
        }
      } else {
        res.status(403).json({
          message: "No user match with the token provided",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in passwordAccess " + error.message,
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers["authorization"];
 
    if (!token) {
      res.status(500).json({
        message: "No token provided",
      });
    } else {
      const decoded = jwt.verify(token, config.SECRET);
      const userExist = await models.User.findOne({
        where: {
          id: decoded.id,
        },
      });
      if (userExist) {

        if (!userExist.user_status) {
          res.status(422).json({
            message: "account disabled",
          });
        }else{
          return userExist;
        }        
        
      } else {
        res.status(403).json({
          message: "No user match with the token provided",
        });
      }
    }    
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyAccess = async (req, res, next) => {
  try {
    //Verifying if the token is valid
    const userExist = await verifyToken(req, res);    

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
    const userExist = await verifyToken(req, res);
    //Verifying that only the client has access to update/delete of his account, or the admin
    if (userExist.user_type != 3 && userExist.id != id) {
      res.status(500).json({
        message: "You are not allowed to do that",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "You are not allowed to do that",
    });
  }
};
