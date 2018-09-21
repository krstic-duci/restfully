const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../util/multerConfig');

router.get('/', productsController.get);
router.post('/', upload.single('productImage'), productsController.create);

router.get('/:productId', productsController.getSingleProduct);
router.patch('/:productId', productsController.patchSingleProduct);
router.delete('/:productId', productsController.removeSingleProduct);

module.exports = router;
