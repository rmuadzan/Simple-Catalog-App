const Product = require('../models/Product');

const getSearchedProduct = async (req, res) => {
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
  
  res.status(200).render('searchProducts', { products: result, title });
};

module.exports = { getSearchedProduct };
