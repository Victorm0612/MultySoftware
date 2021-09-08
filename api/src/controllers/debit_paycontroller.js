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
  const { debit_type, card_number, payment_id } = req.body;
  try {
    let newDebitPay = await models.Debit_Pay.create({
      debit_type: debit_type,
      card_number: card_number,
      payment_id: payment_id,
    });
    if (newDebitPay) {
      res.json({
        message: "SUCCESS",
        data: newDebitPay,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateDebit_Pay(req, res) {
  const { id } = req.params;
  const { debit_type, card_number, payment_id } = req.body;
  const debitPay = await model.Debit_Pay.findOne({
    attributes: ["debit_type", "card_number", "payment_id"],
    where: {
      id: id,
    },
  });
  if (debitPay) {
    await model.Debit_Pay.update({
      debit_type: debit_type,
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
    message: "Debit Pay updated successfully",
  });
}

export async function deleteDebit_Pay(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = model.Debit_Pay.destroy({
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
