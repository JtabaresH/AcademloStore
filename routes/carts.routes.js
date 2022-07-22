const express = require('express');

// Controllers
const {
  addProductToCart,
  updateCartProduct,
  deleteProductFromCartById,
  purcharseCart,
} = require('../controllers/carts.controller');

// Middlewares
const { cartExists } = require('../middlewares/carts.middleware');
const { productExists } = require('../middlewares/products.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const cartsRouter = express.Router();

cartsRouter.use(protectSession);
cartsRouter.post('/add-product', cartExists, productExists, addProductToCart);
cartsRouter.patch('/update-cart', cartExists, productExists, updateCartProduct);
cartsRouter.delete('/:productId', cartExists, productExists, deleteProductFromCartById);
cartsRouter.post('/purchase', purcharseCart);

module.exports = { cartsRouter };
