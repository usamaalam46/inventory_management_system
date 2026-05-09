// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    console.log("🗑 Clearing database...");

    // =========================
    // TRUNCATE DATABASE
    // =========================

    await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "Product",
      "Category",
      "Brand",
      "Supplier",
      "User"
    RESTART IDENTITY CASCADE;
  `);

    console.log("✅ Database cleared");

    // =========================
    // USERS
    // =========================

    const adminPassword = await bcrypt.hash("admin123", 10);
    const salesPassword = await bcrypt.hash("sales123", 10);

    await prisma.user.createMany({
        data: [
            {
                name: "Admin Spain",
                email: "admin@inventory.es",
                password: adminPassword,
                role: "admin",

            },
            {
                name: "Sales Spain",
                email: "sales@inventory.es",
                password: salesPassword,
                role: "sales",

            },
        ],
    });

    console.log("✅ Users seeded");

    // =========================
    // BRANDS (20)
    // =========================

    const brandNames = [
        "Samsung",
        "Apple",
        "Dell",
        "HP",
        "Lenovo",
        "Asus",
        "Acer",
        "Sony",
        "Xiaomi",
        "Huawei",
        "Logitech",
        "MSI",
        "Razer",
        "Corsair",
        "LG",
        "Philips",
        "Canon",
        "Epson",
        "JBL",
        "Nokia",
    ];

    const brands = [];

    for (const brand of brandNames) {
        const created = await prisma.brand.create({
            data: {
                name: brand,
                slug: brand.toLowerCase().replace(/\s+/g, "-"),
                logo: `${brand.toLowerCase()}.png`,
                status: "active",
            },
        });

        brands.push(created);
    }

    console.log("✅ Brands seeded");

    // =========================
    // CATEGORIES (20)
    // =========================

    const electronics = await prisma.category.create({
        data: {
            name: "Electronics",
            slug: "electronics",
            status: "active",
        },
    });

    const categoryNames = [
        "Mobiles",
        "Laptops",
        "Accessories",
        "Gaming",
        "Mouse",
        "Keyboards",
        "Headphones",
        "Smart Watches",
        "Monitors",
        "Printers",
        "Tablets",
        "Cameras",
        "Speakers",
        "Networking",
        "Storage Devices",
        "Office Electronics",
        "Smart Home",
        "Wearables",
        "Audio",
    ];

    const categories = [];

    for (const category of categoryNames) {
        const created = await prisma.category.create({
            data: {
                name: category,
                slug: category.toLowerCase().replace(/\s+/g, "-"),
                status: "active",
                parent_id: electronics.id,
            },
        });

        categories.push(created);
    }

    console.log("✅ Categories seeded");

    // =========================
    // SUPPLIERS (20)
    // =========================

    const supplierData = [
        ["Carlos Martinez", "Madrid Tech Solutions", "Madrid"],
        ["Javier Lopez", "Barcelona Electronics", "Barcelona"],
        ["Miguel Fernandez", "Valencia Digital", "Valencia"],
        ["Antonio Garcia", "Sevilla Tech", "Seville"],
        ["David Torres", "Bilbao Devices", "Bilbao"],
        ["Pablo Ruiz", "Granada Systems", "Granada"],
        ["Sergio Diaz", "Murcia Electronics", "Murcia"],
        ["Alberto Vega", "Zaragoza Tech", "Zaragoza"],
        ["Juan Perez", "Malaga Gadgets", "Malaga"],
        ["Luis Gomez", "Santander Digital", "Santander"],
        ["Daniel Navarro", "Toledo Electronics", "Toledo"],
        ["Victor Castro", "Cordoba Systems", "Cordoba"],
        ["Ruben Silva", "Pamplona Tech", "Pamplona"],
        ["Mario Herrera", "Salamanca Tech", "Salamanca"],
        ["Jose Molina", "Ibiza Electronics", "Ibiza"],
        ["Raul Ortega", "Alicante Gadgets", "Alicante"],
        ["Fernando Leon", "Canary Tech", "Canary Islands"],
        ["Enrique Ramos", "Gijon Electronics", "Gijon"],
        ["Adrian Santos", "Oviedo Digital", "Oviedo"],
        ["Ricardo Gil", "Vigo Devices", "Vigo"],
    ];

    const suppliers = [];

    for (let i = 0; i < supplierData.length; i++) {
        const item = supplierData[i];

        const supplier = await prisma.supplier.create({
            data: {
                name: item[0],
                company_name: item[1],
                email: `supplier${i + 1}@inventory.es`,
                phone: `+34 6000000${i + 1}`,
                address: `Street ${i + 1}`,
                city: item[2],
                country: "Spain",
                tax_number: `ES12345${i}`,
                status: "active",
            },
        });

        suppliers.push(supplier);
    }

    console.log("✅ Suppliers seeded");

    // =========================
    // PRODUCTS (20)
    // =========================

    const products = [
        "Samsung Galaxy S24",
        "iPhone 15 Pro",
        "Dell Inspiron 15",
        "HP Pavilion Gaming",
        "Lenovo ThinkPad X1",
        "Asus ROG Strix",
        "Acer Nitro 5",
        "Sony WH-1000XM5",
        "Xiaomi Redmi Note 13",
        "Huawei MateBook",
        "Logitech G102 Mouse",
        "MSI Gaming Laptop",
        "Razer BlackWidow",
        "Corsair K95 Keyboard",
        "LG UltraWide Monitor",
        "Philips Smart TV",
        "Canon EOS Camera",
        "Epson EcoTank Printer",
        "JBL Flip Speaker",
        "Nokia G42",
    ];

    for (let i = 0; i < products.length; i++) {
        await prisma.product.create({
            data: {
                name: products[i],
                sku: `SKU-${1000 + i}`,
                barcode: `84000000000${i}`,
                qr_code: `QR${1000 + i}`,
                price: 50 + i * 70,
                quantity: 5 + i,
                category_id: categories[i % categories.length].id,
                status: "active",
                slug: products[i].toLowerCase().replace(/\s+/g, "-"),
                alert_quantity: 3,
                brand_id: brands[i % brands.length].id,
                cost_price: 30 + i * 50,
                description: `${products[i]} premium electronic product`,
                image: `product-${i + 1}.png`,
                is_featured: i % 2 === 0,
                supplier_id: suppliers[i % suppliers.length].id,
                track_stock: true,
                unit: "pcs",
            },
        });
    }

    console.log("✅ Products seeded");

    console.log("🎉 Spain MVP database seeded successfully");
}

main()
    .catch((error) => {
        console.error("❌ Seeder error:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });