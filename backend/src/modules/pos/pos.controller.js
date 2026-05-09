const prisma = require("../../config/prisma");

exports.products = async (req, res) => {

  try {

    const products = await prisma.product.findMany({

      where: {
        status: "active",
      },

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

exports.checkout = async (req, res) => {

  try {

    const { cart } = req.body;

    if (!cart || cart.length === 0) {

      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let subtotal = 0;

    for (const item of cart) {

      subtotal +=
        Number(item.price) *
        Number(item.quantity);
    }

    const invoice_no =
      `INV-${Date.now()}`;

    const sale = await prisma.sale.create({

      data: {

        invoice_no,

        subtotal,

        tax_amount: 0,

        discount: 0,

        total_amount: subtotal,

        payment_method: "cash",
      },
    });

    for (const item of cart) {

      const product =
        await prisma.product.findUnique({

          where: {
            id: item.id,
          },
        });

      if (!product) continue;

      const previousStock =
        Number(product.quantity);

      if (previousStock < item.quantity) {

        return res.status(400).json({
          message:
            `${product.name} stock is insufficient`,
        });
      }

      const newStock =
        previousStock -
        Number(item.quantity);

      await prisma.saleItem.create({

        data: {

          sale_id: sale.id,

          product_id: product.id,

          quantity:
            Number(item.quantity),

          unit_price:
            Number(item.price),

          total_price:
            Number(item.price) *
            Number(item.quantity),
        },
      });

      await prisma.product.update({

        where: {
          id: product.id,
        },

        data: {
          quantity: newStock,
        },
      });

      await prisma.stockTransaction.create({

        data: {

          product_id: product.id,

          type: "sale",

          quantity:
            Number(item.quantity),

          previous_stock:
            previousStock,

          new_stock: newStock,

          source: "pos",

          note:
            `POS Sale ${invoice_no}`,
        },
      });
    }

    const finalSale =
      await prisma.sale.findUnique({

        where: {
          id: sale.id,
        },

        include: {

          items: {

            include: {
              product: true,
            },
          },
        },
      });

    return res.json(finalSale);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};