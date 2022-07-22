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
      } else if (productExistsInCart.status === 'removed') {

        await productExistsInCart.update({ status: 'active' })

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

const updateCartProduct = catchAsync(async (req, res, next) => {
  const { cart, productInCart, sessionUser } = req;
  const { productId, newQty } = req.body;

  if (cart.userId === sessionUser.id) {
    const productExistsInCart = await ProductInCart.findOne({ where: { status: 'active', id: productId } })
    if (productExistsInCart) {
      if (productExistsInCart.quantity >= newQty) {
        await productInCart.update({ quantity: newQty })

        if (newQty === 0) {
          await productInCart.update({ status: 'removed' })
        } else if (newQty > 0 && productExistsInCart.status === 'removed') {
          await productInCart.update({ status: 'active' })
        }

        res.status(201).json({
          status: 'success',
          productInCart
        })

      } else {
        return next(new AppError('The quantity is greater than available', 400))
      }
    } else {
      return next(new AppError('This product not exist in the cart', 400))
    }
  } else {
    return next(new AppError('This user does not have a cart', 400))
  }
});

const deleteProductFromCartById = catchAsync(async (req, res, next) => {
  const { productInCart } = req;
  const { productId } = req.params;

  const productExistsInCart = await ProductInCart.findOne({ where: { status: 'active', id: productId } })

  if (productExistsInCart) {
    await productInCart.update({ status: 'removed', quantity: 0 })
  } else {
    return next(new AppError('This product not exist in the cart', 400))
  }

  res.status(201).json({
    status: 'success',
    productInCart
  })
});

const purcharseCart = catchAsync(async (req, res, next) => {
  
});

module.exports = {
  addProductToCart,
  updateCartProduct,
  deleteProductFromCartById,
  purcharseCart,
};
