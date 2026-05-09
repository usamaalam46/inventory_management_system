const prisma = require("../../config/prisma");
const slugify = require("slugify");


// ✅ CREATE CATEGORY / SUBCATEGORY
exports.create = async (req, res) => {

  try {

    const { name, parent_id } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    let parent = null;

    // validate parent category
    if (parent_id) {

      parent = await prisma.category.findUnique({
        where: {
          id: Number(parent_id)
        }
      });

      if (!parent) {
        return res.status(400).json({
          message: "Parent category not found"
        });
      }
    }

    // generate slug
    let slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // check duplicate slug
    const existingSlug = await prisma.category.findFirst({
      where: { slug }
    });

    // make slug unique
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        parent_id: parent_id
          ? Number(parent_id)
          : null
      }
    });

    return res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET ALL CATEGORIES
exports.getAll = async (req, res) => {

  try {

    const { status } = req.query;

    const categories = await prisma.category.findMany({
      where: status ? { status } : {},
      include: {
        parent: true
      },
      orderBy: {
        id: "desc"
      }
    });

    return res.json(categories);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET TREE STRUCTURE
exports.getTree = async (req, res) => {

  try {

    const categories = await prisma.category.findMany({
      where: {
        parent_id: null
      },
      include: {
        children: {
          include: {
            children: true
          }
        }
      }
    });

    return res.json(categories);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ GET SINGLE CATEGORY
exports.getOne = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true
      }
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    return res.json(category);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};



// ✅ UPDATE CATEGORY
exports.update = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const {
      name,
      parent_id
    } = req.body;

    // check existing category
    const existing =
      await prisma.category.findUnique({
        where: { id }
      });

    if (!existing) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    // prevent self parent
    if (
      parent_id &&
      Number(parent_id) === id
    ) {
      return res.status(400).json({
        message:
          "Category cannot be its own parent"
      });
    }

    // validate parent category
    if (parent_id) {

      const parent =
        await prisma.category.findUnique({
          where: {
            id: Number(parent_id)
          }
        });

      if (!parent) {
        return res.status(400).json({
          message:
            "Parent category not found"
        });
      }
    }

    // generate slug
    let slug = existing.slug;

    // generate slug if missing
    if (
      !slug ||
      slug.trim() === ""
    ) {
      console.log("Generating slug from name");

      slug = slugify(
        name || existing.name,
        {
          lower: true,
          strict: true,
          trim: true,
        }
      );
    }

    // regenerate slug if name changed
    if (
      name &&
      name !== existing.name
    ) {

      slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    // check duplicate slug
    const duplicateSlug =
      await prisma.category.findFirst({
        where: {
          slug,
          NOT: { id }
        }
      });

    // make slug unique
    if (duplicateSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // update category
    const updated =
      await prisma.category.update({
        where: { id },
        data: {

          name:
            name ?? existing.name,

          slug,

          parent_id:
            parent_id !== undefined
              ? parent_id
                ? Number(parent_id)
                : null
              : existing.parent_id
        }
      });

    return res.json({
      message:
        "Category updated successfully",
      category: updated
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ✅ TOGGLE CATEGORY STATUS
exports.toggleStatus = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const category =
      await prisma.category.findUnique({
        where: { id }
      });

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const updated =
      await prisma.category.update({
        where: { id },
        data: {
          status:
            category.status === "active"
              ? "inactive"
              : "active"
        }
      });

    return res.json({
      message: "Category status updated",
      category: updated
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};


// ❌ DELETE CATEGORY
exports.remove = async (req, res) => {

  try {

    const id = Number(req.params.id);

    // check subcategories
    const hasChildren =
      await prisma.category.findFirst({
        where: {
          parent_id: id
        }
      });

    if (hasChildren) {
      return res.status(400).json({
        message:
          "Please delete subcategories first"
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    return res.json({
      message: "Category deleted successfully"
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
};