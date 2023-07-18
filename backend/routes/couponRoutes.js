const express = require("express");

const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponDetails,
  getUserCouponDetails,
} = require("../controllers/couponController");

const router = express.Router();

router.route("/coupons").get(protect, restrictTo("admin"), getAllCoupons);
router.route("/coupon").post(protect, restrictTo("admin"), createCoupon);
router
  .route("/coupon/:id")
  .patch(protect, restrictTo("admin"), updateCoupon)
  .delete(protect, restrictTo("admin"), deleteCoupon)
  .get(protect, restrictTo("admin"), getCouponDetails);

router.get("/user/coupon/:id", protect, getUserCouponDetails);

module.exports = router;
