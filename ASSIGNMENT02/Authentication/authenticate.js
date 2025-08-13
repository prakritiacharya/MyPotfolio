//function to authenticate the user
function isAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {

    return next();
  } else {

    res.redirect("/login");
  }
}

module.exports = isAuthenticated;