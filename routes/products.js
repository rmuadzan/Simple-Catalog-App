const router = require('express').Router();
const {
  getAllProducts,
  addProduct,
  getProductById,
  getEditProduct,
  updateProductById,
  deleteProductById,
  getAddProduct,
} = require('../controllers/products');

router.route('/').get(getAllProducts).post(addProduct);
router.route('/add').get(getAddProduct);
router.route('/:id').get(getProductById).put(updateProductById).delete(deleteProductById);
router.route('/:id/edit').get(getEditProduct);

module.exports = router;
