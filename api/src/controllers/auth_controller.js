const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function signUp(req, res) {
  const {
    document_type,
    document_id,
    first_name,
    last_name,
    gender,
    birthday,
    phone,
    user_status,
    email,
    password,
  } = req.body;

  const userExist = await models.User.findOne({
    where: {
      email: email,
    },
  });
  if (!userExist) {
    try {
      let newUser = await models.User.create({
        document_type,
        document_id,
        first_name,
        last_name,
        gender,
        phone,
        birthday,
        user_type: 1,
        user_status,
        email,
        password: await models.User.encryptPassword(password),
      });
      if (newUser) {
        res.json({
          message: "SUCCESS!!",
          data: newUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Something goes wrong " + error,
        data: {},
      });
    }
  } else {
    res.json({
      message: "SUCCESS!!",
      data: newUser,
    });
  }

  const token = jwt.sign({ id: newUser.id }, config.SECRET, {
    expiresIn: 86400, // 24 Hours
  });

  res.json({ token });
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const userFound = await models.User.findOne({
    where: {
      email: email,
    },
  });

  if (userFound) {
    if (!userFound.user_status) {
      res.status(422).json({
        message: "account disabled",
      });
    }
    const matchPassword = await models.User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) {
      res.status(422).json({
        message: "Invalid password",
      });
    } else {
      const token = jwt.sign({ id: userFound.id }, config.SECRET, {
        expiresIn: 86400, //24 Hours
      });
      res.json({
        id: userFound.id,
        token: token,
        message: "Welcome",
      });
    }
  } else {
    res.status(422).json({
      message: "That user doesnt exist",
    });
  }
}
