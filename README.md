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
          pepperoni: {
              name: "pepperoni",
              price: 1.5
          },
          tomatoes: {
              name: "tomatoes",
              price: 1.45
          },
          anchovies: {
              name: "anchovies",
              price: 2
          }
      },
      sizes: {
          medium: {
              name: "medium",
              price: 15
          },
          large: {
              name: "large",
              price: 20
          },
          king: {
              name: "king",
              price: 24
          }
      }
  },
  session: {
      current_user:{
          username: "admin1",
          isAdmin: "true"
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
+ `GET /api/sizes` - returns index of sizes (admin)
+ `PUT /api/sizes/:id` - updates a size's information (admin)
+ `DELETE /api/sizes/:id` deletes a size
---
## Frontend Routes
+ `/login`
+ `/signup`
+ `/users/:userId` - user profile
+ `/admin` - admin dashboard
+ `/order` - order a pizza
