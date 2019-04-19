const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./models/User"); // make sure this is required before any modules that depend on it
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoUri, { useNewUrlParser: true }).catch(console.error);

const app = express();

// req.body
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// after routes have been set up
if (process.env.NODE_ENV === "production") {
  // express will serve prod assets
  app.use(express.static("client/build"));

  // express will serve index.html
  // for routes it doesn't recognize
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
