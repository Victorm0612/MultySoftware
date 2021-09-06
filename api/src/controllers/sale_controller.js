const models = require("../models/index");

export async function getSales(req, res) {
  try {
    const sales = await models.Sale.findAll({
      include: [{
        model: models.User,
        as: "SaleUser",
        attributes: ["document_type",
          "document_id",
          "first_name",
          "last_name",]
      },
      {
        model: models.Restaurant,
        as: "RestaurantSales",
        attributes: ["id",
          "restaurant_name",
          "restaurant_address"],
      },
      {
        model: models.SaleItem,
        as: "SaleItems",
        attributes: ["product_id",
          "amount",
          "totalIva",
          "subtotal",
          "item_total",
          "total_discount"]
      },
    ]})
    res.json({
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneSale(req, res) {
  const { id } = req.params;
  try {
    const sale = await models.Sale.findOne({
      where: {
        id: id,
      },
    });
    res.json({
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function create(req, res) {
  const { id, sale_date, sale_time, docId, domicile_id, sale_status } =
    req.body;
  try {
    let newSale = await models.Sale.create({
      id,
      sale_date,
      sale_time,
      docId,
      domicile_id,
      sale_status,
    });
    if (newSale) {
      res.json({
        message: "SUCCESS!!",
        data: newSale,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateSale(req, res) {
  const { id } = req.params;
  const { sale_date, sale_time, docId, domicile_id, sale_status } = req.body;

  const saleFound = await models.Sale.findAll({
    attribute: [
      "sale_date",
      "sale_time",
      "docId",
      "domicile_id",
      "sale_status",
    ],
    where: {
      id: id,
    },
  });
  if (saleFound.length > 0) {
    saleFound.forEach(async (saleFound) => {
      await models.Sale.update(
        {
          sale_date,
          sale_time,
          docId,
          domicile_id,
          sale_status,
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
    message: "sale updated succesfully",
  });
}

export async function deleteSale(req, res) {
  const { id } = req.params;
  try {
    const deleteRowCount = models.Sale.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      mesage: "sale deleted succesfuly",
      count: deleteRowCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}
