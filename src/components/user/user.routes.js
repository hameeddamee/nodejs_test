const express = require("express");
const router = express.Router();

const { validateSignUp, validateLogin } = require("./user.validator");
const userController = require("./user.controller");

const { catchErrors } = require("../../library/helpers/errorFormatHelpers");
const { getAuthorize } = require("../../library/middlewares/authMiddleware");

// User Login Route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// User Register Route
router.get("/register", (req, res) => {
  res.render("users/register");
});

/**
 * User Signup
 * @name   post/signup
 * @route  GET api/v1/user/sign-up
 * @desc   Local user signup flow
 * @api    public
 * @param  {String} path user's signup path
 * @return {Users} `User` instance
 */
router.post(
  "/sign-up",
  validateSignUp(),
  catchErrors(userController.postSignUp)
);

/**
 * User Login
 * @name   post/login
 * @route  GET api/v1/user/login
 * @api    public
 * @desc   route for user to login
 * @param  {String} path user's signup path
 * @return {Object} `Auth Token` and User Instance
 */
router.post("/login", validateLogin(), catchErrors(userController.postLogin));

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/api/v1/user/login");
});

// User Register Route
router.get("/dashboard", getAuthorize, (req, res) => {
  res.render("dashboard/index");
});

module.exports = router;
