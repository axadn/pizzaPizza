# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | varchar 30| not null, unique, indexed |            
| `password_digest` | varchar 60| not null                  |
| `session_token`   | varchar 24| not null, indexed, unique |
  
## `sizes`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `size`               | integer   | not null                       |
| `price`              | decimal   | not null                       |
| `name`               | varchar 30| not null                       |

## `toppings`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | varchar 30| not null                       |
| `price`              | decimal   | not null                       |
