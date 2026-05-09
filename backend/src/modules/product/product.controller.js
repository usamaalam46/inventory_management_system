// modules/product/product.controller.js

const prisma = require("../../config/prisma");

const generateQR =
  require("../../utils/qrGenerator");

const skuGen =
  require("../../utils/skuGenerator");

const slugify =
  require("slugify");

const { v4: uuidv4 } =
  require("uuid");


// ✅ CREATE PRODUCT
exports.create = async (req, res) => {

  try {

    const {
      name,
      price,
      cost_price,
      quantity,
      alert_quantity,
      category_id,
      brand_id,
      supplier_id,
      barcode,
      description,
      image,
      expiry_date,
      unit,
      is_featured,
      track_stock,
      status,
    } = req.body;

    // validation
    if (
      !name ||
      !price ||
      !category_id
    ) {

      return res.status(400).json({
        message:
          "name, price and category required"
      });
    }

    // validate category
    const category =
      await prisma.category.findUnique({
        where: {
          id: Number(category_id)
        }
      });

    if (
      !category ||
      category.status === "inactive"
    ) {

      return res.status(400).json({
        message:
          "Invalid or inactive category"
      });
    }

    // validate brand
    if (brand_id) {

      const brand =
        await prisma.brand.findUnique({
          where: {
            id: Number(brand_id)
          }
        });

      if (!brand) {

        return res.status(400).json({
          message:
            "Brand not found"
        });
      }
    }

    // validate supplier
    if (supplier_id) {

      const supplier =
        await prisma.supplier.findUnique({
          where: {
            id: Number(supplier_id)
          }
        });

      if (!supplier) {

        return res.status(400).json({
          message:
            "Supplier not found"
        });
      }
    }

    // generate slug
    let slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const duplicateSlug =
      await prisma.product.findFirst({
        where: { slug }
      });

    if (duplicateSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // generate sku
    const sku = skuGen();

    // generate qr
    const qr_code =
      uuidv4();

    const qr_image =
      await generateQR(qr_code);

    // create product
    const product =
      await prisma.product.create({

        data: {

          name,
          slug,

          sku,

          qr_code,

          barcode:
            barcode || null,

          description:
            description || null,

          image:
            image || null,

          unit:
            unit || null,

          price:
            Number(price),

          cost_price:
            cost_price
              ? Number(cost_price)
              : null,

          quantity:
            quantity
              ? Number(quantity)
              : 0,

          alert_quantity:
            alert_quantity
              ? Number(alert_quantity)
              : 0,

          category_id:
            Number(category_id),

          brand_id:
            brand_id
              ? Number(brand_id)
              : null,

          supplier_id:
            supplier_id
              ? Number(supplier_id)
              : null,

          expiry_date:expiry_date? new Date(expiry_date): null,

          is_featured:
            Boolean(is_featured),

          track_stock:
            track_stock !== undefined
              ? Boolean(track_stock)
              : true,

          status:
            status || "active"
        },

        include: {
          category: true,
          brand: true,
          supplier: true,
        }
      });

    return res.status(201).json({

      message:
        "Product created successfully",

      product,

      qr_image
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET ALL PRODUCTS
exports.getAll = async (req, res) => {

  try {

    const {
      search = "",
      page = 1,
      limit = 10,
      status,
      category_id,
      brand_id,
    } = req.query;

    const skip =
      (Number(page) - 1) *
      Number(limit);

    const where = {

      ...(status && { status }),

      ...(category_id && {
        category_id:
          Number(category_id)
      }),

      ...(brand_id && {
        brand_id:
          Number(brand_id)
      }),

      ...(search && {

        OR: [

          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },

          {
            sku: {
              contains: search,
              mode: "insensitive"
            }
          },

          {
            barcode: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      })
    };

    const products =
      await prisma.product.findMany({

        where,

        include: {
          category: true,
          brand: true,
          supplier: true,
        },

        skip,

        take: Number(limit),

        orderBy: {
          id: "desc"
        }
      });

    const total =
      await prisma.product.count({
        where
      });

    return res.json({

      data: products,

      pagination: {

        total,

        page:
          Number(page),

        limit:
          Number(limit),

        totalPages:
          Math.ceil(
            total / Number(limit)
          )
      }
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET SINGLE PRODUCT
exports.getOne = async (req, res) => {

  try {

    const id =
      Number(req.params.id);

    const product =
      await prisma.product.findUnique({

        where: { id },

        include: {
          category: true,
          brand: true,
          supplier: true,
        }
      });

    if (!product) {

      return res.status(404).json({
        message:
          "Product not found"
      });
    }

    return res.json(product);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ UPDATE PRODUCT
exports.update = async (req, res) => {

  try {

    const id =
      Number(req.params.id);

    const existing =
      await prisma.product.findUnique({
        where: { id }
      });

    if (!existing) {

      return res.status(404).json({
        message:
          "Product not found"
      });
    }

    const data = req.body;

    // validate category
    if (data.category_id) {

      const category =
        await prisma.category.findUnique({
          where: {
            id:
              Number(data.category_id)
          }
        });

      if (!category) {

        return res.status(400).json({
          message:
            "Invalid category"
        });
      }
    }

    // regenerate slug
    let slug = existing.slug;

    if (
      data.name &&
      data.name !== existing.name
    ) {

      slug = slugify(data.name, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    const updated =
      await prisma.product.update({

        where: { id },

        data: {

          name:
            data.name ??
            existing.name,

          slug,

          barcode:
            data.barcode !== undefined
              ? data.barcode
              : existing.barcode,

          description:
            data.description !== undefined
              ? data.description
              : existing.description,

          image:
            data.image !== undefined
              ? data.image
              : existing.image,

          unit:
            data.unit !== undefined
              ? data.unit
              : existing.unit,

          expiry_date:data.expiry_date ? new Date(data.expiry_date) : existing.expiry_date,

          status:
            data.status ||
            existing.status,

          is_featured:
            data.is_featured !== undefined
              ? Boolean(data.is_featured)
              : existing.is_featured,

          track_stock:
            data.track_stock !== undefined
              ? Boolean(data.track_stock)
              : existing.track_stock,

          price:
            data.price
              ? Number(data.price)
              : existing.price,

          cost_price:
            data.cost_price
              ? Number(data.cost_price)
              : existing.cost_price,

          quantity:
            data.quantity
              ? Number(data.quantity)
              : existing.quantity,

          alert_quantity:
            data.alert_quantity
              ? Number(data.alert_quantity)
              : existing.alert_quantity,

          category_id:
            data.category_id
              ? Number(data.category_id)
              : existing.category_id,

          brand_id:
            data.brand_id
              ? Number(data.brand_id)
              : existing.brand_id,

          supplier_id:
            data.supplier_id
              ? Number(data.supplier_id)
              : existing.supplier_id,
        },

        include: {
          category: true,
          brand: true,
          supplier: true,
        }
      });

    return res.json({

      message:
        "Product updated successfully",

      product: updated
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ TOGGLE STATUS
exports.toggleStatus = async (req, res) => {

  try {

    const id =
      Number(req.params.id);

    const product =
      await prisma.product.findUnique({
        where: { id }
      });

    if (!product) {

      return res.status(404).json({
        message:
          "Product not found"
      });
    }

    const updated =
      await prisma.product.update({

        where: { id },

        data: {

          status:
            product.status === "active"
              ? "inactive"
              : "active"
        }
      });

    return res.json({

      message:
        "Status updated",

      product: updated
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ❌ DELETE PRODUCT
exports.remove = async (req, res) => {

  try {

    const id =
      Number(req.params.id);

    await prisma.product.delete({
      where: { id }
    });

    return res.json({
      message:
        "Product deleted"
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};