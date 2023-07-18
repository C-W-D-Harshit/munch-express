const Coupon = require("../models/couponModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");

exports.getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const features = new ApiFeatures(Coupon.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .search();

  const coupons = await features.query;
  const totalCoupon = await Coupon.find();
  const totalCoupons = totalCoupon.length;
  const totalPages = Math.ceil(totalCoupons / process.env.RPP);
  const numOfResults = coupons.length;
  res.status(200).json({
    success: true,
    coupons,
    numOfResults,
    totalPages,
  });
});

exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.create(req.body);
  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const coupon = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!coupon)
    throw new ErrorHandler(`Coupon by id: ${id} dosent exists!`, 404);
  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  let coupon = {};
  coupon = await User.findById(id);
  if (!coupon)
    throw new ErrorHandler(`Coupon by id: ${id} dosent exists!`, 404);
  coupon = await Coupon.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Coupon Deleted Successfully!",
  });
});

exports.getCouponDetails = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    throw new ErrorHandler("Coupon not Found!", 404);
  }
  //   await Coupon.incrementViewCount();
  res.status(200).json({
    success: true,
    coupon,
  });
});

exports.getUserCouponDetails = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id).select("-usedBy");
  if (!coupon) {
    throw new ErrorHandler("Coupon not Found!", 404);
  }
  //   await Coupon.incrementViewCount();
  res.status(200).json({
    success: true,
    coupon,
  });
});
