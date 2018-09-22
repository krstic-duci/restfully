const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middleware/multerConfig');
const auth = require('../middleware/auth');

router.route('/')
  .get(productsController.get)
  .post(auth, upload.single('productImage'), productsController.create);

router.route('/:productId')
  .get(productsController.getSingleProduct)
  .patch(auth, productsController.patchSingleProduct)
  .delete(auth, productsController.removeSingleProduct);

module.exports = router;
