const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getDebitPays(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (user.user_type === 1) {
      const debitPays = await models.Debit_Pay.findAll({
        include: {
          model: models.Card,
          where: {
            owner_id: user.document_id,
          },
        },
      });

      return res.json({
        data: debitPays,
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      const debitPays = await models.Debit_Pay.findAll({
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
        data: debitPays,
      });
    }

    const debitPays = await models.Debit_Pay.findAll({
      include: {
        model: models.Payment,
      },
    });
    res.json({
      data: debitPays,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneDebit_Pay(req, res) {
  try {
    const { id } = req.params;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const debitPay = await models.Debit_Pay.findOne({
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

    if (!debitPay) {
      return res.status(404).json({
        message: "That debit pay does not exist",
      });
    }

    if (user.user_type === 1) {
      if (debitPay.Card.owner_id != user.document_id) {
        return res.status(403).json({
          message: "This is not your debit Pay",
        });
      }
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (debitPay.Payment.Bill.Sale.restaurant_id != user.restaurant_id) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }
    res.json({
      data: debitPay,
    });
  } catch (error) {
    res.json(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  const { debit_type, card_number, amount, onePay, payment_id } = req.body;
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
        }
      }
    });

    if(!paymentExist){
      return res.status(404).json({
        message: "That payment does not exist",
      })
    }
    
    if(user.user_type != 1 && user.restaurant_id != 1) {
      if(paymentExist.Bill.Sale.restaurant_id != user.restaurant_id){
        return res.status(403).json({
          message: "You're not allowed to create debit payments for a different restaurant"
        })
      }
    }
    
    if (paymentExist.payed_status === false) {
      const cardExist = await models.Card.findOne({
        where: {
          card_number: card_number,
        },
      });

      if (cardExist.card_type === "Credito") {
        return res.status(500).json({
          message: "You can't make a debit pay with a credit card",
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

      if (onePay && !debitExist) {
        if (amount != paymentExist.amount) {
          return res.status(424).json({
            message:
              "The amount to pay can't be different than the total amount of the payment",
          });
        }
        let newDebitPay = await models.Debit_Pay.create({
          debit_type: debit_type,
          card_number: card_number,
          amount: amount,
          payment_id: payment_id,
        });
        if (newDebitPay) {
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
            data: newDebitPay,
          });
        }
        return res.status(424).json({
          message: "You have already made one pay with Debit to that Payment",
        });
      } else {
        if (cashExist && creditExist) {
          return res.status(424).json({
            message: "That pay has already been paid",
          });
        } else if (debitExist) {
          if (debitExist.amount < paymentExist.amount) {
            return res.status(424).json({
              message:
                "You have already paid one part of the payment with Debit",
            });
          } else {
            return res.status(424).json({
              message: "You have already paid the payment with Debit",
            });
          }
        } else if (cashExist || creditExist) {
          const amountLeft = cashExist
            ? paymentExist.amount - cashExist.amount
            : paymentExist.amount - creditExist.amount;

          if (amount != amountLeft) {
            return res.status(424).json({
              message:
                "The amount to pay can't be different than the amount left to pay",
            });
          } else {
            let newDebitPay = await models.Debit_Pay.create({
              debit_type: debit_type,
              card_number: card_number,
              amount: amount,
              payment_id: payment_id,
            });
            if (newDebitPay) {
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
                data: newDebitPay,
              });
            }
          }
        } else if (!(cashExist && creditExist)) {
          if (amount > paymentExist.amount * 0.8) {
            return res.status(500).json({
              message:
                "The amount to pay can't be superior to the 80% of the total amount of the payment",
            });
          }
          if (
            (paymentExist.amount < 50000 &&
              amount < paymentExist.amount * 0.5) ||
            (paymentExist.amount >= 50000 &&
              amount < paymentExist.amount * 0.2)
          ) {
            return res.status(500).json({
              message: "The amount to pay is too low for that payment",
            });
          }

          let newDebitPay = await models.Debit_Pay.create({
            debit_type: debit_type,
            card_number: card_number,
            amount: amount,
            payment_id: payment_id,
          });
          if (newDebitPay) {
            return res.json({
              message: "SUCCESS",
              data: newDebitPay,
            });
          }
        }
        return res.status(424).json({
          message: "That Payment is already payed"
        })
      }
    }
    res.status(424).json({
      message: "That payment is already payed",
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateDebit_Pay(req, res) {
  try {
    const { id } = req.params;
    const { debit_type, card_number, amount, payment_id } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const debitPay = await models.Debit_Pay.findOne({
      attributes: ["debit_type", "card_number", "payment_id"],
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
        }
      }
    });

    if(!paymentExist){
      return res.status(404).json({
        message: "That Payment does not exist"
      })
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (paymentExist.Bill.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message:
            "You can't modify Credit Pays that are not from your restaurant",
        });
      }
    }

    if (debitPay.payment_id !== payment_id) {
      return res.status(404).json({
        message: "You cant change the payment that you're going to pay",
      });
    }

    if (!debitPay && paymentExist.payed_status) {
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
    let update = await models.Debit_Pay.update(
      {
        debit_type,
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
      message: "Debit pay updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updateing debit pay" + error.message,
    })
  }
}

export async function deleteDebit_Pay(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const debitPayExist = await models.Debit_Pay.findOne({
      where: {
        id: id,
      },
      include: {
        model: models.Payment,
        include: {
          model: models.Bill,
          include: {
            model: models.Sale,
          }
        }
      }
    })

    if (!debitPayExist) {
      return res.status(404).json({
        message: "Debit pay not found",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (
        debitPayExist.Payment.bill.Sale.restaurant_id != user.user_restaurant
      ) {
        return res.status(403).json({
          message:
            "You can't delete Credit Pay that are not from your restaurant",
        });
      }
    }

    const deleteRowCount = await models.Debit_Pay.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      return res.json({
        message: "Debit_Pay deleted successfully",
      });
    } 
  } catch (error) {
    res.status(500).json({
      message: "Error deleting debit pay",
    });
  }
}
