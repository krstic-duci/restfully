const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.get);
router.post('/', ordersController.create);

router.get('/:orderId', ordersController.getSingleOrder);
router.delete('/:orderId', ordersController.removeSingleOrder);

module.exports = router;
