const mongoose = require('mongoose');
const chalk = require('chalk');
const Product = require('../models/Products');

/**
 * @description List all products
 * @returns {JSON}
 */
const get = (req, res, next) => {
  Product.find()
    .select('-__v')
    .exec()
    .then(docs => {
      let checkForProductImg;
      const listOfProducts = {
        count: docs.length,
        products: docs.map(doc => {
          if (!doc.productImage) {
            checkForProductImg = '';
          } else {
            checkForProductImg = `http://localhost:4050/${doc.productImage}`;
          }
          return {
            name: doc.name,
            price: doc.price,
            productImage: checkForProductImg,
            _id: doc._id,
            description: {
              type: 'GET',
              url: `http://localhost:4050/api/products/${doc._id}`,
              info: `Fetch the data about single ${doc.name} product`
            }
          };
        })
      };
      if (docs.length >= 0) {
        res.status(200).json(listOfProducts);
      } else {
        console.error(chalk.black.bgRed('No data found in the DB!'));
        res.status(422).json({success: false, error: 'No data found in the DB!'});
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

/**
 * @description Create new order
 * @param {String} name
 * @param {String} price
 * @param {String} productImage
 * @returns {JSON}
 */
const create = (req, res, next) => {
  let checkFilePath;
  if (!req.file) {
    checkFilePath = '';
  } else {
    checkFilePath = req.file.path;
  }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: checkFilePath
  });
  product.save()
    .then(result => {
      res.status(201).json({
        success: true,
        created_product: {
          name: result.name,
          price: result.price,
          _id: result._id,
          description: {
            type: 'POST',
            info: `Create a new ${result.name} product`,
            created_at: req.app.locals.format(new Date(), 'Do/MMM/YYYY HH:mm:ss')
          }
        }
      });
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

/**
 * @description Find a single product by ID and list all of the details
 * @param {String} productId
 * @returns {JSON}
 */
const getSingleProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .select('-__v')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          success: true,
          product: {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            created_at: req.app.locals.format(doc.created_at, 'Do/MMM/YYYY HH:mm:ss')
          },
          description: {
            type: 'GET',
            url: 'http://localhost:4050/',
            info: `Fetched all the details about ${doc.name} product`
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
 * @description Find a single product by ID and update it (either name or price)
 * @param {String} productId
 * @param {Object} name
 * @param {Object} price
 * @returns {JSON}
 */
const patchSingleProduct = (req, res, next) => {
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Product.updateOne({_id: req.params.productId}, {$set: updateOps})
    .exec()
    .then(resultPatch => {
      res.status(200).json({
        success: true,
        message: 'The product has been updated'
      });
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

/**
 * @description Find a single product by ID and remove it from DB
 * @param {String} productId
 * @returns {JSON}
 */
const removeSingleProduct = (req, res, next) => {
  Product.findByIdAndRemove({_id: req.params.productId})
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!'
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
  getSingleProduct,
  patchSingleProduct,
  removeSingleProduct
};
