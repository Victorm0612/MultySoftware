const models = require("../models/index");

export async function getDebitPays(req, res) {
  try {
    const debitPays = await models.Debit_Pay.findAll({
      include: [
        {
          model: models.Card,
          as: "DebitCard",
          attributes: ["id", "document_type", "first_name", "last_name"],
        },
        {
          model: models.Payment,
          as: "DebitPayment",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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
  const { id } = req.params;
  try {
    const debitPay = await models.Debit_Pay.findOne({
      where: {
        id: id,
      },
    });
    if (debitPay) {
      res.json({
        data: debitPay,
      });
    } else {
      res.status(404).json({
        message: "Couldnt find that debit payment",
      });
    }
  } catch (error) {
    res.json(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  const { debit_type, card_number, amount, onePay, payment_id } = req.body;
  try {
    const paymentExist = await models.Payment.findOne({
      where: {
        id: payment_id,
      },
    });

    if (paymentExist) {
      if (paymentExist.payed_status === false) {
        const cardExist = await models.Card.findOne({
          where: {
            card_number: card_number,
          }
        })

        if(cardExist.card_type === "Credito"){
          return res.status(500).json({
            message: "You can't make a debit pay with a credit card"
          })
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
            return res.status(500).json({
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

            res.json({
              message: "SUCCESS",
              data: newDebitPay,
            });
          }
          return res.status(500).json({
            message: "You have already made one pay with Debit to that Payment",
          });
        } else {
          if (cashExist && creditExist) {
            return res.status(500).json({
              message: "That pay has already been paid",
            });
          } else if (debitExist) {
            if (debitExist.amount < paymentExist.amount) {
              return res.status(500).json({
                message:
                  "You have already paid one part of the payment with Debit",
              });
            } else {
              return res.status(500).json({
                message: "You have already paid the payment with Debit",
              });
            }
          } else if (cashExist || creditExist) {
            const amountLeft = cashExist
              ? paymentExist.amount - cashExist.amount
              : paymentExist.amount - creditExist.amount;

            if (amount != amountLeft) {
              res.status(500).json({
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
              res.status(500).json({
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
              res.json({
                message: "SUCCESS",
                data: newDebitPay,
              });
            }
          }
        }
      }

      res.status(500).json({
        message: "That payment is already payed",
      });
    }

    res.status(500).json({
      message: "That payment doesn't exist",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateDebit_Pay(req, res) {
  const { id } = req.params;
  const { debit_type, card_number, amount, payment_id } = req.body;
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
  });

  if (debitPay.payment_id !== payment_id) {
    return res.status(404).json({
      message: "You cant change the payment that you're going to pay",
    });
  }

  if (!debitPay && !paymentExist && paymentExist.payed_status) {
    return res.status(500).json({
      message: "Can't modifiy pays when the payment is already paid",
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
      message: "The amount to pay is too low for that payment"
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
}

export async function deleteDebit_Pay(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.Debit_Pay.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      res.json({
        message: "Debit_Pay deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Couldnt delete that debit pay",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting debit pay",
    });
  }
}
