const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

const User = require('../models/User');

router.get('/products', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.json({ totalProducts });
  } catch (error) {
    console.error('Error Total products:', error);
    res.status(500).json({ error: 'Server was under maintenence' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error('Error Total users:', error);
    res.status(500).json({ error: 'Server was under maintenence' });
  }
});
router.get('/order', async (req, res) => {
  try {
    const totalOrder = await Order.countDocuments();
    res.json({ totalOrder });
  } catch (error) {
    console.error('Error Total order:', error);
    res.status(500).json({ error: 'Server was under maintenence' });
  }
});

module.exports = router;