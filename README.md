# Restfully

REST API (simulation) with JWT for supporting online grocery store

## API Overview
All endpoints results are in JSON format. Folder structure follows MVC pattern, and the default port for REST API is _:4050_. This readme file will include some sample of returned values, either with true or false value.

In order to consume Restfully please follow these steps:
1. Create new user via `POST http://localhost:4050/api/users/signup` or (see [Create new user](#create-new-user) ) with email and password of your choice
2. On route `POST http://localhost:4050/api/users/login` (see [Login user](#login-user) ) you will obtain token, and you can use this token to access protected route. Token is meant to be passed in header i.e. `Authorization: Bearer <example.token.jwt>`.

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
  "info": "List of All Endpoints",
  "user_routes": {
      list of all user routes
   },
  "product_routes": {
      list of all product routes
  },
  "order_routes": {
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

Returns: _(example with truthy value and status code 200 OK)_
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

Returns: _(example with false value and status code 422 Unprocessable Entity)_
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
userId | `string` |
token | `string` |

Returns: _(example with truthy value and status code 200 OK)_
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

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
   "count": "<example_number>",
   "products": [
     {},
     {}
   ]
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
token | `string` |

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
   "_id": "5ba512487188161d20ac7e0c",
   "name": "Blueberry",
   "price": 2000,
   "productImage": "<example.png>"
}
```
#### Single product
```
GET /api/products/:productId
```
Parameters

Name | Type |
--- | --- |
productId | `string` |

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
  "success": true,
  "product": {
    "_id": "5ba512487188161d20ac7e0c",
    "name": "Blueberry",
    "price": 2000,
    "created_at": "21st/Sep/2018 17:46:16"
  },
  "description": {
    "type": "GET",
    "url": "http://localhost:4050/",
    "info": "Fetched all the details about Blueberry product"
  }
}
```
#### Update product
```
PATCH /api/products/:productId
```
Parameters

Name | Type |
--- | --- | --- |
name | `string` | optional |
price | `number` | optional |
token | `string` |

Returns: _(example with falsy value and status code 500 Server error)_
``` javascript
{
    "success": false,
    "error": "Cast to number failed for value \"<example value for field price>" at path \"price\""
}
```
#### Delete product
```
DELETE /api/products/:productId
```
Parameters

Name | Type |
--- | --- |
productId | `string` |
token | `string` |

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
  "success": true,
  "message": "Product deleted"
}
```

### Orders

#### List orders
```
GET /api/orders
```
Parameters

Name | Type |
--- | --- |
token | `string` |

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
    "count": 11,
    "sum_of_quantity": 162,
    "orders": [
      {},
      {}
    ]
}
```
#### Create new order
```
POST /api/orders
```
Parameters

Name | Type |
--- | --- | --- |
token | `string` |
productId | `string` |
quantity | `number` | optional

Returns: _(example with falsy value and status code 500 Server error)_
``` javascript
{
  "success": false,
  "message": "Product not found, please enter the valid product id"
}
```
#### Single order
```
GET /api/orders/:orderId
```
Parameters

Name | Type |
--- | --- | --- |
token | `string` |
orderId | `string` |

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
    "success": true,
    "quantity": 15,
    "product_id": "5ba511547188161d20ac7e0a",
    "description": {
        "order": {
            "type": "GET",
            "info": "Fetched all the details about order 5ba543c0300c941dc87c4863"
        },
        "product": {
            "type": "GET",
            "info": "Fetched all the details about product 5ba511547188161d20ac7e0a",
            "url": "http://localhost:4050/api/products/5ba511547188161d20ac7e0a"
        }
    }
}
```
#### Delete order
```
GET /api/orders/:orderId
```
Parameters

Name | Type |
--- | --- | --- |
token | `string` |
orderId | `string` |

Returns: _(example with truthy value and status code 200 OK)_
``` javascript
{
    "success": true,
    "message": "Order 5ba543c0300c941dc87c4863 deleted"
}
````
### TODO
- [ ] Implement cookie-parser with JWT
- [ ] Implement `csruf` package
