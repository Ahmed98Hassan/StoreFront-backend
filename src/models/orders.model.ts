import pool from '../database/index'
import orders from '../types/orders'

class requestElement {
  //Create New Order
  async createOrder(order: orders): Promise<orders> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `INSERT INTO orders (order_status ,user_id)
        VALUES ($1,$2) RETURNING order_id, order_status, user_id `
      // run query
      const result = await database.query(databaseSql as string, [
        order.order_status,
        order.user_id
      ])
      // release connection
      database.release()
      // result
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can not to create (${order.order_id}):${
          (error as Error).message
        }`
      )
    }
  }

  //Get ALL Porders
  async getAllOrders(): Promise<orders[]> {
    try {
      // connection with database
      const connection = await pool.connect()
      const databaseSql = `SELECT * FROM orders`
      // run query
      const result = await connection.query(databaseSql)
      // release connection
      connection.release()
      // resulte
      return result.rows
    } catch (error) {
      throw new Error(
        `can not to get orders :${(error as Error).message}`
      )
    }
  }
  //Get One Order
  async getOneOrder(order_id: string): Promise<orders> {
    try {
      // connection with database
      const connection = await pool.connect()
      const databaseSql = `SELECT user_id, order_status , order_id FROM orders  WHERE order_id=($1)`
      // run query
      const result = await connection.query(databaseSql, [order_id])
      // release connection
      connection.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `sorry, can not get order : ${(error as Error).message}`
      )
    }
  }
  //update one order
  async updateOneOrder(order: orders): Promise<orders> {
    try {
      // connection with database
      const connection = await pool.connect()
      const databaseSql = `UPDATE orders set ( order_status, user_id) = 
        ($1,$2) WHERE order_id=$3  RETURNING *`
      const result = await connection.query(databaseSql as string, [
        order.order_status,
        order.user_id,
        order.order_id
      ])
      // release connection
      connection.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can not update order : ${(error as Error).message}`
      )
    }
  }
  //delete one order
  async deleteOneOrder(order_id: string): Promise<orders> {
    try {
      // connection with database
      const connection = await pool.connect()
      const databaseSql = `DELETE FROM orders WHERE order_id=$1 RETURNING *`
      // run query
      const result = await connection.query(databaseSql, [order_id])
      // release connection
      connection.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can not delete order : ${(error as Error).message}`
      )
    }
  }
}

export default requestElement
