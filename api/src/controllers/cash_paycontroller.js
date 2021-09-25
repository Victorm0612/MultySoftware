const models = require("../models/index");

export async function getCashPays(req, res) {
  try {
    const cashPays = await models.Cash_Pay.findAll({
      include: [
        {
          model: models.User,
          as: "CashPay",
          attributes: ["id", "document_type", "first_name", "last_name"],
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
  const { id } = req.params;
  try {
    const cashPays = await models.Cash_Pay.findOne({
      where: {
        id: id,
      },
    });
    if (cashPays) {
      res.json({
        data: cashPays,
      });
    } else {
      res.status(404).json({
        message: "Couldnt find that cash payment",
      });
    }
  } catch (error) {
    res.json(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  const { payment_id, amount, onePay, payer_id } = req.body;
  try {

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

    const paymentExist = await models.Payment.findOne({
      where: {
        id: payment_id,
      },
    });

    if(onePay && !cashExist) {
      if(amount < paymentExist.amount) {
        return res.status(500).json({
          message: "The amount to pay can't be less that the total amount of the payment",
        })
      }
      let newCashPay = await models.Cash_Pay.create({
        payment_id: payment_id,
        amount: amuount,
        payer_id: payer_id,
      });
      if (newCashPay) {
        res.json({
          message: "SUCCESS",
          data: newCashPay,
        });
      }
      return res.status(500).json({
        message: "You have already made one pay with Cash to that Payment"
      })
    } else {

      if(debitExist && creditExist) {
        return res.satus(500).json({
          message: "That pay has already been paid"
        })
      } else if (cashExist){
        if(cashExist.amount < paymentExist.amount) {
          return res.status(500).json({
            message: "You have already paid one part of the payment with Cash",
          })
        } else {
          return res.status(500).json({
            message: "You have already paid the payment with Cash",
          })
        }
      } else if (debitExist || creditExist) {
        const amountLeft = debitExist
        ? paymentExist.amount - debitExist.amount
        : paymentExist.amount - creditExist.amount

        if(amount < amountLeft) {
          res.status(500).json({
            message: "The amount to pay can't be less that the amount left to pay",
          })
        } else {
          let newCashPay = await models.Cash_Pay.create({
            payment_id: payment_id,
            amount: amount,
            payer_id: payer_id,
          });
          if (newCashPay) {
            res.json({
              message: "SUCCESS",
              data: newCashPay,
            });
          }
        }
      }
    }    
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCash_Pay(req, res) {
  const { id } = req.params;
  const { payment_id, payer_id } = req.body;
  const cashPay = await model.Cash_Pay.findOne({
    attributes: ["payment_id", "payer_id"],
    where: {
      id: id,
    },
  });
  if (cashPay) {
    await model.Cash_Pay.update({
      payment_id: payment_id,
      payer_id: payer_id,
      where: {
        where: {
          id: id,
        },
      },
    });
  }
  return res.json({
    message: "Cash Pay updated successfully",
  });
}

export async function deleteCash_Pay(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = model.Cash_Pay.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      res.json({
        message: "Cash_Pay deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Couldnt delete that cash pay",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting cash pay",
    });
  }
}
