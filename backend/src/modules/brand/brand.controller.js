const prisma = require("../../config/prisma");
const slugify = require("slugify");


// ✅ CREATE BRAND
exports.create = async (req, res) => {

    try {

        const {
            name,
            logo,
            status
        } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Brand name is required"
            });
        }

        // generate slug
        let slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true,
        });

        // check duplicate slug
        const existingSlug =
            await prisma.brand.findFirst({
                where: { slug }
            });

        // make slug unique
        if (existingSlug) {
            slug = `${slug}-${Date.now()}`;
        }

        const brand =
            await prisma.brand.create({
                data: {
                    name,
                    slug,
                    logo: logo || null,
                    status: status || "active"
                }
            });

        return res.status(201).json({
            message:
                "Brand created successfully",
            brand
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ GET ALL BRANDS
exports.getAll = async (req, res) => {

    try {

        const { status } = req.query;

        const brands =
            await prisma.brand.findMany({
                where:
                    status
                        ? { status }
                        : {},

                orderBy: {
                    id: "desc"
                }
            });

        return res.json(brands);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ GET SINGLE BRAND
exports.getOne = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const brand =
            await prisma.brand.findUnique({
                where: { id }
            });

        if (!brand) {
            return res.status(404).json({
                message: "Brand not found"
            });
        }

        return res.json(brand);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ UPDATE BRAND
exports.update = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const {
            name,
            logo,
            status
        } = req.body;

        // check existing brand
        const existing =
            await prisma.brand.findUnique({
                where: { id }
            });

        if (!existing) {
            return res.status(404).json({
                message: "Brand not found"
            });
        }

        // current slug
        let slug = existing.slug;

        // generate slug if missing
        if (
            !slug ||
            slug.trim() === ""
        ) {

            slug = slugify(
                name || existing.name,
                {
                    lower: true,
                    strict: true,
                    trim: true,
                }
            );
        }

        // regenerate slug if name changes
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
            await prisma.brand.findFirst({
                where: {
                    slug,
                    NOT: { id }
                }
            });

        // make slug unique
        if (duplicateSlug) {
            slug = `${slug}-${Date.now()}`;
        }

        // update brand
        const updated =
            await prisma.brand.update({
                where: { id },
                data: {

                    name:
                        name ?? existing.name,

                    slug,

                    logo:
                        logo !== undefined
                            ? logo
                            : existing.logo,

                    status:
                        status || existing.status
                }
            });

        return res.json({
            message:
                "Brand updated successfully",
            brand: updated
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ TOGGLE BRAND STATUS
exports.toggleStatus = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const brand =
            await prisma.brand.findUnique({
                where: { id }
            });

        if (!brand) {
            return res.status(404).json({
                message: "Brand not found"
            });
        }

        const updated =
            await prisma.brand.update({
                where: { id },
                data: {
                    status:
                        brand.status === "active"
                            ? "inactive"
                            : "active"
                }
            });

        return res.json({
            message:
                "Brand status updated",
            brand: updated
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ❌ DELETE BRAND
exports.remove = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        await prisma.brand.delete({
            where: { id }
        });

        return res.json({
            message:
                "Brand deleted successfully"
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};