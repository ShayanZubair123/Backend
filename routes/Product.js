const express = require('express');
const router = express.Router();
const adminController = require('../controller/Product');

// GET all products
router.get('/getAll', adminController.getAllProducts);

// POST create a new product
router.post('/create', adminController.createProduct);

// PUT update a product by ID
router.put('/update/:id', adminController.updateProduct);

// DELETE a product by ID
router.delete('/delete/:id', adminController.deleteProduct);

module.exports = router;
