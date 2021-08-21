const models = require("../models/index");
import sequelize from "sequelize";
import jwt from "jsonwebtoken";
require("dotenv").config();

//Funcion que devuelve mensaje de error personalizado segun diccionario
function errors(error) {
  let errorMessage = `${error}`;
  let flag = errorMessage.substring(
    errorMessage.indexOf("«") + 1,
    errorMessage.length - 1
  );

  const options = {
    Users_document_id_key:
      "Su documento de identidad ya se encuentra registrado en nuestra página web.",
    Users_email_key:
      "Su email ya se encuentra registrado en nuestra página web.",
    "TokenExpiredError: jwt expire": "Su sesión ha expirado.",
    "JsonWebTokenError: jwt malforme": "El token ingresado es incoherente.",
    "JsonWebTokenError: invalid signatur": "El token no es el esperado.",
    default: `Algo salió mal:  ${error}`,
  };
  console.log(flag);
  return options[flag];
}

export async function login(req, res) {
  const { email, password } = req.body;

  //Verify exist user
  const user = await models.User.findOne({
    where: {
      email: email,
      password: password,
    },
  });
  if (user) {
    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: "60s" },
      { algorithm: "HS256", expiresIn: "1h" }
    );
    const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, {
      algorithm: "HS256",
    });

    res.json({
      token,
      refreshToken,
      user,
    });
  } else {
    res.status(500).json({
      message: "El correo o la contraseña no existen.",
      data: {},
    });
  }
}

export async function refresh_token(req, res) {
  try {
    const user = jwt.verify(req.token, process.env.JWT_REFRESH_SECRET);
    if (user === null) res.status(403).json({ RES: "Error token inválido." });
    else {
      const token = jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "60s" },
        { algorithm: "HS256", expiresIn: "1h" }
      );
      const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, {
        algorithm: "HS256",
      });

      res.json({
        token,
        refreshToken,
        user,
      });
    }
  } catch (error) {
    res.status(403).json({
      message: errors(error),
    });
  }
}

export async function getUsers(req, res) {
  try {
    const result = jwt.verify(req.token, process.env.JWT_SECRET);
    if (result) {
      const users = await models.User.findAll();
      res.json({
        data: users,
      });
    }
  } catch (error) {
    res.status(403).json({
      message: errors(error),
    });
  }
}

export async function getOneUser(req, res) {
  const { id } = req.params;
  try {
    const result = jwt.verify(req.token, process.env.JWT_SECRET);
    if (result) {
      const user = await models.User.findOne({
        where: {
          id: id,
        },
      });
      res.json({
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function getBirthdayUser(req, res) {
  try {
    const result = jwt.verify(req.token, process.env.JWT_SECRET);
    if (result) {
      const user = await models.User.findAll({
        where: {
          birthday: sequelize.where(
            sequelize.literal("extract(MONTH FROM birthday)"),
            "01"
          ),
        },
      });
      res.json({
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function getClientUser(req, res) {
  try {
    const result = jwt.verify(req.token, process.env.JWT_SECRET);
    if (result) {
      const user = await models.User.findAll({
        where: {
          user_type: 1, //Cliente 1, Admin 2, trabajador 3
        },
      });
      res.json({
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  const {
    document_type,
    document_id,
    first_name,
    last_name,
    gender,
    phone,
    birthday,
    user_type,
    user_status,
    email,
    password,
  } = req.body;
  try {
    let newUser = await models.User.create({
      document_type,
      document_id,
      first_name,
      last_name,
      gender,
      phone,
      birthday,
      user_type,
      user_status,
      email,
      password,
    });
    if (newUser) {
      res.json({
        message: "SUCCESS!!",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: errors(error),
      data: {},
    });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const {
    document_type,
    document_id,
    first_name,
    last_name,
    gender,
    phone,
    birthday,
    user_type,
    user_status,
    email,
    password,
  } = req.body;
  try {
    const result = jwt.verify(req.token, process.env.JWT_SECRET);
    if (result) {
      const userFound = await models.User.findAll({
        attributes: [
          "document_type",
          "document_id",
          "first_name",
          "last_name",
          "gender",
          "phone",
          "birthday",
          "user_type",
          "user_status",
        ],
        where: {
          id: id,
        },
      });
      if (userFound.length > 0) {
        userFound.forEach(async (userFound) => {
          await models.User.update(
            {
              document_type,
              document_id,
              first_name,
              last_name,
              gender,
              phone,
              birthday,
              user_type,
              user_status,
              email,
              password,
            },
            {
              where: {
                id: id,
              },
            }
          );
        });
      }
      return res.json({
        message: "user updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: errors(error),
      data: {},
    });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = jwt.verify(req.token, process.env.JWT_SECRET);
    if (result) {
      const deleteRowCount = models.User.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        message: "User deleted successfully",
        count: deleteRowCount,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}
