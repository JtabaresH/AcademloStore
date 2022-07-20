// Models
const { Cart } = require('../models/cart.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const cartExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOne({ where: { id, status: 'active' } });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  req.cart = cart;
  next();
});

module.exports = { cartExists };
