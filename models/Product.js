const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  count: {
    type: Number,
    required: true,
    min: 0
  }
});


const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: ratingSchema,
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
