const prisma = require("../../config/prisma");

exports.index = async (req, res) => {

  try {

    const products = await prisma.product.findMany({

      include: {
        category: true,
        brand: true,
      },

      orderBy: {
        id: "desc",
      },
    });

    return res.json(products);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.scan = async (req, res) => {

  try {

    const product = await prisma.product.findUnique({

      where: {
        qr_code: req.body.qr_code,
      },

      include: {
        category: true,
        brand: true,
      },
    });

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(product);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {

  try {

    const {
      qr_code,
      type,
      quantity,
      note,
    } = req.body;

    const qty = Number(quantity);

    const product = await prisma.product.findUnique({
      where: {
        qr_code,
      },
    });

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });
    }

    const previousStock =
      Number(product.quantity);

    let newStock = previousStock;

    if (type === "IN") {

      newStock = previousStock + qty;

    } else {

      if (previousStock < qty) {

        return res.status(400).json({
          message: "Insufficient stock",
        });
      }

      newStock = previousStock - qty;
    }

    await prisma.$transaction([

      prisma.product.update({

        where: {
          id: product.id,
        },

        data: {
          quantity: newStock,
        },
      }),

      prisma.stockTransaction.create({

        data: {

          product_id: product.id,

          type:
            type === "IN"
              ? "purchase"
              : "sale",

          quantity: qty,

          previous_stock: previousStock,

          new_stock: newStock,

          source: "scanner",

          note,
        },
      }),
    ]);

    return res.json({
      message: "Stock updated successfully",
      quantity: newStock,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.history = async (req, res) => {

  try {

    const transactions =
      await prisma.stockTransaction.findMany({

        where: {
          product_id: Number(req.params.id),
        },

        orderBy: {
          created_at: "desc",
        },
      });

    return res.json(transactions);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};