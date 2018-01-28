
Pizza Pizza is a pizza ordering application built with a Node.js backend and a React.js front end.

How to set up the project:
  set database credentials in dbConfig.js
  make sure mysql is running
  open a terminal in the project root
  run the following commands:
       node createDatabase.js
       node seed.js
       node app.js
       
  The default admin account is username: admin, password: password

# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | varchar 30| not null, indexed, unique |            
| `password_digest` | varchar 60| not null                  |
| `session_token`   | varchar 24| not null, indexed, unique |
| `is_admin`        | bool      | not null                  | 
  
## `sizes`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `price`              | decimal   | not null                       |
| `name`               | varchar 30| not null                       |

## `toppings`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | varchar 30| not null                       |
| `price`              | decimal   | not null                       |

# Redux Sample State Shape

````js
{
  entities: {
      toppings: {
          2: {
              name: "pepperoni",
              price: 1.5
          },
          4: {
              name: "tomatoes",
              price: 1.45
          },
          8: {
              name: "anchovies",
              price: 2
          },
          23: {
              name: "a boot",
              price: 99
          }
      },
      sizes: {
          1: {
              name: "medium",
              price: 15
          },
          3: {
              name: "large",
              price: 20
          },
          4: {
              name: "king",
              price: 24
          }
      }
  },
  session: {
      current_user:{
          username: "admin1",
          isAdmin: "true"
      },
      cart:{
          pizzas:[
            {size: 1, toppings: [2]},
            {size: 3, toppings: [3, 4]}            
          ]
      }
  }
}
````
# Routes

## API Endpoints

### `users`
+ `GET /api/users/:id` - returns the information for a user
+ `POST /api/users` - sign up

### `session`
+ `POST /api/session` - signs in a user
+ `DELETE /api/session` - signs out a user

### `toppings`
+ `POST /api/toppings` - create a topping (admin)
+ `DELETE /api/toppings/:id` - deletes a topping (admin)
+ `PUT /api/toppings/:id` - updates a topping's information (admin)
+ `GET /api/toppings/` - returns index of toppings

### `sizes`
+ `POST /api/sizes` - create a new size (admin)
+ `GET /api/sizes` - returns index of sizes 
+ `PUT /api/sizes/:id` - updates a size's information (admin)
+ `DELETE /api/sizes/:id` deletes a size (admin)
---
## Frontend Routes
+ `/login`
+ `/signup`
+ `/users/:userId` - user profile
+ `/admin` - admin dashboard
+ `/order` - order a pizza

## Functional Component Hierarchy
* Root
  * App
    * NavBar
    * Main Content

### NavBar
  * Nav Links
  * Components: 
    * SessionButtonsContainer + SessionButtons
      * store: _session.current\_user_

### Main Content
  * hash router

#### **Note** : All other components are nested within Main Content

### Order
  * PizzaDisplayContainer + PizzaDisplay
  * PizzaOptionsContainer + PizzaOptions 

### Cart
  * CartInforContainer + CartInfo 

### Profile
  * Protected Route
  * UserShowContainer + UserShow
    * Route: /#/users/:id
    * store: _session.current\_user_ 

### Dashboard
  * Protected Admin Route
