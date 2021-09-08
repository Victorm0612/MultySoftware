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
  const { approval_number, fees_number, card_number, payment_id } = req.body;
  try {
    let newCreditPay = await models.Credit_Pay.create({
      approval_number: approval_number,
      fees_number: fees_number,
      card_number: card_number,
      payment_id: payment_id,
    });
    if (newCreditPay) {
      res.json({
        message: "SUCCESS",
        data: newCreditPay,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCredit_Pay(req, res) {
  const { id } = req.params;
  const { approval_number, fees_number, card_number, payment_id } = req.body;
  const creditPay = await model.Credit_Pay.findOne({
    attributes: ["approval_number", "fees_number", "card_number", "payment_id"],
    where: {
      id: id,
    },
  });
  if (creditPay) {
    await model.Credit_Pay.update({
      approval_number: approval_number,
      fees_number: fees_number,
      card_number: card_number,
      payment_id: payment_id,
      where: {
        where: {
          id: id,
        },
      },
    });
  }
  return res.json({
    message: "Credit pay updated successfully",
  });
}

export async function deleteCredit_Pay(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = model.Credit_Pay.destroy({
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
