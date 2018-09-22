const mongoose = require('mongoose');
const chalk = require('chalk');
const Order = require('../models/Orders');
const Product = require('../models/Products');

/**
 * @description Fetch the data for Order collection
 * @returns {JSON}
 */
const get = (req, res, next) => {
  let resOfQuantity; // store the sum of all quantity
  /**
   * @description Get the Order collection and count the total sum of orders
   * @returns {Number}
   */
  Order.aggregate(
    [{
      $group: {
        _id: null,
        sum_of_quantity: {
          $sum: '$quantity'
        }
      }
    }],
    (err, result) => {
      if (err) {
        throw err;
      }
      resOfQuantity = result[0].sum_of_quantity;
      /**
       * @description Find all orders
       * @returns {JSON}
       */
      Order.find()
        .select('-__v')
        .populate('product', 'name _id')
        .exec()
        .then(orders => {
          const listOfOrders = {
            count: orders.length,
            sum_of_quantity: resOfQuantity,
            orders: orders.map(order => {
              return {
                order_id: order._id,
                product_desc: order.product,
                description: {
                  type: 'GET',
                  info: 'Fetch the data about single order',
                  url: `http://localhost:4050/api/orders/${order._id}`
                }
              };
            })
          };
          if (orders.length >= 0) {
            res.status(200).json(listOfOrders);
          } else {
            console.error(chalk.black.bgRed(err));
            res.status(422).json({success: false, error: 'No data found in the DB!'});
          }
        })
        .catch(err => {
          console.error(chalk.black.bgRed(err));
          res.status(500).json({success: false, error: err.message});
        });
    }
  );
};

/**
 * @description Create new order
 * @returns {JSON}
 */
const create = (req, res, next) => {
  /**
   * @description Find the product, and if the product exists only then create new order
   * @returns {Promise}
   */
  Product.findById(req.body.productId)
    .exec()
    .then(product => {
      if (!product) {
        return res.status(422).json({
          success: false,
          message: 'Product not found, please enter the valid product id'
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      /**
       * @description Save the new order into DB
       * @returns {JSON}
       */
      order.save()
        .then(order => {
          // If quantity get passed with falsy value
          // assign response
          if (!order.quantity) {
            console.error(chalk.black.bgRed('Quantity cannot have falsy value'));
            return res.status(500).json({success: false, message: 'Quantity cannot have falsy value'});
          }
          res.status(201).json({
            success: true,
            created_order: {
              order_id: order._id,
              product_id: order.product,
              quantity: order.quantity,
              description: {
                type: 'POST',
                info: `Created a new order`,
                created_at: req.app.locals.format(new Date(), 'Do/MMM/YYYY HH:mm:ss')
              }
            }
          });
        })
        .catch(err => {
          console.error(chalk.black.bgRed(err));
          res.status(500).json({success: false, message: 'Product cannot be saved'});
        });
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, message: 'Please make sure you passed a valid (string) product id'});
    });
};

/**
 * @description Get the single order collection
 * @returns {JSON}
 */
const getSingleOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select('-__v')
    .exec()
    .then(order => {
      if (order) {
        res.status(200).json({
          success: true,
          quantity: order.quantity,
          product_id: order.product,
          description: {
            order: {
              type: 'GET',
              info: `Fetched all the details about order ${order._id}`
            },
            product: {
              type: 'GET',
              info: `Fetched all the details about product ${order.product}`,
              url: `http://localhost:4050/api/products/${order.product}`
            }
          }
        });
      } else {
        res.status(422).json({
          success: false,
          message: 'No valid entry found in DB'
        });
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};
/**
 * @description Delete the order document by orderId
 * @param {String} 'orderId'
 */
const removeSingleOrder = (req, res, next) => {
  Order.findByIdAndRemove(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(422).json({
          success: false,
          message: 'Order not found, please enter the valid order id'
        });
      }
      res.status(200).json({
        success: true,
        message: `Order ${order._id} deleted`
      });
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

module.exports = {
  get,
  create,
  getSingleOrder,
  removeSingleOrder
};
