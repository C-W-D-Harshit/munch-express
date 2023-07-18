const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
      minLength: 8,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      validate: {
        validator: function (value) {
          // Remove the "+91" country code if present
          const phoneNumberWithoutCountryCode = value.replace(/^\+91/, "");

          // Validate the phone number without the country code
          return /^\d{10}$/.test(phoneNumberWithoutCountryCode);
        },
        message: "Phone number should be a valid 10-digit numeric code.",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
    ip: {
      type: String,
      required: [true, "User IP is required!"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      select: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkPassword = async (candi, user) => {
  return await bcrypt.compare(candi, user);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  const timestamp = parseInt(this.passwordChangedAt?.getTime() / 1000);
  return JWTTimestamp < timestamp;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
