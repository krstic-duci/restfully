/**
 *
 * @description Documentation
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON} Listed endpoints
 */
const listOfEndpoints = (req, res, next) => {
  res.status(200).json({
    success: true, 
    message: 'List of All Endpoints'
  });
};

module.exports = listOfEndpoints;
