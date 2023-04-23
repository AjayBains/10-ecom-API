const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const path = require("path");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
  res.send("createProduct");
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.find({ _id: productId });
  if (!product) {
    throw new customError.NotFoundError(`No product with id :${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new customError.NotFoundError(`No product with id :${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new customError.NotFoundError(`No product with id :${productId}`);
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Success product removed" });
};

const uploadImage = async (req, res) => {
  // console.log('log re files',req.files);
  if (!req.files) {
    throw new customError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new customError.BadRequestError("Please Upload Image");
  }
  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new customError.BadRequestError(
      "Please upload image smaler than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
