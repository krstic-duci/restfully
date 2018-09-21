const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.route('/')
  .get(ordersController.get)
  .post(ordersController.create);

router.route('/:orderId')
  .get(ordersController.getSingleOrder)
  .delete(ordersController.removeSingleOrder);

module.exports = router;
