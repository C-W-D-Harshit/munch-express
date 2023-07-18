const { default: mongoose } = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You must provide a userId."],
    },
    nickname: {
      type: String,
      required: [true, "Nickname is required."],
      trim: true,
      minlength: [2, "Nickname must have at least 2 characters."],
      maxlength: [50, "Nickname cannot exceed 50 characters."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
      minlength: [5, "Address must have at least 5 characters."],
      maxlength: [200, "Address cannot exceed 200 characters."],
    },
    city: {
      type: String,
      required: [true, "City is required."],
      trim: true,
      minlength: [2, "City must have at least 2 characters."],
      maxlength: [50, "City cannot exceed 50 characters."],
    },
    state: {
      type: String,
      required: [true, "State is required."],
      trim: true,
      minlength: [2, "State must have at least 2 characters."],
      maxlength: [50, "State cannot exceed 50 characters."],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required."],
      trim: true,
      validate: {
        validator: function (value) {
          return /^\d{6}$/.test(value);
        },
        message: "Postal code should be a valid 6-digit numeric code.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
