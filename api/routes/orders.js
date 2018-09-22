const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const auth = require('../middleware/auth');

router.route('/')
  .get(auth, ordersController.get)
  .post(auth, ordersController.create);

router.route('/:orderId')
  .get(auth, ordersController.getSingleOrder)
  .delete(auth, ordersController.removeSingleOrder);

module.exports = router;
