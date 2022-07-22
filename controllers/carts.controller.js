/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); */

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// Models
const { Product } = require('../models/product.model')
const { ProductInCart } = require('../models/productInCart.model')


const addProductToCart = catchAsync(async (req, res, next) => {
  const { cart } = req;
  const { productId, quantity } = req.body;

  const productExistsId = await Product.findOne({ where: { status: 'active', id: productId } })

  if (productExistsId) {
    if (productExistsId.quantity >= quantity) {
      const productExistsInCart = await ProductInCart.findOne({ where: { productId: productId } })

      if (productExistsInCart) {
        next(new AppError('This product is already in the cart', 400))
      } else if (productExistsInCart.status === 'removed'){
          
        await ProductInCart.update({ status: 'active' })

        const newProductInCart = await ProductInCart.create({
          cartId: cart.id,
          productId,
          quantity
        })

        res.status(201).json({
          status: 'success',
          newProductInCart
        })

      }

    } else {
      return next(new AppError('The quantity is greater than available', 400))
    }

  } else {
    return next(new AppError('This product not exist', 400))
  }

});

const updatedCartProduct = catchAsync(async (req, res, next) => {

});

const deleteProductFromCarById = catchAsync(async (req, res, next) => {

});

const purcharseCart = catchAsync(async (req, res, next) => {

});

module.exports = {
  addProductToCart,
  updatedCartProduct,
  deleteProductFromCarById,
  purcharseCart,
};
