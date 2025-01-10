const express = require('express');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// 🆕 Create Order (Checkout)
router.post('/checkout', verifyJWT, async (req, res) => {
  const { products, totalAmount, shippingAddress } = req.body;

  try {
    const order = new Order({
      user: req.userId,
      products,
      totalAmount,
      shippingAddress,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
