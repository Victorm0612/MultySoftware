const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getPayment(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (user.user_type === 1) {
      const payments = await models.Payment.findAll({
        include: {
          model: models.Bill,
          include: {
            model: models.Sale,
            where: {
              docId: user.document_id,
            },
          },
        },
      });

      return res.json({
        data: payments,
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      const payments = await models.Payment.findAll({
        include: {
          model: models.Bill,
          include: {
            model: models.Sale,
            where: {
              restaurant_id: user.user_restaurant,
            },
          },
        },
      });

      return res.json({
        data: payments,
      });
    }

    const paymentsAdm = await models.Payment.findAll({
      include: {
        model: models.Bill,
        include: {
          model: models.Sale,
        },
      },
    });

    res.json({
      data: paymentsAdm,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong " + error,
      data: {},
    });
  }
}

export async function getOnePayment(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const paymentFound = await models.Payment.findOne({
      where: {
        id: id,
      },
      include: {
        model: models.Bill,
        include: {
          model: models.Sale,
        },
      },
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    if (user.user_type === 1) {
      if (paymentFound.Bill.Sell.docId != user.document_id) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (paymentFound.Bill.Sell.restaurant_id != user.restaurant_id) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    return res.json({
      data: billFound,
    });

    res.json({
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function create(req, res) {
  const { pay_description, pay_date, pay_time, amount, pay_status, bill_id } =
    req.body;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const billExist = await models.Bill.findOne({
      where: {
        id: bill_id,
      },
      include: {
        model: models.Sale,
      },
    });

    if (!billExist) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (billExist.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You can't create payments for a different restaurant",
        });
      }
    }

    let newPayment = await models.Payment.create({
      pay_description,
      pay_date,
      pay_time,
      pay_type,
      amount,
      pay_status,
      bill_id,
    });
    if (newPayment) {
      res.json({
        message: "SUCCESS!!",
        data: newPayment,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updatePayment(req, res) {
  try {
    const { id } = req.params;
    const { pay_description, pay_date, pay_time, amount, pay_status, bill_id } =
      req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const paymentFound = await models.Payment.findOne({
      where: {
        id: id,
      },
      include: {
        model: models.Bill,
        include: {
          model: models.Sale,
        },
      },
    });

    if (!paymentFound) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    if (paymentFound.bill_id != bill_id) {
      return res.status(424).json({
        message: "You can't change the bill of the payment",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (paymentFound.Bill.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You are not allowed to do that",
        });
      }
    }

    const update = await models.Payment.update(
      {
        pay_description,
        pay_date,
        pay_time,
        amount,
        pay_status,
        bill_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({
      message: "payment updated succesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong" + error.message,
    });
  }
}

export async function deletePayment(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const paymentFound = await models.Payment.findOne({
      where: {
        id: id,
      },
      include: {
        model: models.Bill,
        include: {
          model: models.Sale,
        },
      },
    });

    if (!paymentFound) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }
    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (paymentFound.Bill.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    const deleteRowCount = await models.Payment.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      return res.json({
        message: "Payment deleted succesfully",
        count: deleteRowCount,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}
