const models = require("../models/index");
import jwt from "jsonwebtoken";
import config from "../config";

export async function getCards(req, res) {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (user.user_type === 1) {
      const cards = await models.Card.findAll({
        where: {
          owner_id: user.document_id,
        },
      });

      return res.json({
        data: cards,
      });
    }
    return res.status(403).json({
      message: "Only the owner of a card can do this",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function getOneCard(req, res) {
  try {
    const { card_number } = req.params;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (user.user_type === 1) {
      const card = await models.Card.findAll({
        where: {
          card_number: card_number,
        },
      });

      if (card.owner_id != user.document_id) {
        return res.status(403).json({
          message: "Wrong card owner",
        });
      }

      return res.json({
        data: cardd,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
    });
  }
}

export async function create(req, res) {
  try {
    const { card_number, owner_id, exp_date, bank } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (owner_id != user.document_id) {
      return res.status(403).json({
        message: "Invalid owner",
      });
    }
    let newCard = await model.Card.create({
      card_number,
      owner_id,
      exp_date,
      bank,
    });
    if (newCard) {
      res.json({
        message: "SUCCESS",
        data: newCard,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong " + error,
      data: {},
    });
  }
}

export async function updateCard(req, res) {
  try {
    const { card_number } = req.params;
    const { owner_id, exp_date, bank } = req.body;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const cardFound = await model.Card.findOne({
      where: {
        card_number: card_number,
      },
    });

    if (!cardFound) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    if (cardFound.owner_id != user.document_id) {
      return res.status(403).json({
        message: "You're not allowed to do that",
      });
    }

    const update = await models.Card.update(
      {
        exp_date,
        bank,
      },
      {
        where: {
          card_number: card_number,
        },
      }
    );

    if (update) {
      return res.json({
        message: "Card updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong updating card " + error.message,
    });
  }
}

export async function deleteCard(req, res) {
  try {
    const { card_number } = req.params;
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, config.SECRET);
    const user = await models.User.findOne({
      where: {
        id: decoded.id,
      },
    });
    const cardFound = await models.Card.findOne({
      where: {
        card_number: card_number,
      }
    })

    if(!cardFound) {
      return res.status(404).json({
        message: "Card not found",
      })
    }

    if(cardFound.owner_id != user.document_id){
      return res.status(403).json({
        message: "You're not allowed to do that"
      })
    }

    const deleteRowCount = model.Card.destroy({
      where: {
        card_number: card_number,
      },
    });

    if (deleteRowCount > 0) {
      return res.json({
        message: "Card deleted successfully",
        count: deleteRowCount,
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Error deleting Card" + error,
    });
  }
}