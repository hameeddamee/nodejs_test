exports.getAuthorize = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Not Authorized");
  res.redirect("/api/v1/user/login");
};
