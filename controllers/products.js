const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  const { brand, category, title, sort, sd } = req.query;
  const queryObject = {};
  if (brand) {
    queryObject.brand = brand;
  }
  if (category) {
    queryObject.category = category;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: 'i'};
  }
  
  let nP = 0
  let result = Product.find(queryObject);
  let sortList = '';
  
  if (sort || sd) {
    sortList = `${sort} ${sd}`;
  }

  result = await result.sort(sortList);
  nP = result.length;
  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const products = result.slice((skip), (limit * page));
  if (!(category || title) ) {
    nP = await Product.count();
  }
  const nPages = Math.ceil(nP / limit);

  res.status(200).render('allProducts', { products, nPages });
};

const getAddProduct = (req, res) => {
  res.status(200).render('addProduct')
}

const addProduct = async (req, res) => {
  let count = await Product.count();
  const lastProduct = await Product.find().skip(count - 1);

  req.body.id = lastProduct[0].id + 1;
  req.body.images.forEach((img, i) => {
    if(img.length < 1) {
      req.body.images.splice(i, 1);
    }
  });
  req.body.thumbnail || (req.body.thumbnail = 'https://www.sarras-shop.com/out/pictures/master/product/1/no-image-available-icon.jpg');
  req.body.fPrice = req.body.discountPercentage > 0 ? (req.body.price - ((req.body.price * req.body.discountPercentage) / 100)).toFixed(2) : req.body.price;

  const product = await Product.create(req.body);

  res.status(200).redirect(`products/${product.id}`);
};

const getProductById = async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ id });
  if(!product) {
    throw new Error(`Product is not available`);
  }
  res.status(200).render('detailProduct', { product });
};

const getEditProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ id });
  if(!product) {
    throw new Error(`Product is not available`);
  }
  res.status(200).render('editProduct', { product })
}

const updateProductById = async (req, res) => {
  const { id } = req.body;
  req.body.images.forEach((img, i) => {
    if(img.length < 1) {
      req.body.images.splice(i, 1);
    }
  })
  req.body.fPrice = req.body.discountPercentage > 0 ? (req.body.price - ((req.body.price * req.body.discountPercentage) / 100)).toFixed(2) : req.body.price;

  const product = await Product.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true });
  if(!product) {
    throw new Error(`Product is not available`);
  }

  res.status(200).redirect(`/products/${id}`);
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ id });

  if(!product) {
    throw new Error(`Product is not available`);
  }

  res.status(200).redirect('/products');
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  getEditProduct,
  updateProductById,
  deleteProductById,
  getAddProduct,
};