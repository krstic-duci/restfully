const mongoose = require('mongoose');
const chalk = require('chalk');
const Product = require('../models/Products');

const get = (req, res, next) => {
  Product.find()
    .then(docs => {
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        console.error(chalk.black.bgRed(err));
        res.status(422).json({error: 'No data found in the DB!'});
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({error: err.message});
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
      console.log(result);
      res.status(201).json({
        success: true, 
        message: 'Handling POST requests to /products'
      });
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({error: err.message});
    });
};

const getSingleProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: 'No valid entry found in DB'});
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({error: err.message});
    });
};

const patchSingleProduct = (req, res, next) => {
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Product.updateOne({_id: req.params.productId}, {$set: updateOps})
  .then(resultPatch => {
    res.status(200).json(resultPatch);
  })
  .catch(err => {
    console.error(chalk.black.bgRed(err));
    res.status(500).json({error: err.message});
  });
};

const removeSingleProduct = (req, res, next) => {
  Product.findByIdAndRemove({
    _id: req.params.productId
  })
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.error(chalk.black.bgRed(err));
    res.status(500).json({error: err.message});
  });
};


module.exports = {
  get,
  create,
  getSingleProduct,
  patchSingleProduct,
  removeSingleProduct
};
