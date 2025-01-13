const express = require('express');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};
// POST /api/orders/checkout - Create a new order
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

// GET /api/orders/orders - Get orders of the logged-in user
router.get('/orders', verifyJWT, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// DELETE /api/orders/:id - Delete an order by ID
// DELETE /api/orders - Delete an order by ID (from body)
router.delete('/orders', verifyJWT, async (req, res) => {
  try {
    const { orderId } = req.body; // Get the orderId from the request body

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required.' });
    }

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});
router.put('/update-profile', verifyJWT, async (req, res) => {
  const { phone, profilePic } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { phone, ProfileImage: profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
