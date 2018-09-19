const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.get);
router.post('/', productsController.create);

router.get('/:productId', productsController.getSingleProduct);
router.patch('/:productId', productsController.patchSingleProduct);
router.delete('/:productId', productsController.removeSingleProduct);

module.exports = router;
