// Check the user's role here based on your authentication system
// For example, if the user's role is stored in a cookie
// const user_ = req.cookies.user;
// let user = null;
// let userRole = "";
// if (user_) {
//   user = JSON.parse(user_);
//   userRole = user.role;
// }
// const token = req.cookies.token;
// if ((req.path === "/login" || req.path === "/signup") && token) {
//   return res.redirect("/account");
// }

// // If the user is not an admin, redirect to login or show an error message
// if (req.path === "/admin" && userRole !== "admin") {
//   return res.redirect("/login"); // Redirect to login page
//   // Or return an error response
//   // return res.status(403).json({ error: "Access denied. You must be an admin to access this page." });
// }

exports.frontendRouteController = (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  const userRole = req.cookies.role;
  // console.log(userRole);

  if ((req.path === "/auth/login" || req.path === "/auth/signup") && token) {
    return res.redirect("/dashboard");
  }

  if (req.path.startsWith("/admin") && !token && userRole !== "admin") {
    return res.redirect("/auth/login");
  }

  if (req.path.startsWith("/dashboard") && !token) {
    return res.redirect("/");
  }

  next();
};
