# Restfully

> REST API (simulation) with JWT for supporting online grocery store

## API Overview
All endpoints results are in JSON format. Folder structure follows MVC pattern, and the default port for REST API is _:4050_. This readme file will include some sample of returned values, either with true or false value. Token is meant to be passed in header or `Authorization: <example.token.jwt>`

## Endpoints

1. [List of all endpoints](#list-of-all-endpoints)
2. [User](#user-endpoint)
    1. [Login user](#login-user)
    2. [Create new user](#create-new-user)
    3. [Remove user](#remove-user)
3. [Products](#products)
    1. [List all products](#list-all-products)
    2. [Create new product](#create-new-product)
    3. [Grab single product](#single-product)
    4. [Update single product](#update-product)
    5. [Delete single product](#delete-product)
4. [Orders](#orders)
    1. [List orders](#list-orders)
    2. [Create new order](#create-new-order)
    3. [Grab single order](#single-order)
    4. [Delete single order](#delete-order)

### List of all endpoints

```
GET /api/
```

Parameters:

Name | Type | 
--- | --- | 
none | none |

Returns
``` javascript
{
  info: 'List of All Endpoints',
  user_routes: {
      list of all user routes
   },
  product_routes: {
      list of all product routes
  },
  order_routes: {
      list of all order routes
  }
}
```

### User endpoint

#### Login user
```
POST /api/users/login
```
Parameters

Name | Type |
--- | --- |
email | `string` |
password | `string` |

Returns
``` javascript
{
    "success": true,
    "message": "Auth successful",
    "token": "<example.token.jwt>"
}
```
#### Create new user
```
POST /api/users/signup
```
Parameters

Name | Type |
--- | --- |
email | `string` |
password | `string` |

Returns
``` javascript
{
    "success": false,
    "message": "Email already taken"
}
```

#### Remove user
```
DELETE /api/users/:userId
```
Parameters

Name | Type |
--- | --- |
email | `string` |
password | `string` |
token | `string` |

Returns
``` javascript
{
    "success": true,
    "message": "User deleted"
}
```

### Products

#### List all products
```
GET /api/products
```
Parameters

Name | Type |
--- | --- |
none | none |

Returns
``` javascript
{
  type: 'GET',
  endpoint: 'http://localhost:4050/api/products',
  description: 'List of all products',
  params: {},
  protected_route: 'no',
  returned_values: {
    count: '<example_number>',
    products: [
      {},
      {}
    ]
  }
}
```
#### Create new product
```
POST /api/products
```
Parameters

Name | Type | |
--- | --- | --- |
name | `string` |  |
price | `number` | 
productImage | `file` | optional |

Returns
``` javascript
{
  type: 'POST',
  endpoint: 'http://localhost:4050/api/products',
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
}
```
#### Single product
```
GET /api/products
```
Parameters

Name | Type |
--- | --- |
email | `string` |
password | `string` |
token | `string` |

Returns
``` javascript
{

}
```
#### Update product
```
GET /api/products
```
Parameters

Name | Type |
--- | --- |
email | `string` |
password | `string` |
token | `string` |

Returns
``` javascript
{

}
```
#### Delete product
```
GET /api/products
```
Parameters

Name | Type |
--- | --- |
email | `string` |
password | `string` |
token | `string` |

Returns
``` javascript
{

}
```

### Orders

#### List orders

#### Create new order

#### Single order

#### Delete order
