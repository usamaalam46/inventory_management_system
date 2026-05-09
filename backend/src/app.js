const express = require('express');
const cors = require('cors');
require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/product', require('./modules/product/product.routes'));
app.use('/api/stock', require('./modules/stock/stock.routes'));
app.use('/api/pos', require('./modules/pos/pos.routes'));
app.use('/api/reports', require('./modules/reports/reports.routes'));
app.use('/api/category', require('./modules/category/category.routes'));
app.use('/api/brand', require('./modules/brand/brand.routes'));
app.use('/api/supplier', require('./modules/supplier/supplier.routes'));
app.use("/api/stocks", require('./modules/stock/stock.routes'));
app.use("/api/pos", require('./modules/pos/pos.routes'));
app.use("/api/reports", require('./modules/reports/reports.routes'));

module.exports = app;