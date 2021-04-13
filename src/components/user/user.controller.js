const { validationResult } = require("express-validator");
const passport = require("passport");

const userService = require("./user.service");

const { sentenceCase } = require("../../library/helpers/stringHelpers");

exports.postSignUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("error_msg", "Form not valid");
    return res.render("users/register", {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  }

  const { name, email, password } = req.body;
  let formattedfullNames = sentenceCase(`${name}`);

  const userExist = await userService.checkUserExist({ email });

  if (userExist) {
    req.flash("error_msg", "User already exists");
    return res.render("users/register", {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  }

  await userService.signUp({
    formattedfullNames,
    email,
    password,
  });

  req.flash("success_msg", "You are now registered and can log in");
  return res.redirect("/api/v1/user/login");
};

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("users/login", {
      email: req.body.email,
      password: req.body.password,
    });
  }

  const { email, password } = req.body;
  await userService.authenticate(email.toLowerCase(), password);

  passport.authenticate("local", {
    successRedirect: "/api/v1/user/dashboard",
    failureRedirect: "/api/v1/user/login",
    failureFlash: true,
  })(req, res, next);
};
