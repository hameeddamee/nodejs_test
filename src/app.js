const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const handler = require("./library/helpers/errorHandlers");
const config = require("./config");
const { userModule, todoModule } = require("./components");

const app = express();

require("./library/middlewares/passportMiddleware")(passport);

app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(
  express.urlencoded({
    limit: "2mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  const title = "Hello There 🖐";
  res.render("index", {
    title: title,
  });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about");
});

app.use(`${config.api.prefix}/user`, userModule.routes);

handler.handleErrors(app);

module.exports = app;
