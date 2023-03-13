# p2-cms-integration-server
CMS Integration - Server

# IMPORTANT NOTE!!
## Authorization 
### You can enter edit form even you're not Admin or the owner of product, but you will get warning message when you tried to edit and submit the products that is not yours.
### You will get warning authorization message when you tried to delete products that is not yours (Except your role is Admin)
## PLEASE CHECK CHECK.md
## Thank you

# List of available data
- `Users`
- `Categories`
- `Products`
- `Others`

## Endpoints Users

List of Available Users Endpoints:
- `GET /users`
- `GET /users/:id`
- `GET /users/find`
- `POST /users`
- `DELETE /users/:id`

### GET /users
#### Description
- Get all the users data

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "users": [
        {
            "username": String,
            "email": String,
            "address": String,
        }, {
            "username": String,
            "email": String,
            "address": String,
        }
        ...
     ]
  }
  ```

### GET /users/:id
#### Description
- Get the data of specific user

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "users": 
        {
            "username": String,
            "email": String,
            "address": String,
        }
  }
  ```

_404 - not found_

- Body
  ```json
  {
      "statusCode": 404,
      "message": "User is not exist"
  }
  ```

### GET /users/:find
#### Description
- Get the data of who is currently log in in client side after authentication

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "users": 
        {
            "username": String,
            "email": String,
            "address": String,
        }
  }
  ```

### POST /users
#### Description
- Create a new user data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
      "role": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "user": {
        "id": Integer,
        "username": String,
        "email": String,
        "password": String,
        "role": String,
        "phoneNumber": String,
        "address": String,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for username is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": 
        {
          "username is empty"
        }
  }
    ```

### DELETE /users/:id
#### Description
- Remove a user data based on given id

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "<entity username> succes to delete"
    }
    ```
_404 - Not Found_
- Body
    ```json
  {
      "statusCode": 404,
      "message": "User is not exist"
  }
    ```


## Endpoints Categories

List of Available Categories Endpoints:
- `GET /categories`
- `GET /categories/:id`
- `PUT /categories/:id`
- `POST /categories`
- `DELETE /categories/:id`

### GET /categories
#### Description
- Get all the categories data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```
#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "categories": [
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          ...
      ]
  }
  ```
  
### GET /categories/:id
#### Description
- Get the data of specific category

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "categories": 
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          }
  }
  ```
  _404 - Not Found_

  ```json
  {
    "statusCode": 404,
    "message": "Category is not exist"
  }
  ```

### PUT /categories/:id
#### Description
- Update the data of specific category

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_


  ```json
  {
      "statusCode": 200,
      "histories": 
          {
              "name": String,
              "description": String,
              "updatedBy": String
          }
  }
  ```
  _404 - Not Found_

  ```json
  {
    "statusCode": 404,
    "message": "Category is not exist"
  }
  ```
  _400 - Bad Request_ 
- Body
  
  example for name is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": 
      {
          "name cannot empty"
      }
  }
    ```


### POST /categories
#### Description
- Create a new category data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
- Body
    ```json
    {
      "name": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "categories": {
        "id": Integer,
        "name": String,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for name is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": 
      {
          "name cannot empty"
      }
  }
    ```

### DELETE /categories/:id
#### Description
- Remove a category data based on given id

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    {
      "statusCode": 200,
      "message": "<entity category name> succes to delete"
    }
    ```
_404 - Not Found_
- Body
    ```json
  {
      "statusCode": 404,
      "message": "Category is not exist"
  }
    ```



## Endpoints Products

List of Available Products Endpoints:
- `GET /products`
- `GET /products/:id`
- `PUT /products/:id`
- `PATCH /products/:id`
- `POST /products`
- `DELETE /products/:id`

### GET /products
#### Description
- Get all the products data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": [
          {
              "id": Integer,
              "name": String,
              "description": Text,
              "price": Integer,
              "stock": Integer,
              "imgUrl": String,
              "categoryId": Integer,
              "authorId": Integer,
              "createdAt": Date,
              "updatedAt": Date
          },
          {
              "id": Integer,
              "name": String,
              "description": Text,
              "price": Integer,
              "stock": Integer,
              "imgUrl": String,
              "categoryId": Integer,
              "authorId": Integer,
              "createdAt": Date,
              "updatedAt": Date
          }
          ...
      ]
  }
  ```

### GET /products/:id
#### Description
- Get the specific data of product

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": 
          {
              "id": Integer,
              "name": String,
              "description": Text,
              "price": Integer,
              "stock": Integer,
              "imgUrl": String,
              "categoryId": Integer,
              "authorId": Integer,
              "createdAt": Date,
              "updatedAt": Date
          }
  }
  ```
_404 - Not Found_
```json
{
    "statusCode": 404,
    "message": "Product is not exist"
}
```

### PUT /products/:id
#### Description
- Update the specific data of product

#### Request
#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```
- Body
    ```json
    {
      "name": String,
      "description": Text,
      "price": Integer,
      "stock": Integer,
      "imageUrl": String,
      "authorId": Integer,
      "categoryId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "Product": {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for name is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": 
        {
          "name cannot be empty"
        }
  }
    ```

### PATCH /products/:id
#### Description
- Update the specific data of product status

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "histories": 
          {
              "name": String,
              "description": String,
              "updatedBy": String
          }
  }
  ```
_404 - Not Found_
```json
{
    "statusCode": 404,
    "message": "Product is not exist"
}
```

### POST /products
#### Description
- Create a new product data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "name": String,
      "description": Text,
      "price": Integer,
      "stock": Integer,
      "imageUrl": String,
      "authorId": Integer,
      "categoryId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "Product": {
        "id": Integer,
        "name": String,
        "description": String,
        "price": Integer,
        "stock": Integer,
        "imgUrl": String,
        "categoryId": Integer,
        "authorId": Integer,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for name is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": 
        {
          "name cannot be empty"
        }
  }
    ```

### DELETE /products/:id
#### Description
- Remove a product data based on given id

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    {
      "statusCode": 200,
      "message": "<entity product name> succes to delete"
    }
    ```
_404 - Not Found_
- Body
    ```json
  {
      "statusCode": 404,
      "message": "Product is not exist"
  }
    ```


## Endpoints Others

List of Available Others Endpoints:
- `GET /all`
- `GET /google-sign-in`
- `POST /users/login`
- `POST /users/register`
- `GET /histories`


### GET /all
#### Description
- Get all the available data of users, products and categories


#### Response
_200 - OK_

- Body
```json
{
    "statusCode": 200,
    "data": {
        "users": [
            {
                "username": String,
                "email": String,
                "address": String
            },
            ...
        ],
        "categories": [
            {
                "id": Integer,
                "name": String,
                "createdAt": Date,
                "updatedAt": Date
            },
            {
                "id": Integer,
                "name": String,
                "createdAt": Date,
                "updatedAt": Date
            }
            ...
        ],
        "products": [
            {
                "id": Integer,
                "name": String,
                "description": String,
                "price": Integer,
                "stock": Integer,
                "imgUrl": String,
                "categoryId": Integer,
                "authorId": Integer,
                "status": String,
                "createdAt": Date,
                "updatedAt": Date
            },
            ...
        ]
    }
}
```

### POST /google-sign-in
#### Description
- log in to homepage via google account

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "access_token": "eyJhbGc...."
  }
  ```

_201 - Created_

- Body
  ```json
  {
      "statusCode": 201,
      "access_token": "eyJhbGc...."
  }
  ```


### POST /users/login
#### Description
- log in to homepage

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
- Body
    ```json
    {
      "password": String,
      "email": String,
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 201,
      "message": "Log In Succes",
      "access_token": "eyJhbGc...."
  }
  ```

_401 - Not authorized_

- Body
  ```json
  {
      "statusCode": 401,
      "message": "Invalid email or password"
  }
  ```


### POST /users/register
#### Description
- Create a new user data for role Admin

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "user": {
        "id": Integer,
        "username": String,
        "email": String,
        "password": String,
        "role": String,
        "phoneNumber": String,
        "address": String,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

_400 - Bad Request_ 
- Body
  
  example for username is empty
    ```json
  {
      "statusCode": 400,
      "name": "Bad request",
      "message": [
          "username is empty"
      ]
  }
    ```

### GET /histories
#### Description
- Get all the history data

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": [
          {
              "id": Integer,
              "name": String,
              "description": String,
              "updatedBy": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          {
              "id": Integer,
              "name": String,
              "description": String,
              "updatedBy": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          ...
      ]
  }
  ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "message": "Internal Server Error"
    }
    ```

# p2-cms-integration-client
CMS Integration - Server

# List of available data
- `Pubs`

## Endpoints Customers

List of Available Users Endpoints:
- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-sign-in`
- `GET /pub/products`
- `GET /pub/products/:id`
- `GET /pub/categories`
- `GET /pub/categories/:id`
- `GET /pub/mybookmark`
- `POST /pub/bookmark/:id`
- `DELETE /pub/bookmark/:id`

### ENDPOINTS for pubs
#### Description
- All end point for customer service or public

### POST /pub/register
#### Description
- Create a new data for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
      "phoneNumber": String,
      "address": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "statusCode": 201,
      "user": {
        "id": Integer,
        "username": String,
        "email": String,
        "password": String,
        "role": String,
        "phoneNumber": String,
        "address": String,
        "updatedAt": Date,
        "createdAt": Date
      }
    }
    ```

- List of bad request respond
- `Email is empty`
- `Email is null`
- `Email format is not valid`
- `Password is less than 5 or more than 24`
- `Username is empty`
- `Username is already been registered (unique)`

_400 - Bad Request_ 
- Body
  
  example for username is empty
    ```json
  {
      "statusCode": 400,
      "message": "username is empty"
  }
    ```

### POST /pub/login
#### Description
- log in to homepage for customer

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
    }
- Body
    ```json
    {
      "password": String,
      "email": String,
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 201,
      "message": "Log In Succes",
      "access_token": "eyJhbGc....",
      "role": STRING
  }
  ```

- List of bad request respond
- `Email is empty`
- `Username is empty`

_400 - Bad Request_ 
- Body
  example for email is empty
  ```json
  {
      "statusCode": 201,
      "message": "Email is empty"
  }
  ```

_401 - Not authorized_

- Body
  ```json
  {
      "statusCode": 401,
      "message": "Invalid email or password"
  }
  ```

### POST /pub/google-sign-in
#### Description
- log in customer to homepage via google account

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```
#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "access_token": "eyJhbGc...."
  }
  ```

_201 - Created_

- Body
  ```json
  {
      "statusCode": 201,
      "access_token": "eyJhbGc...."
  }
  ```

### GET /pub/products
#### Description
- Get all the products data for customer to see

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": {
        "count": Integer,
        "rows": [
              {
                  "id": Integer,
                  "name": String,
                  "description": Text,
                  "price": Integer,
                  "stock": Integer,
                  "imgUrl": String,
                  "categoryId": Integer,
                  "authorId": Integer,
                  "createdAt": Date,
                  "updatedAt": Date,
                  "User": {
                    "username": String,
                    "email": String
                  },
                  "Category": {
                    "name": String
                  }
              },
              {
                  "id": Integer,
                  "name": String,
                  "description": Text,
                  "price": Integer,
                  "stock": Integer,
                  "imgUrl": String,
                  "categoryId": Integer,
                  "authorId": Integer,
                  "createdAt": Date,
                  "updatedAt": Date,
                  "User": {
                    "username": String,
                    "email": String
                  },
                  "Category": {
                    "name": String
                  }
              }
          ...
        ]
      }
  }
  ```

### GET /pub/products/:id
#### Description
- Get the specific data of product for customer

#### Response
_200 - OK_

- Body
  ```json
  {
      "statusCode": 200,
      "products": 
          {
              "id": Integer,
              "name": String,
              "description": Text,
              "price": Integer,
              "stock": Integer,
              "imgUrl": String,
              "categoryId": Integer,
              "authorId": Integer,
              "createdAt": Date,
              "updatedAt": Date,
              "User": {
                "username": String,
                "email": String
              },
              "Category": {
                "name": String
              },
              "qrCode": String
          }
  }
  ```
_404 - Not Found_
```json
{
    "statusCode": 404,
    "message": "Product is not exist"
}
```

### GET /pub/categories
#### Description
- Get all the categories data for customer

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "categories": [
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          },
          ...
      ]
  }
  ```
  
### GET /pub/categories/:id
#### Description
- Get the data of specific category 


#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "categories": 
          {
              "id": Integer,
              "name": String,
              "createdAt": Date,
              "updatedAt": Date
          }
  }
  ```
  _404 - Not Found_

  ```json
  {
    "statusCode": 404,
    "message": "Category is not exist"
  }
  ```

### POST /pub/bookmark/:id
#### Description
- Post product for customer to add their favorite products

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "message": "Bookmarking is success"
  }
  ```
_201 - Created_
- Body

  ```json
  {
      "message": "You have already bookmarked this product"
  }
  ```

### DELETE /pub/bookmark:id
#### Description
- Delete product in customer favorite list

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": STRING
    }
    ```

#### Response
_200 - OK_
- Body
  ```json
  {
      "statusCode": 200,
      "message": "Unbookmarking is success"
  }
  ```
_404 - Not Found_
- Body

  ```json
  {
      "message": "Bookmark is not found"
  }
  ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "statusCode": 500,
      "message": "Internal Server Error"
    }