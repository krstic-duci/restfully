/**
 * @description Documentation
 * @returns {JSON} Listed endpoints
 */
const listOfEndpoints = (req, res, next) => {
  res.status(200).json({
    info: 'List of All Endpoints',
    user_routes: {
      signUp: {
        type: 'POST',
        endpoint: 'http://localhost:4050/api/users/signup',
        description: 'Creates new user',
        params: {
          email: 'required',
          password: 'required'
        },
        protected_route: 'no',
        returned_values: {
          _id: '<1>',
          email: '<example@example.com>',
          password: '<example>'
        }
      },
      login: {
        type: 'POST',
        endpoint: 'http://localhost:4050/api/users/login',
        description: 'User login',
        params: {
          email: 'required',
          password: 'required'
        },
        protected_route: 'no',
        returned_values: {
          token: '<example.token.issue>'
        }
      },
      delete: {
        type: 'DELETE',
        endpoint: 'http://localhost:4050/api/users/:userId',
        description: 'Delete user',
        params: {
          token: 'required',
          userId: 'required'
        },
        protected_route: 'yes',
        returned_values: {

        }
      }
    },
    product_routes: {

    },
    order_routes: {

    }
  });
};

module.exports = listOfEndpoints;
