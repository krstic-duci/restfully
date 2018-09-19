const get = (req, res, next) => {
  res.status(200).json({
    success: true, 
    message: 'Handling GET requests to /orders'
  });
};

const create = (req, res, next) => {
  res.status(201).json({
    success: true, 
    message: 'Handling POST requests to /orders'
  });
};

const getSingleOrder = (req, res, next) => {
  const orderId = req.params.id;

  res.status(200).json({
    success: true, 
    message: 'Fetched single order',
    id: orderId
  });
};

const removeSingleOrder = (req, res, next) => {
  res.status(200).json({
    success: true, 
    message: 'Deleted order'
  });
};

module.exports = {
  get,
  create,
  getSingleOrder,
  removeSingleOrder
};
