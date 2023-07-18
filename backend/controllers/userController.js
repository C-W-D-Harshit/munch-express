const { userAgent } = require("next/server");
const User = require("../models/userModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .search();
  const users = await features.query;
  const numOfResults = users.length;
  const totalProduct = await User.find();
  const totalProducts = totalProduct.length;
  const totalPages = Math.ceil(totalProducts / process.env.RPP);
  res.status(200).json({
    success: true,
    users,
    numOfResults,
    totalPages,
  });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) throw new ErrorHandler(`User by id: ${id} dosent exists!`, 404);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new ErrorHandler(`User by id: ${id} dosent exists!`, 404);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  let user = {};
  user = await User.findById(id);
  if (!user) throw new ErrorHandler(`User by id: ${id} dosent exists!`, 404);
  user = await User.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully!",
  });
});

exports.changeRole = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(
    id,
    {
      role: req.body.role,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

exports.changeIP = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const ipAddress = IP.address();
  const user = await User.findByIdAndUpdate(
    id,
    {
      ip: ipAddress,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateMe = catchAsyncErrors(async (req, res, next) => {
  if (req.body.password)
    throw new ErrorHandler("Passwords are not updated from this route!", 400);

  const filtObj = filterObj(req.body, "name", "email");

  const user = await User.findByIdAndUpdate(req.user._id, filtObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully!",
  });
});

exports.deleteMe = catchAsyncErrors(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    success: true,
    message: "User deleted successfully!",
  });
});

exports.getMe = catchAsyncErrors(async (req, res, next) => {
  const user = { ...req.user._doc };
  user.ip = undefined;
  user.createdAt = undefined;
  user.updatedAt = undefined;
  user.passwordChangedAt = undefined;
  // console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});
