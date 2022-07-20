const express = require('express');

// Controllers
const {
  getAllProductsActive,
  getProductById,
  getAllCategoriesActive,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
} = require('../controllers/products.controller');

// Middlewares
const {
  createCategoriesValidators,
  createProductValidators,
} = require('../middlewares/validators.middleware');

const { productExists } = require('../middlewares/products.middleware');
const { categoryExists } = require('../middlewares/categories.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const productsRouter = express.Router();

productsRouter.get('/', getAllProductsActive);
productsRouter.get('/:id', productExists, getProductById);
productsRouter.get('/categories', getAllCategoriesActive);

productsRouter.use(protectSession);

productsRouter.post('/', createProductValidators, createProduct);

productsRouter.patch('/:id', productExists, updateProduct);

productsRouter.delete('/:id', productExists, deleteProduct);

productsRouter.post('/categories', createCategoriesValidators, createCategory);

productsRouter.patch('/categories/:id', categoryExists, updateCategory);

module.exports = { productsRouter };
