import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userModel from '../models/users.model'
import config from '../config'

const User = new userModel()

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.createUser(req.body)
    res.json({
      data: { user },
      message: 'A new user has been created successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.getAllUsers()
    res.json({
      data: { users },
      message: 'All users have been successfully added'
    })
  } catch (error) {
    next(error)
  }
}

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.getOneUser(
      req.params.user_id as unknown as string
    )
    res.json({
      data: { user },
      meesage: 'user Return successful '
    })
  } catch (error) {
    next(error)
  }
}

export const updateOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.updateOneUser(req.body)
    res.json({
      data: { user },
      message: 'user updat successful'
    })
  } catch (error) {
    next(error)
  }
}
export const deleteOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.deleteOneUser(
      req.params.user_id as unknown as string
    )
    res.json({
      data: { ...user },
      message: 'user is deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const authenticateOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_name, password } = req.body
    const user = await User.authenticateOneUser(user_name, password)
    const token = jwt.sign({ user }, config.token as string)
    if (!user) {
      return res.status(401).json({
        message: 'user name and password not match'
      })
    }
    res.json({
      data: { ...user, token },
      message:
        'user is authenticated successfully and the token is also provided '
    })
  } catch (error) {
    next(error)
  }
}
