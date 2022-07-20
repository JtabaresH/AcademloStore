const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllProductsActive = catchAsync(async (req, res, next) => {});
const getProductById = catchAsync(async (req, res, next) => {});
const getAllCategoriesActive = catchAsync(async (req, res, next) => {});
const createProduct = catchAsync(async (req, res, next) => {});
const updateProduct = catchAsync(async (req, res, next) => {});
const deleteProduct = catchAsync(async (req, res, next) => {});
const createCategory = catchAsync(async (req, res, next) => {});
const updateCategory = catchAsync(async (req, res, next) => {});

module.exports = {
  getAllProductsActive,
  getProductById,
  getAllCategoriesActive,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
};
