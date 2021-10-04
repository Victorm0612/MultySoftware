const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getCashPays(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (user.user_type === 1) {
      const cashPays = await models.Cash_Pay.findAll({
        where: {
          payer_id: user.document_id,
        },
      });

      return res.json({
        data: cashPays,
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      const cashPays = await models.Cash_Pay.findAll({
        include: {
          model: models.Payment,
          include: {
            model: models.Bill,
            include: {
              model: models.Sale,
              where: {
                restaurant_id: user.user_restaurant,
              },
            },
          },
        },
      });

      return res.json({
        data: cashPays,
      });
    }

    const cashPays = await models.Cash_Pay.findAll({
      include: [
        {
          model: models.User,
        },
      ],
    });
    res.json({
      data: cashPays,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneCash_Pay(req, res) {
  try {
    const { id } = req.params;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const cashPay = await models.Cash_Pay.findOne({
      where: {
        id: id,
      },
      include: {
        model: models.Payment,
        include: {
          model: models.Bill,
          include: {
            model: models.Sale,
          },
        },
      },
    });
    if (!cashPay) {
      return res.status(404).json({
        message: "Cash Pay was not found",
      });
    }

    if (cashPay.payer_id != user.document_id) {
      return res.status(403).json({
        message: "That is not your Cash Pay",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (cashPay.Payment.Bill.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "That Cash Pay is not from your restaurant",
        });
      }
      res.json({
        data: cashPay,
      });
    }

    res.json({
      data: cashPay,
    });
  } catch (error) {
    res.json(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  try {
    const { payment_id, amount, onePay, payer_id } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const paymentExist = await models.Payment.findOne({
      where: {
        id: payment_id,
      },
      include: {
        model: models.Bill,
        include: {
          model: models.Sale,
        },
      },
    });

    if (!paymentExist) {
      return res.status(500).json({
        message: "That payment doesn't exist",
      });
    }

    if (user.user_type != 1 && user.restaurant_id != 1) {
      if (paymentExist.Bill.Sale.restaurant_id != user.restaurant_id) {
        return res.status(403).json({
          message:
            "You're not allowed to create cash payments for a different restaurant",
        });
      }
    }

    if (paymentExist.payed_status === false) {
      const debitExist = await models.Debit_Pay.findOne({
        where: {
          payment_id: payment_id,
        },
      });

      const cashExist = await models.Cash_Pay.findOne({
        where: {
          payment_id: payment_id,
        },
      });

      const creditExist = await models.Credit_Pay.findOne({
        where: {
          payment_id: payment_id,
        },
      });

      if (onePay && !cashExist) {
        if (amount != paymentExist.amount) {
          return res.status(424).json({
            message:
              "The amount to pay can't be different that the total amount of the payment",
          });
        }
        let newCashPay = await models.Cash_Pay.create({
          payment_id: payment_id,
          amount: amount,
          payer_id: payer_id,
        });
        if (newCashPay) {
          await models.Payment.update(
            {
              payed_status: true,
            },
            {
              where: {
                id: payment_id,
              },
            }
          );

          res.json({
            message: "SUCCESS",
            data: newCashPay,
          });
        }
        return res.status(424).json({
          message: "You have already made one pay with Cash to that Payment",
        });
      } else {
        if (debitExist && creditExist) {
          return res.satus(424).json({
            message: "That pay has already been paid",
          });
        } else if (cashExist) {
          if (cashExist.amount < paymentExist.amount) {
            return res.status(424).json({
              message:
                "You have already paid one part of the payment with Cash",
            });
          } else {
            return res.status(424).json({
              message: "You have already paid the payment with Cash",
            });
          }
        } else if (debitExist || creditExist) {
          const amountLeft = debitExist
            ? paymentExist.amount - debitExist.amount
            : paymentExist.amount - creditExist.amount;

          if (amount != amountLeft) {
            res.status(424).json({
              message:
                "The amount to pay can't be different than the amount left to pay",
            });
          } else {
            let newCashPay = await models.Cash_Pay.create({
              payment_id: payment_id,
              amount: amount,
              payer_id: payer_id,
            });
            if (newCashPay) {
              await models.Payment.update(
                {
                  payed_status: true,
                },
                {
                  where: {
                    id: payment_id,
                  },
                }
              );

              res.json({
                message: "SUCCESS",
                data: newCashPay,
              });
            }
          }
        } else if (!(debitExist && creditExist)) {
          if (amount > paymentExist.amount * 0.8) {
            return res.status(424).json({
              message:
                "The amount to pay can't be superior to the 80% of the total amount of the payment",
            });
          }
          if (
            (paymentExist.amount < 50000 &&
              amount < paymentExist.amount * 0.5) ||
            (paymentExist.amount >= 50000 && amount < paymentExist.amount * 0.2)
          ) {
            return res.status(424).json({
              message: "The amount to pay is too low for that payment",
            });
          }

          let newCashPay = await models.Cash_Pay.create({
            payment_id: payment_id,
            amount: amount,
            payer_id: payer_id,
          });
          if (newCashPay) {
            return res.json({
              message: "SUCCESS",
              data: newCashPay,
            });
          }
        }
        res.status(424).json({
          message: "That Payment is already payed",
        });
      }
    }
    res.status(424).json({
      message: "That Payment has already been payed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCash_Pay(req, res) {
  try {
    const { id } = req.params;
    const { payment_id, amount, payer_id } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const cashPay = await models.Cash_Pay.findOne({
      where: {
        id: id,
      },
    });

    const paymentExist = await models.Payment.findOne({
      where: {
        id: payment_id,
      },
      include: {
        model: models.Bill,
        include: {
          model: models.Sale,
        },
      },
    });

    if (!paymentExist) {
      res.status(404).json({
        message: "That payment does not exist",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (paymentExist.Bill.Sale.restaurant_id != user.user_restaurant) {
        res.status(403).json({
          message:
            "You can't modify Cash Pays that are not from your restaurant",
        });
      }
    }

    if (cashPay.payment_id != payment_id) {
      return res.sttaus(500).json({
        message: "You can't change the payment that you're going to pay",
      });
    }

    if (!cashPay && paymentExist.payed_status) {
      return res.status(500).json({
        message: "Can't modify pays when the payment is already paid",
      });
    }

    if (amount > paymentExist.amount * 0.8) {
      return res.status(500).json({
        message:
          "The amount to pay can't be superior to the 80% of the total amount of the payment",
      });
    }

    if (
      (paymentExist.amount < 50000 && amount < paymentExist.amount * 0.5) ||
      (paymentExist.amount >= 50000 && amount < paymentExist.amount * 0.2)
    ) {
      return res.status(500).json({
        message: "The amount to pay is too low for that payment",
      });
    }

    let update = await models.Cash_Pay.update(
      {
        payment_id,
        amount,
        payer_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!update) return;
    return res.json({
      message: "Cash pay updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating cash pay",
    });
  }
}

export async function deleteCash_Pay(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const cashPayExist = await models.Cash_Pay.findOne({
      where: {
        id: id,
      },
      include: {
        model: models.Payment,
        include: {
          model: models.Bill,
          include: {
            model: models.Sale,
          },
        },
      },
    });

    if (!cashPayExist) {
      return res.status(404).json({
        message: "Cash Pay not found",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (
        cashPayExist.Payment.Bill.Sale.restaurant_id != user.user_restaurant
      ) {
        return res.status(403).json({
          message:
            "You can't delete Cash Pay that are not from your restaurant",
        });
      }
    }

    const deleteRowCount = await models.Cash_Pay.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      return res.json({
        message: "Cash_Pay deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting cash pay",
    });
  }
}
