if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const connectDB = require('./db/connect');
const Product = require('./models/Product');
const fetch = require('node-fetch');

const getProducts = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    
    const product = await fetch('https://dummyjson.com/products?limit=100');
    const result = await product.json();

    for(let i = 0; i < result.products.length; i++) {
      const fPrice = result.products[i].discountPercentage > 0 ? (result.products[i].price - ((result.products[i].price * result.products[i].discountPercentage) / 100)).toFixed(2) : result.products[i].price;
      await Product.insertMany(result.products[i])
      await Product.findOneAndUpdate({ id: result.products[i].id}, {fPrice});
    }
    console.log('success')
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
};

getProducts();
