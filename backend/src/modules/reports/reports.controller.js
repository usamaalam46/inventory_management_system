const prisma =
  require("../../config/prisma");

exports.stats = async (req, res) => {

  try {

    const totalProducts =
      await prisma.product.count();

    const totalSales =
      await prisma.sale.count();

    const sales =
      await prisma.sale.findMany();

    const revenue =
      sales.reduce(

        (sum, sale) =>

          sum +
          Number(sale.total_amount),

        0
      );

    const products =
      await prisma.product.findMany();

    const lowStock =
      products.filter(

        (item) =>

          Number(item.quantity) <=
          Number(item.alert_quantity)
      ).length;

    return res.json({

      totalProducts,

      totalSales,

      revenue,

      lowStock,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.sales = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const search =
      req.query.search || "";

    const skip =
      (page - 1) * limit;

    const where = {

      invoice_no: {

        contains: search,

        mode: "insensitive",
      },
    };

    const sales =
      await prisma.sale.findMany({

        where,

        skip,

        take: limit,

        orderBy: {
          created_at: "desc",
        },
      });

    const total =
      await prisma.sale.count({
        where,
      });

    return res.json({

      data: sales,

      meta: {

        page,

        limit,

        total,

        totalPages:
          Math.ceil(total / limit),
      },
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.lowStock = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 5;

    const search =
      req.query.search || "";

    const skip =
      (page - 1) * limit;

    const products =
      await prisma.product.findMany({

        where: {

          name: {

            contains: search,

            mode: "insensitive",
          },
        },

        include: {
          category: true,
        },

        orderBy: {
          quantity: "asc",
        },
      });

    const filtered =
      products.filter(

        (item) =>

          Number(item.quantity) <=
          Number(item.alert_quantity)
      );

    const paginated =
      filtered.slice(
        skip,
        skip + limit
      );

    return res.json({

      data: paginated,

      meta: {

        page,

        limit,

        total:
          filtered.length,

        totalPages:
          Math.ceil(
            filtered.length / limit
          ),
      },
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.transactions =
  async (req, res) => {

    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const search =
        req.query.search || "";

      const skip =
        (page - 1) * limit;

      const transactions =
        await prisma.stockTransaction.findMany({

          where: {

            product: {

              name: {

                contains: search,

                mode: "insensitive",
              },
            },
          },

          include: {
            product: true,
          },

          skip,

          take: limit,

          orderBy: {
            created_at: "desc",
          },
        });

      const total =
        await prisma.stockTransaction.count({

          where: {

            product: {

              name: {

                contains: search,

                mode: "insensitive",
              },
            },
          },
        });

      return res.json({

        data: transactions,

        meta: {

          page,

          limit,

          total,

          totalPages:
            Math.ceil(total / limit),
        },
      });

    } catch (error) {

      return res.status(500).json({
        message: error.message,
      });
    }
  };