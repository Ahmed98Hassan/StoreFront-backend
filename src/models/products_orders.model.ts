import pool from '../database/index'
import products_orders from '../types/products_orders'

class products_ordersModel {
  //Create A new order Product
  async createProducts_orders(
    product_order: products_orders
  ): Promise<products_orders> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `INSERT INTO products_orders (product_id ,order_id,quantity)
        VALUES ($1,$2,$3) RETURNING * `
      // run query
      const result = await database.query(databaseSql as string, [
        product_order.product_id,
        product_order.order_id,
        product_order.quantity
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't create a many prodeuct:  ${(error as Error).message}`
      )
    }
  }
  //get all orders
  async getAllProducts_orders(): Promise<products_orders[]> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `SELECT * FROM products_orders`
      // run query
      const result = await database.query(databaseSql)
      // release connection
      database.release()
      // resulte
      return result.rows
    } catch (error) {
      throw new Error(`can't get it :${(error as Error).message}`)
    }
  }

  //get one order
  async getOneProducts_orders(
    product_order_id: string
  ): Promise<products_orders> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `SELECT * FROM products_orders WHERE product_order_id=$1  `
      // run query
      const result = await database.query(databaseSql, [
        product_order_id
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't get the order ${(error as Error).message}`
      )
    }
  }

  //update one order
  async updateProdcutsOrder(
    product_order: products_orders
  ): Promise<products_orders> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `UPDATE products_orders set ( product_id, order_id, quantity) = 
        ($1,$2,$3) WHERE product_order_id=$4  RETURNING *`
      // run query
      const result = await database.query(databaseSql as string, [
        product_order.product_id,
        product_order.order_id,
        product_order.quantity,
        product_order.product_order_id
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't update this because: ${(error as Error).message}`
      )
    }
  }
  //delete one order
  async deletePRoductsOrder(
    product_order_id: string
  ): Promise<products_orders> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `DELETE FROM products_orders WHERE product_order_id=$1 RETURNING *`
      // run query
      const result = await database.query(databaseSql, [
        product_order_id
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can't delete the products order baeause : ${
          (error as Error).message
        }`
      )
    }
  }
}

export default products_ordersModel
