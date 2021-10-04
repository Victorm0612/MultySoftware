const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getCreditPays(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (user.user_type === 1) {
      const creditPays = await models.Credit_Pay.findAll({
        include: {
          model: models.Card,
          where: {
            owner_id: user.document_id,
          },
        },
      });

      return res.json({
        data: creditPays,
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      const creditPays = await models.Credit_Pay.findAll({
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
        data: creditPays,
      });
    }

    const creditPays = await models.Credit_Pay.findAll({
      include: {
        model: models.Payment,
      },
    });
    res.json({
      data: creditPays,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneCredit_Pay(req, res) {
  try {
    const { id } = req.params;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const creditPay = await models.Credit_Pay.findOne({
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
        model: models.Card,
        attributes: { card_number },
      },
    });

    if (!creditPay) {
      return res.status(404).json({
        message: "That credit pay does not exist",
      });
    }

    if (user.user_type === 1) {
      if (creditPay.Card.owner_id != user.document_id) {
        return res.status(403).json({
          message: "This is not your Credit Pay",
        });
      }
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (creditPay.Payment.Bill.Sale.restaurant_id != user.restaurant_id) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    res.json({
      data: creditPay,
    });
  } catch (error) {
    res.json(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  const {
    approval_number,
    fees_number,
    card_number,
    amount,
    onePay,
    payment_id,
  } = req.body;
  try {
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
      return res.status(404).json({
        message: "That payment does not exist",
      });
    }

    if (user.user_type != 1 && user.restaurant_id != 1) {
      if (paymentExist.Bill.Sale.restaurant_id != user.restaurant_id) {
        return res.status(403).json({
          message:
            "You're not allowed to create credit payments for a different restaurant",
        });
      }
    }

    if (paymentExist.payed_status === false) {
      const cardExist = await models.Card.findOne({
        where: {
          card_number: card_number,
        },
      });

      if (cardExist.card_type === "Debito") {
        return res.status(424).json({
          message: "You can't make a credit pay with a debit card",
        });
      }

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

      if (onePay && !creditExist) {
        if (amount != paymentExist.amount) {
          return res.status(424).json({
            message:
              "The amount to pay can't be different that the total amount of the payment",
          });
        }
        let newCreditPay = await models.Credit_Pay.create({
          approval_number: approval_number,
          fees_number: fees_number,
          card_number: card_number,
          amount: amount,
          payment_id: payment_id,
        });
        if (newCreditPay) {
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

          return res.json({
            message: "SUCCESS",
            data: newCreditPay,
          });
        }
        return res.status(424).json({
          message: "You have already made one pay with Credit to that Payment",
        });
      } else {
        if (debitExist && cashExist) {
          return res.status(424).json({
            message: "That pay has already been paid",
          });
        } else if (creditExist) {
          if (creditExist.amount < paymentExist.amount) {
            return res.status(424).json({
              message:
                "You have already paid one part of the payment with Credit",
            });
          } else {
            return res.status(424).json({
              message: "You have already paid the payment with Credit",
            });
          }
        } else if (debitExist || cashExist) {
          const amountLeft = debitExist
            ? paymentExist.amount - debitExist.amount
            : paymentExist.amount - cashExist.amount;

          if (amount != amountLeft) {
            return res.status(424).json({
              message:
                "The amount to pay can't be different than the amount left to pay",
            });
          } else {
            let newCreditPay = await models.Credit_Pay.create({
              approval_number: approval_number,
              fees_number: fees_number,
              card_number: card_number,
              amount: amount,
              payment_id: payment_id,
            });
            if (newCreditPay) {
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
                data: newCreditPay,
              });
            }
          }
        } else if (!(debitExist && cashExist)) {
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

          let newCreditPay = await models.Credit_Pay.create({
            approval_number: approval_number,
            fees_number: fees_number,
            card_number: card_number,
            amount: amount,
            payment_id: payment_id,
          });
          if (newCreditPay) {
            return res.json({
              message: "SUCCESS",
              data: newCreditPay,
            });
          }
        }
        return res.status(424).json({
          message: "That Payment is already payed",
        });
      }
    }
    res.status(424).json({
      message: "That Payment is already payed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCredit_Pay(req, res) {
  try {
    const { id } = req.params;
    const { approval_number, fees_number, card_number, amount, payment_id } =
      req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const creditPay = await models.Credit_Pay.findOne({
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
      return res.status(404).json({
        message: "That Payment does not exist",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (paymentExist.Bill.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message:
            "You can't modify Credit Pays that are not from your restaurant",
        });
      }
    }

    if (creditPay.payment_id !== payment_id) {
      return res.status(500).json({
        message: "You can't change the payment that you're going to pay",
      });
    }

    if (!creditPay && paymentExist.payed_status) {
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
    let update = await models.Credit_Pay.update(
      {
        approval_number,
        fees_number,
        card_number,
        amount,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!update) return;
    return res.json({
      message: "Credit pay updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating credit pay",
    });
  }
}

export async function deleteCredit_Pay(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const creditPayExist = await models.Credit_Pay.findOne({
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

    if (!creditPayExist) {
      return res.status(404).json({
        message: "Credit pay not found",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (
        creditPayExist.Payment.bill.Sale.restaurant_id != user.user_restaurant
      ) {
        return res.status(403).json({
          message:
            "You can't delete Credit Pay that are not from your restaurant",
        });
      }
    }

    const deleteRowCount = await models.Credit_Pay.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      return res.json({
        message: "Credit_Pay deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting credit pay",
    });
  }
}
