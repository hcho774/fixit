const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const logger = require("./utils/logger.js");
const user = require("./routes/user.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 5001;

app.use(logger);
app.use("/user", user);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
