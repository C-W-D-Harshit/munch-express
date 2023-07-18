const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAllCategories,
  getAllReviews,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.route("/products").get(protect, getAllProducts);
router.route("/product").post(protect, restrictTo("admin"), createProduct);
router
  .route("/product/:id")
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct)
  .get(protect, getProductDetails);
router.get(
  "/products/categories",
  protect,
  restrictTo("admin"),
  getAllCategories
);
router.get("/products/reviews", protect, restrictTo("admin"), getAllReviews);

module.exports = router;
