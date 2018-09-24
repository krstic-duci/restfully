# Restfully

> REST API (simulation) with JWT for supporting online grocery store

## API Overview
All endpoints results are in JSON format. Folder structure follows MVC pattern, and the default port for REST API is _:4050_. 

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
GET /api/users/login
```
Parameters

Name | Type |
--- | --- |
*GET* | `/api/` |

#### Create new user
```
GET /api/users/signup
```
Parameters

#### Remove user
```
GET /api/users/:userId
```
Parameters

### Products

#### List all products

#### Create new product

#### Single product

#### Update product

#### Delete product


### Orders

#### List orders

#### Create new order

#### Single order

#### Delete order
