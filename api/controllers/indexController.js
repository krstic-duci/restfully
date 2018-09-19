const listOfEndpoints = (req, res, next) => {
  res.status(200).json({
    success: true, 
    message: 'List of All Endpoints'
  });
};

module.exports = listOfEndpoints;
