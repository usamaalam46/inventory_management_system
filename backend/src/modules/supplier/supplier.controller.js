// modules/supplier/supplier.controller.js

const prisma = require("../../config/prisma");


// ✅ CREATE SUPPLIER
exports.create = async (req, res) => {

    try {

        const {
            name,
            company_name,
            email,
            phone,
            address,
            city,
            country,
            tax_number,
            status,
        } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Supplier name is required"
            });
        }

        const supplier =
            await prisma.supplier.create({
                data: {

                    name,

                    company_name:
                        company_name || null,

                    email:
                        email || null,

                    phone:
                        phone || null,

                    address:
                        address || null,

                    city:
                        city || null,

                    country:
                        country || null,

                    tax_number:
                        tax_number || null,

                    status:
                        status || "active"
                }
            });

        return res.status(201).json({
            message:
                "Supplier created successfully",
            supplier
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ GET ALL SUPPLIERS
exports.getAll = async (req, res) => {

    try {

        const { status } = req.query;

        const suppliers =
            await prisma.supplier.findMany({
                where:
                    status
                        ? { status }
                        : {},

                orderBy: {
                    id: "desc"
                }
            });

        return res.json(suppliers);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ GET SINGLE SUPPLIER
exports.getOne = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const supplier =
            await prisma.supplier.findUnique({
                where: { id }
            });

        if (!supplier) {
            return res.status(404).json({
                message:
                    "Supplier not found"
            });
        }

        return res.json(supplier);

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ✅ UPDATE SUPPLIER
exports.update = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const {
            name,
            company_name,
            email,
            phone,
            address,
            city,
            country,
            tax_number,
            status,
        } = req.body;

        const existing =
            await prisma.supplier.findUnique({
                where: { id }
            });

        if (!existing) {
            return res.status(404).json({
                message:
                    "Supplier not found"
            });
        }

        const updated =
            await prisma.supplier.update({
                where: { id },
                data: {

                    name:
                        name ?? existing.name,

                    company_name:
                        company_name !== undefined
                            ? company_name
                            : existing.company_name,

                    email:
                        email !== undefined
                            ? email
                            : existing.email,

                    phone:
                        phone !== undefined
                            ? phone
                            : existing.phone,

                    address:
                        address !== undefined
                            ? address
                            : existing.address,

                    city:
                        city !== undefined
                            ? city
                            : existing.city,

                    country:
                        country !== undefined
                            ? country
                            : existing.country,

                    tax_number:
                        tax_number !== undefined
                            ? tax_number
                            : existing.tax_number,

                    status:
                        status || existing.status
                }
            });

        return res.json({
            message:
                "Supplier updated successfully",
            supplier: updated
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

        const supplier =
            await prisma.supplier.findUnique({
                where: { id }
            });

        if (!supplier) {
            return res.status(404).json({
                message:
                    "Supplier not found"
            });
        }

        const updated =
            await prisma.supplier.update({
                where: { id },
                data: {
                    status:
                        supplier.status === "active"
                            ? "inactive"
                            : "active"
                }
            });

        return res.json({
            message:
                "Supplier status updated",
            supplier: updated
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// ❌ DELETE SUPPLIER
exports.remove = async (req, res) => {

    try {

        const id =
            Number(req.params.id);

        await prisma.supplier.delete({
            where: { id }
        });

        return res.json({
            message:
                "Supplier deleted successfully"
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};