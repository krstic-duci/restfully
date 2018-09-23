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
          email: '{String} -> required',
          password: '{String} -> required'
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
          email: '{String} -> required',
          password: '{String} -> required'
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
          userId: '{String} -> required'
        },
        protected_route: 'yes',
        returned_values: {

        }
      }
    },
    product_routes: {
      get: {
        type: 'GET',
        endpoint: 'http://localhost:4050/api/products',
        description: 'List of all products',
        params: {

        },
        protected_route: 'no',
        returned_values: {
          count: '<example_number>',
          products: [
            {},
            {}
          ]
        }
      },
      create: {
        type: 'POST',
        endpoint: 'http://localhost:4050/api/orders',
        description: 'Create new order',
        params: {
          token: 'required',
          name: '{String} -> required',
          price: '{Number} -> required',
          productImage: '{File} -> optional'
        },
        protected_route: 'yes',
        returned_values: {
          _id: '<1>',
          name: '<example>',
          price: '<example>',
          productImage: '<example>'
        }
      },
      getSingleProduct: {
        type: 'GET',
        endpoint: 'http://localhost:4050/api/products/:productId',
        description: 'Fetch all data for a product',
        params: {
          productId: '{String} -> required'
        },
        protected_route: 'no',
        returned_values: {
          product: {
            _id: '<1>',
            name: '<example>',
            price: '<example>'
          }
        }
      },
      patchSingleProduct: {
        type: 'PATCH',
        endpoint: 'http://localhost:4050/api/orders',
        description: 'Update order',
        params: {
          token: 'required',
          name: '{String} -> optional',
          price: '{Number} -> optional'
        },
        protected_route: 'yes',
        returned_values: {
          info: 'Depends on params...'
        }
      },
      removeSingleProduct: {
        type: 'DELETE',
        endpoint: 'http://localhost:4050/api/orders/:orderId',
        description: 'Delete order',
        params: {
          token: 'required',
          orderId: '{String} -> required'
        },
        protected_route: 'yes',
        returned_values: {
        }
      }
    },
    order_routes: {
      get: {
        type: 'GET',
        endpoint: 'http://localhost:4050/api/orders',
        description: 'List of all orders',
        params: {
          token: 'required'
        },
        protected_route: 'yes',
        returned_values: {
          count: '<example_number>',
          sum_of_quantity: '<example_number>',
          orders: [
            {},
            {}
          ]
        }
      },
      create: {
        type: 'POST',
        endpoint: 'http://localhost:4050/api/orders',
        description: 'Create new order',
        params: {
          token: 'required',
          productId: '{String} -> required'
        },
        protected_route: 'yes',
        returned_values: {
          _id: '<1>',
          quantity: '<example_number>',
          product: '<example_product_id>'
        }
      },
      getSingleOrder: {
        type: 'GET',
        endpoint: 'http://localhost:4050/api/orders/:orderId',
        description: 'Fetch data about single order',
        params: {
          token: 'required',
          orderId: '{String} -> required'
        },
        protected_route: 'yes',
        returned_values: {
          order_id: '<1>',
          product_desc: {
            _id: '<1>',
            name: '<example>'
          }
        }
      },
      removeSingleOrder: {
        type: 'DELETE',
        endpoint: 'http://localhost:4050/api/orders/:orderId',
        description: 'Delete order',
        params: {
          token: 'required',
          orderId: '{String} -> required'
        },
        protected_route: 'yes',
        returned_values: {

        }
      }
    }
  });
};

module.exports = listOfEndpoints;
