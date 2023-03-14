import pool from '../database/index'
import users from '../types/users'
import hashPassword from '../middleware/hashPassword.middleware'
import config from '../config'
import bcrypt from 'bcrypt'

class userModel {
  //create user
  async createUser(user: users): Promise<users> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `INSERT INTO users (user_name, first_name, last_name, password)
        VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, first_name, last_name`
      // run query
      const result = await database.query(databaseSql as string, [
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password)
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't create user_name:(${user.user_name}) because: ${
          (error as Error).message
        }`
      )
    }
  }

  //get all users
  async getAllUsers(): Promise<users[]> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `SELECT  user_id, user_name, first_name, last_name FROM users`
      // run query
      const result = await database.query(databaseSql)
      database.release()
      // release connection
      return result.rows
      // resulte
    } catch (error) {
      throw new Error(`can't get all user${(error as Error).message}`)
    }
  }

  //get one user
  async getOneUser(user_id: string): Promise<users> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `SELECT  user_id, user_name, first_name, last_name FROM users WHERE user_id=$1`
      // run query
      const result = await database.query(databaseSql, [user_id])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't get user from Db ${(error as Error).message}`
      )
    }
  }

  //update one user
  async updateOneUser(user: users): Promise<users> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `UPDATE users set ( user_name, first_name, last_name, password) = 
      ($1,$2,$3,$4) WHERE user_id=$5  RETURNING user_id, user_name, first_name, last_name`
      // run query
      const result = await database.query(databaseSql as string, [
        user.user_name,
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        user.user_id
      ])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `can't update user : ${(error as Error).message}`
      )
    }
  }

  //delete one user
  async deleteOneUser(user_id: string): Promise<users> {
    try {
      // connection with database
      const database = await pool.connect()
      const databaseSql = `DELETE FROM users WHERE user_id=$1 RETURNING user_id, user_name, first_name, last_name`
      // run query
      const result = await database.query(databaseSql, [user_id])
      // release connection
      database.release()
      // resulte
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Can not delete user baeause : ${(error as Error).message}`
      )
    }
  }

  //authenticate one user
  async authenticateOneUser(
    user_name: string,
    password: string
  ): Promise<users | null> {
    try {
      const connection = await pool.connect()
      const sql = `SELECT password FROM users WHERE user_name=$1`
      const result = await connection.query(sql, [user_name])
      connection.release()
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        )
        if (isValid) {
          const connection = await pool.connect()
          const dataUser = await connection.query(
            `
          SELECT user_id, user_name, first_name, last_name FROM users where user_name=$1`,
            [user_name]
          )
          connection.release()
          return dataUser.rows[0]
        }
      }
      return null
    } catch (error) {
      throw new Error(
        `Can not authenticate user baeause : ${
          (error as Error).message
        }`
      )
    }
  }
}

export default userModel
