const models = require("../models/index");
import { sendEmail } from "../middlewares";
import sequelize from "sequelize";
import jwt from "jsonwebtoken";
import config from "../config";
import { verifyToken } from "../middlewares/authJwt";
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

/*export async function login(req, res) {
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
}*/

/*export async function refresh_token(req, res) {
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
}*/

export async function getUsers(req, res) {
  const users = await models.User.findAll();

  if (users.length > 0) {
    res.json({
      data: users,
    });
  } else {
    res.json({
      message: "There is no users",
    });
  }
}

export async function getOneUser(req, res) {
  const { id } = req.params;
  const user = await models.User.findOne({
    where: {
      id: id,
    },
  });
  res.json({
    data: user,
  });
}

export async function getBirthdayUser(req, res) {
  const actualMonth = new Date(Date.now()).getMonth() + 1;

  const user = await models.User.findAll({
    where: {
      birthday: sequelize.where(
        sequelize.literal("extract(MONTH FROM birthday)"),
        actualMonth
      ),
    },
  });
  res.json({
    data: user,
  });
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
  } = req.body;

  const userFound = await models.User.findOne({
    attributes: [
      "document_type",
      "document_id",
      "first_name",
      "last_name",
      "gender",
      "phone",
      "birthday",
      "user_type",
    ],
    where: {
      id: id,
    },
  });

  const { user_type: user_type_req } = await verifyToken(req, res);

  if (userFound) {
    const update = await models.User.update(
      {
        document_type,
        document_id,
        first_name,
        last_name,
        gender,
        phone,
        birthday,
        user_type: user_type_req === 3 ? user_type : userFound.user_type,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (update) {
      res.json({
        message: "user updated successfully",
      });
    } else {
      res.status(403).json({
        message: "There was an error updating the user",
      });
    }
  } else {
    res.status(500).json({
      message: "That user does not exist",
    });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.User.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      message: "User deleted successfully",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error " + error,
    });
  }
}

export async function updateUserStatus(req, res) {
  const { id } = req.params;

  let status = true;

  const userFound = await models.User.findOne({
    attributes: ["user_status"],
    where: {
      id: id,
    },
  });

  if (userFound) {
    if (userFound.user_status == true) {
      status = false;
    } else {
      status = true;
    }

    const updated = await models.User.update(
      {
        user_status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (updated) {
      return res.json({
        message: "user updated successfully",
      });
    } else {
      res.status(500).json({
        message: "There was an error updating the user",
      });
    }
  } else {
    res.status(500).json({
      message: "That user does not exist",
    });
  }
}

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { old_password, new_password } = req.body;

  const userFound = await models.User.findOne({
    attributes: ["password"],
    where: {
      id: id,
    },
  });

  if (userFound) {
    const matchPassword = await models.User.comparePassword(
      old_password,
      userFound.password
    );

    if (matchPassword) {
      const updated = await models.User.update(
        {
          password: await models.User.encryptPassword(new_password),
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (updated) {
        return res.json({
          message: "User password updated successfully",
        });
      } else {
        res.status(500).json({
          message: "There was an error updating the user password",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid password provided",
      });
    }
  } else {
    res.status(401).json({
      message: "User does not exist",
    });
  }
};

export const resetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  const userFound = await models.User.findOne({
    where: {
      email: email,
    },
  });
  if (userFound) {
    const id = userFound.id;
    const token = jwt.sign({ id: id }, config.SECRET, {
      expiresIn: 86400, // 2 Hours
    });
    const link = `${process.env.front_URL}/reset-password/${token}`;
    await sendEmail(
      userFound.email,
      "Password Reset - Chicks Restaurant",
      link,
      res
    );
  } else {
    res.status(403).json({
      message: "That user does not exist",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { new_password } = req.body;

  const decoded = jwt.verify(token, config.SECRET);
  const userFound = await models.User.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (userFound) {
    const updated = models.User.update(
      {
        password: await models.User.encryptPassword(new_password),
      },
      {
        where: {
          id: decoded.id,
        },
      }
    );

    if (updated) {
      res.json({
        message: "Updated password successfully",
      });
    } else {
      res.status(403).json({
        message: "There was a problem updating your password",
      });
    }
  } else {
    res.status(403).json({
      message: "User not found",
    });
  }
};
