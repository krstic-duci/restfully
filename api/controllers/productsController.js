const mongoose = require('mongoose');
const chalk = require('chalk');
const Product = require('../models/Products');

const get = (req, res, next) => {
  Product.find()
    .select('name price _id')
    .then(docs => {
      const listOfProducts = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: `http://localhost:4050/api/products/${doc._id}`,
              info: `Fetch the data about single ${doc.name} product`
            }
          }
        })
      };
      if (docs.length >= 0) {
        res.status(200).json(listOfProducts);
      } else {
        console.error(chalk.black.bgRed(err));
        res.status(422).json({success: false, error: 'No data found in the DB!'});
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

const create = (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save()
    .then(result => {
      res.status(201).json({
        success: true, 
        created_product: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
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

const getSingleProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .select('_id name price')
    .then(doc => {
      if (doc) {
        res.status(200).json({
          success: true,
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:4050/',
            info: `Fetch all products`
          }
        });
      } else {
        res.status(422).json({success: false, message: 'No valid entry found in DB'});
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

const patchSingleProduct = (req, res, next) => {
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Product.updateOne({_id: req.params.productId}, {$set: updateOps})
  .then(resultPatch => {
    res.status(200).json({success: true, message: 'The product has been updated'});
  })
  .catch(err => {
    console.error(chalk.black.bgRed(err));
    res.status(500).json({success: false, error: err.message});
  });
};

const removeSingleProduct = (req, res, next) => {
  Product.findByIdAndRemove({
    _id: req.params.productId
  })
  .then(result => {
    res.status(200).json({success:true, message: 'User deleted successfully!'});
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
