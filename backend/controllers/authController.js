const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const IP = require("ip");
const { promisify } = require("util");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const sendToken = (user, statusCode, message, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.cookie("role", user.role, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    message,
  });
};

exports.signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, phoneNumber } = req.body;

  if (password !== confirmPassword) {
    throw new ErrorHandler("Password and Confirm Password did'nt match!", 400);
  }
  const ipAddress = IP.address();

  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
    ip: ipAddress,
  });

  sendToken(user, 200, "Signed Up successfully!", res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ErrorHandler("Please provide email and password!", 400);

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password)))
    throw new ErrorHandler("Incorrect email or password!", 401);

  sendToken(user, 200, `Logged In as ${user.name.split(" ")[0]}`, res);
});

exports.protect = catchAsyncErrors(async (req, res, next) => {
  let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  token = req.cookies.jwt;

  if (!token) throw new ErrorHandler("You are not logged in!", 401);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user)
    throw new ErrorHandler("The user belonging to this token dosent exists!");

  // if (user.changedPasswordAfter(decoded.iat))
  //   throw new ErrorHandler(
  //     "The user recently changed the password!, Please login again!"
  //   );

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new ErrorHandler(
        "You dont have permission to perform this action!"
      );
    next();
  };
};

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new ErrorHandler("This is no user with this email id!", 404);

  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset url(valid for 10 min)",
      message: resetUrl,
    });
    res.status(200).json({
      success: true,
      message: `Password reset url sent to the email: ${user.email}`,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({
      validateBeforeSave: false,
    });
    res.status(500).json({
      success: false,
      err,
    });
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) throw new ErrorHandler("Token is invalid or expired", 400);

  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword)
    throw new ErrorHandler("Fields cannot be empty!", 400);
  if (password !== confirmPassword)
    throw new ErrorHandler("Passwords did'nt match!", 400);

  user.password = password;
  user.passwordConfirm = confirmPassword;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  if (!user || !(await user.checkPassword(password, user.password)))
    throw new ErrorHandler("Incorrect email or password!", 401);

  sendToken(user, 200, `Password reset successfull!`, res);
});

exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPass, newPass, confirmPass } = req.body;

  if (!oldPass || !newPass || !confirmPass)
    throw new ErrorHandler("Please provide all the required values!");

  if (newPass !== confirmPass)
    throw new ErrorHandler(
      "New Password and Confirm Password did'nt match!",
      400
    );

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.checkPassword(oldPass, user.password)))
    throw new ErrorHandler("Passwords dont match!");

  user.password = newPass;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully!",
  });
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("jwt");
  res.clearCookie("role");
  res.status(200).json({
    success: true,
    message: "Logged Out!",
  });
});
