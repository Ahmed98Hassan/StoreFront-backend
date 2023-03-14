# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `'api/products' [GET]`
- Show: `'/:product_order_id/' [GET]`
- Create (args: Product)[token required]: `'api/products' [POST] (token)`
- [ADDED] Delete: `'/:product_order_id/  [DELETE]`

#### Users
- Index [token required]: `'api/user' [GET] (token)`
- Show [token required]: `'api/user/:id' [GET] (token)`
- Create (args: User)[token required]: `'api/user' [POST] (token)`
- [ADDED] Delete [token required]: `'api/user/:id' [DELETE] (token)`

#### Orders
- Index [token required]: `'api/orders/:order_id' [GET] (token)`
- Current Order by user [token required]: `'api/orders/:order_id' [GET] (token)`
- [OPTIONAL] Completed Orders by user [token required]: `'api/orders/:order_id' [GET] (token)`
- [ADDED] Active Orders by user [token required]: `'api/orders/:order_id' [GET] (token)`
- [ADDED] Update order's status [token required]: `'api/orders/:order_id [PUT] (token)`
- [ADDED] Delete [token required]: `'api/orders/:order_id [DELETE] (token)`

## Data Shapes
#### Product
-  product_id
- product_name
- price

```
Table: Product (id:uuid_generate_v4, name:varchar(50)[not null], price:numeric[not null], category:varchar(50))
```
#### User
- user_id
- user_name
- first_name
- last_name
- password

```
Table: User (id:uuid_generate_v4, firstName:varchar(50)[not null], lastName:varchar(50)[not null], password:varchar(60)[not null])
```
#### Orders
- order_id
- order_status
- user_id
#### products_orders
- product_order_id
- product_id
- order_id uuid
- quantity
```
Table: Orders (id:uuid_generate_v4, product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])
```
