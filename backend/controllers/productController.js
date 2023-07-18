const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const cloudinary = require("cloudinary");

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const features = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .search();

  const products = await features.query;
  const totalProduct = await Product.find();
  const totalProducts = totalProduct.length;
  const totalPages = Math.ceil(totalProducts / process.env.RPP);
  const numOfResults = products.length;
  res.status(200).json({
    success: true,
    products,
    numOfResults,
    totalPages,
    totalProducts,
  });
});

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  images = req.body.image;
  // console.log(images);
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "munch-express/products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.image = imagesLinks[0].url;
  // const image = req.body.image;

  // let result;
  // if (typeof image === "string") {
  //   result = await cloudinary.v2.uploader.upload(image, {
  //     folder: "munch-express/products",
  //   });
  // } else {
  //   result = await cloudinary.v2.uploader.upload(image[0], {
  //     folder: "munch-express/products",
  //   });
  // }

  // const imageLink = {
  //   public_id: result.public_id,
  //   url: result.secure_url,
  // };

  // req.body.image = imageLink.url;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  if (req.body.image) {
    let images = [];

    images = req.body.image;
    console.log(images);
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "munch-express/products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.image = imagesLinks[0].url;
  }
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product)
    throw new ErrorHandler(`Product by id: ${id} dosent exists!`, 404);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  let product = {};
  product = await Product.findById(id);
  if (!product)
    throw new ErrorHandler(`Product by id: ${id} dosent exists!`, 404);
  product = await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully!",
  });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ErrorHandler("Product not Found!", 404);
  }
  await product.incrementViewCount();
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Product.distinct("category");
  res.status(200).json({
    success: true,
    categories,
  });
});

exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Product.distinct("reviews");
  res.status(200).json({
    success: true,
    reviews,
  });
});
