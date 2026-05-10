require('dotenv').config();

const app = require('./app');

const PORT =
  process.env.PORT || 5000;

const APP_URL =
  process.env.APP_URL || "localhost";

app.listen(PORT, () => {

  console.log(
    `✅ Server running on ${APP_URL}:${PORT}`
  );
});