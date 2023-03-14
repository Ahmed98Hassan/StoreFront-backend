import pool from '../database/index'
import products from '../types/products'

class product {
  //create a new product
  async createProduct(product: products): Promise<products> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `INSERT INTO products (product_name, price)
        VALUES ($1, $2) RETURNING *`
      // run query
      const result = await database.query(databaseSql as string, [
        product.product_name,
        product.price
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `cant't create the product:(${
          product.product_name
        }) because:  ${(error as Error).message}`
      )
    }
  }
  //get all products
  async getAllProducts(): Promise<products[]> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `SELECT * FROM products`
      // run query
      const result = await database.query(databaseSql)
      // release connection
      database.release()
      // resulte
      return result.rows
    } catch (error) {
      throw new Error(
        `can't get all product${(error as Error).message}`
      )
    }
  }

  //get one product
  async getOneProduct(product_id: string): Promise<products> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `SELECT  product_id, product_name, price FROM products WHERE product_id=$1 `
      // run query
      const result = await database.query(databaseSql, [product_id])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't get the product ${(error as Error).message}`
      )
    }
  }

  //update one product
  async updateOneProduct(product: products): Promise<products> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `UPDATE products set (product_name, price) = 
      ($1,$2) WHERE product_id=$3 RETURNING *`
      // run query
      const result = await database.query(databaseSql as string, [
        product.product_name,
        product.price,
        product.product_id
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't get the product: ${(error as Error).message}`
      )
    }
  }

  //delete one product
  async deleteOneProduct(product_id: string): Promise<products> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `DELETE FROM products WHERE product_id=($1) RETURNING product_id, product_name, price  `
      // run query
      const result = await database.query(databaseSql, [product_id])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't delet because : ${(error as Error).message}`
      )
    }
  }
}

export default product
