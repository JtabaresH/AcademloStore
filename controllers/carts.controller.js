const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const addProductToCart = catchAsync(async (req, res, next) => {});
const updatedCartProduct = catchAsync(async (req, res, next) => {});
const deleteProductFromCarById = catchAsync(async (req, res, next) => {});
const purcharseCart = catchAsync(async (req, res, next) => {});

module.exports = {
  addProductToCart,
  updatedCartProduct,
  deleteProductFromCarById,
  purcharseCart,
};
