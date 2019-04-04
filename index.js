const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User"); // make sure this is required before any modules that depend on it
require("./services/passport");

mongoose.connect(keys.mongoUri, { useNewUrlParser: true }).catch(console.error);
const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
