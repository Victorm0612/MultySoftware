const models = require("../models/index");

export async function getBanks(req, res) {
  try {
    const banks = await models.Bank.findAll();
    res.json({
      data: banks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneBank(req, res) {
  const { id } = req.params;
  try {
    const bank = await models.Bank.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: bank,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function create(req, res) {
  const { bank_name } = req.body;
  try {
    let newBank = await models.Bank.create({
      bank_name,
    });
    if (newBank) {
      res.json({
        message: "SUCCESS!!",
        data: newBank,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
      data: {},
    });
  }
}

export async function updateBank(req, res) {
  const { id } = req.params;
  const { bank_name } = req.body;
  const bankFound = await models.Bank.findAll({
    attributes: ["bank_name"],
    where: {
      id: id,
    },
  });
  if (bankFound.length > 0) {
    bankFound.forEach(async (bankFound) => {
      await models.Bank.update(
        {
          bank_name,
        },
        {
          where: {
            id: id,
          },
        }
      );
    });
  }
  return res.json({
    message: "Bank updated successfully",
  });
}

export async function deleteBank(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = await models.Bank.destroy({
      where: {
        id: id,
      },
    });
    
    if(deleteRowCount > 0){
      return res.json({
        message: "Bank deleted successfully",
        count: deleteRowCount,
      });
    }

    res.status(404).json({
      message: "That Bank does not exist"
    })

  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}
