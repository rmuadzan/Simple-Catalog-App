const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number, 
    required: [true, 'product price must be provided'],
  }, 
  discountPercentage: {
    type: Number,
    default: 0,
  },
  fPrice: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 4,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  images: {
    type: Array,
  }
}, { timestamps:true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
