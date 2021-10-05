const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getBills(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (user.user_type === 1) {
      const bills = await models.Bill.findAll({
        include: [
          {
            model: models.Sale,
            where: {
              docId: user.document_id,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: models.Payment,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      return res.json({
        data: bills,
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      const bills = await models.Bill.findAll({
        include: [
          {
            model: models.Sale,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              restaurant_id: user.user_restaurant,
            },
          },
          {
            model: models.Payment,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      return res.json({
        data: bills,
      });
    }

    const billsAdm = await models.Bill.findAll({
      include: [
        {
          model: models.Sale,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Payment,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    return res.json({
      data: billsAdm,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong" + error,
      data: {},
    });
  }
}

export async function getOneBill(req, res) {
  try {
    const { id } = req.params;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const billFound = await models.Bill.findOne({
      include: [
        {
          model: models.Sale,
          as: "SaleBill",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: models.Payment,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      where: {
        id: id,
      },
    });

    if (!billFound) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    if (user.user_type === 1) {
      if (billFound.Sell.docId != user.document_id) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (billFound.Sale.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }
    return res.json({
      data: billFound,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
    });
  }
}

export async function create(req, res) {
  try {
    const {
      sale_id,
      bill_time,
      bill_date,
      subtotal,
      totalIva,
      total_discount,
      total_payment,
      bill_status,
    } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const saleFound = await models.Sale.findOne({
      where: {
        id: sale_id,
      },
    });

    if (!saleFound) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    const billFound = await models.Bill.findOne({
      where: {
        sale_id: saleFound.id,
      },
    });

    if (billFound) {
      return res.status(424).json({
        message: "That sale already have a bill",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (saleFound.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    let newBill = await models.Bill.create({
      nit: 966447851,
      sale_id,
      bill_time,
      bill_date,
      subtotal,
      totalIva,
      total_discount,
      total_payment,
      bill_status,
    });
    if (newBill) {
      return res.json({
        message: "SUCCESS",
        data: newBill,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong" + error,
      data: {},
    });
  }
}

export async function updateBill(req, res) {
  try {
    const { id } = req.params;
    const {
      sale_id,
      bill_time,
      bill_date,
      subtotal,
      totalIva,
      total_discount,
      total_payment,
      bill_status,
    } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const saleFound = await models.Sale.findOne({
      where: {
        id: sale_id,
      },
    });
    if (!saleFound) {
      return res.status(404).json({
        message: "That sale does not exist",
      });
    }
    const saleBill = await models.Bill.findOne({
      where: {
        sale_id: saleFound.id,
      },
    });

    if (saleBill.id != id) {
      return res.status(424).json({
        message: "The sale already have a bill and is not this one",
      });
    }

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (user.user_restaurant != saleFound.restaurant_id) {
        res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    const billFound = await models.Bill.findOne({      
      where: {
        id: id,
      },
    });
    if (billFound) {
      await models.Bill.update(
        {
          sale_id,
          bill_time,
          bill_date,
          subtotal,
          totalIva,
          total_discount,
          total_payment,
          bill_status,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.json({
        message: "Bill updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong " + error,
    });
  }
}

export async function deleteBill(req, res) {
  const { id } = req.params;
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const billFound = await models.Bill.findOne({
      where: {
        id: id,
      },
    });

    if (!billFound) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    const saleFound = await models.Sale.findOne({
      where: {
        id: billFound.sale_id,
      },
    });

    if (user.user_type != 1 && user.user_restaurant != 1) {
      if (saleFound.restaurant_id != user.user_restaurant) {
        return res.status(403).json({
          message: "You're not allowed to do that",
        });
      }
    }

    const deleteRowCount = await models.Bill.destroy({
      where: {
        id: id,
      },
    });
    if (deleteRowCount > 0) {
      return res.json({
        message: "Bill deleted successfully",
        count: deleteRowCount,
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}
