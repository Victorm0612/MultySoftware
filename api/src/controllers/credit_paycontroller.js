const models = require("../models/index");

export async function getCreditPays(req, res) {
  try {
    const creditPays = await models.Credit_Pay.findAll({
      include: {
        model: models.Payment,
        as: "CreditPayment",
        attributes: { exclude: ["createdAt", "updatedAt"] },
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
  const { id } = req.params;
  try {
    const creditPay = await models.Credit_Pay.findOne({
      where: {
        id: id,
      },
    });
    if (creditPay) {
      res.json({
        data: creditPay,
      });
    } else {
      res.status(404).json({
        message: "Couldnt find that credit payment",
      });
    }
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
    const paymentExist = await models.Payment.findOne({
      where: {
        id: payment_id,
      },
    });

    if (paymentExist) {
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

        if (onePay && !creditExist) {
          if (amount != paymentExist.amount) {
            return res.status(500).json({
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

            res.json({
              message: "SUCCESS",
              data: newCreditPay,
            });
          }
          return res.status(500).json({
            message:
              "You have already made one pay with Credit to that Payment",
          });
        } else {
          if (debitExist && cashExist) {
            return res.status(500).json({
              message: "That pay has already been paid",
            });
          } else if (creditExist) {
            if (creditExist.amount < paymentExist.amount) {
              return res.status(500).json({
                message:
                  "You have already paid one part of the payment with Credit",
              });
            } else {
              return res.status(500).json({
                message: "You have already paid the payment with Credit",
              });
            }
          } else if (debitExist || cashExist) {
            const amountLeft = debitExist
              ? paymentExist.amount - debitExist.amount
              : paymentExist.amount - cashExist.amount;

            if (amount != amountLeft) {
              res.status(500).json({
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

            let newCreditPay = await models.Credit_Pay.create({
              approval_number: approval_number,
              fees_number: fees_number,
              card_number: card_number,
              amount: amount,
              payment_id: payment_id,
            });
            if (newCreditPay) {
              res.json({
                message: "SUCCESS",
                data: newCreditPay,
              });
            }
          }
        }
      }
      res.status(500).json({
        message: "That Payment is already payed",
      });
    }
    res.status(500).json({
      message: "That Payment doesn't exist",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCredit_Pay(req, res) {
  const { id } = req.params;
  const { approval_number, fees_number, card_number, amount, payment_id } =
    req.body;
  const creditPay = await models.Credit_Pay.findOne({
    attributes: ["approval_number", "fees_number", "card_number", "payment_id"],
    where: {
      id: id,
    },
  });

  const paymentExist = await models.Payment.findOne({
    where: {
      id: payment_id,
    },
  });

  if (creditPay.payment_id !== payment_id) {
    return res.status(500).json({
      message: "You can't change the payment that you're going to pay",
    });
  }

  if (!creditPay && !paymentExist && paymentExist.payed_status) {
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
      message: "The amount to pay is too low for that payment"
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
}

export async function deleteCredit_Pay(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.Credit_Pay.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      res.json({
        message: "Credit_Pay deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Couldnt delete that credit pay",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting credit pay",
    });
  }
}
