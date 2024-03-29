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
    user_restaurant,
    email,
    password,
  } = req.body;

  try {
    const emailExist = await models.User.findOne({
      where: {
        email: email,
      },
    });

    const docIdExist = await models.User.findOne({
      where: {
        document_id: document_id,
      },
    });

    if (emailExist) {
      return res.status(400).json({
        message: "Ese correo ya está en uso.",
      });
    }

    if (docIdExist) {
      return res.status(400).json({
        message: "El documento debe ser único.",
      });
    }

    let newUser = await models.User.create({
      document_type,
      document_id,
      first_name,
      last_name,
      gender,
      phone,
      birthday,
      user_type: 1,
      user_restaurant,
      user_status,
      email,
      password: await models.User.encryptPassword(password),
    });
    if (newUser) {
      const token = jwt.sign({ id: newUser.id }, config.SECRET, {
        expiresIn: 86400, // 24 Hours
      });
      res.json({
        message: "SUCCESS!!",
        data: newUser,
        Authorization: token,
      });
    }
  } catch (error) {}
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const userFound = await models.User.findOne({
    where: {
      email: email,
    },
  });

  if (userFound) {
    const matchPassword = await models.User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) {
      res.status(422).json({
        message: "Contraseña inválida.",
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
      message: "El usuario no existe",
    });
  }
}
