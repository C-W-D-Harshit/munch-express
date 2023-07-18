const express = require("express");
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  protect,
  logout,
  restrictTo,
} = require("../controllers/authController");
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  changeRole,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", protect, restrictTo("admin"), getAllUsers);

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/forgetPassword", forgetPassword);
router.patch("/user/resetPassword/:token", resetPassword);
router.patch("/user/changePassword", protect, changePassword);
router.patch("/user/updateMe", protect, updateMe);
router.delete("/user/deleteMe", protect, deleteMe);
router.get("/user/logout", protect, logout);
router.get("/user/me", protect, getMe);

router
  .route("/user/:id")
  .get(protect, restrictTo("admin"), getUserDetails)
  .patch(protect, restrictTo("admin"), updateUser)
  .put(protect, restrictTo("admin"), changeRole)
  .delete(protect, restrictTo("admin"), deleteUser);

module.exports = router;
