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
