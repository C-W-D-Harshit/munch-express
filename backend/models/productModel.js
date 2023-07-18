const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User is required."],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required."],
    min: [1, "Rating must be at least 1."],
    max: [5, "Rating cannot exceed 5."],
  },
  comment: {
    type: String,
    required: [true, "Comment is required."],
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [3, "Name must have at least 3 characters."],
      maxlength: [100, "Name cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [10, "Description must have at least 10 characters."],
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
      validate: {
        validator: function (value) {
          // Regular expression pattern to match integers
          return /^\d+$/.test(value.toString());
        },
        message: "Price should be an integer value",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    featuredExpiry: {
      type: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
        minlength: [2, "Tag must have at least 2 characters."],
        maxlength: [30, "Tag cannot exceed 30 characters."],
      },
    ],
    addons: [
      {
        name: {
          type: String,
          required: [true, "Add-on name is required."],
          trim: true,
          minlength: [3, "Add-on name must have at least 3 characters."],
          maxlength: [50, "Add-on name cannot exceed 50 characters."],
        },
        price: {
          type: Number,
          required: [true, "Add-on price is required."],
          min: [0, "Add-on price cannot be negative."],
        },
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    sizes: [
      {
        name: {
          type: String,
          required: true,
          enum: ["small", "medium", "large"],
        },
        price: {
          type: Number,
          required: [true, "Add-on price is required."],
          min: [0, "Add-on price cannot be negative."],
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

productSchema.virtual("averageRating").get(function () {
  const ratingsSum = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const totalReviews = this.reviews.length;
  if (totalReviews === 0) {
    return 0;
  }
  const averageRating = ratingsSum / totalReviews;
  return averageRating.toFixed(1); // Rounds to 1 decimal place
});

productSchema.virtual("numOfReviews").get(function () {
  return this.reviews.length;
});

// productSchema.pre("save", async function (next) {
//   const ratingsSum = this.reviews.reduce(
//     (sum, review) => sum + review.rating,
//     0
//   );
//   const totalReviews = this.reviews.length;
//   if (totalReviews === 0) {
//     this.averageRating = 0;
//   } else {
//     this.averageRating = ratingsSum / totalReviews;
//   }
//   this.averageRating = this.averageRating.toFixed(1); // Rounds to 1 decimal place
//   this.numOfReviews = totalReviews;
//   next();
// });

productSchema.pre("save", function (next) {
  const MIN_NUM_REVIEWS = 5;
  const MIN_AVG_RATING = 4.5;
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // One day in milliseconds

  const numOfReviews = this.reviews.length;
  const averageRating =
    this.reviews.reduce((sum, review) => sum + review.rating, 0) / numOfReviews;

  const currentDate = new Date();
  const isPopular =
    numOfReviews >= MIN_NUM_REVIEWS && averageRating >= MIN_AVG_RATING;

  // Check if the product was popular before and if it has been one day since it was made popular
  if (this.isPopular && currentDate - this.updatedAt >= ONE_DAY_IN_MS) {
    this.isPopular = false; // Set popularity to false after one day
  } else if (!this.isPopular && isPopular) {
    this.isPopular = true; // Set popularity to true if it meets the criteria
  }

  next();
});

productSchema.pre("save", function (next) {
  const currentDate = new Date();

  // Check if the featuredExpiry date has passed
  if (this.featuredExpiry && this.featuredExpiry <= currentDate) {
    this.featured = false; // Set featured to false if the expiry date has passed
  }

  next();
});

productSchema.methods.incrementViewCount = async function () {
  this.viewCount++;
  await this.save();
};

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
