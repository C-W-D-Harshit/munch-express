const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
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
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required."],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required."],
        min: [1, "Quantity must be at least 1."],
      },
      addons: [
        {
          addon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Addon",
            required: [true, "Addon is required."],
          },
          price: {
            type: Number,
            required: [true, "Addon price is required."],
            min: [0, "Addon price cannot be negative."],
          },
        },
      ],
      price: {
        type: Number,
        required: [true, "Product price is required."],
        min: [0, "Product price cannot be negative."],
      },
    },
  ],
  shipping: {
    type: shippingSchema,
    required: [true, "Shipping is required."],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: [
      "Order Placed",
      "Order Accepted",
      "Preparing Food",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Delayed",
      "On Hold",
      "Ready for Pickup",
      "Payment Pending",
      "Refunded",
    ],
    default: "Order Placed",
  },
});

// Virtual property to calculate totalPrice
orderSchema.virtual("totalPrice").get(function () {
  let total = 0;
  for (const product of this.products) {
    total += product.price;
  }
  return total;
});

// Ensure virtuals are included in JSON output
orderSchema.set("toJSON", { virtuals: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
