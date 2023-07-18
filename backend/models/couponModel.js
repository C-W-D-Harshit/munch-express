const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Coupon name is required!"],
    trim: true,
    maxLength: 15,
  },
  code: {
    type: String,
    required: [true, "Coupon code is required."],
    unique: true,
    trim: true,
  },
  discount: {
    type: Number,
    required: [true, "Coupon discount is required."],
    min: [0, "Discount value must be non-negative."],
  },
  description: {
    type: String,
    required: [true, "Coupon description is required."],
  },
  validFrom: {
    type: Date,
    required: [true, "Coupon valid from date is required."],
  },
  validUntil: {
    type: Date,
    required: [true, "Coupon valid until date is required."],
  },
  maxUses: {
    type: Number,
    default: null,
    min: [1, "Maximum uses must be at least 1."],
  },
  usedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

couponSchema.methods.useCoupon = function (purchaseAmount) {
  const currentDate = new Date();
  function calculateDiscountedAmount(discountPercentage, purchaseAmount) {
    const discount = (discountPercentage / 100) * purchaseAmount;
    return discount;
  }
  if (currentDate >= this.validFrom && currentDate <= this.validUntil) {
    // Coupon is valid
    const discountAmount = calculateDiscountedAmount(
      this.discount,
      purchaseAmount
    );
    const finalAmount = purchaseAmount - discountAmount;
    console.log(`Discount applied: ${discountAmount}`);
    console.log(`Final amount after discount: ${finalAmount}`);
    return finalAmount; // Return the final amount after applying the coupon
  } else {
    console.log("Coupon is expired.");
    return null; // Return null or handle the expired coupon case accordingly
  }
};

couponSchema.virtual("totalUses").get(function () {
  const totalUses = this.usedBy.length;
  return totalUses;
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
