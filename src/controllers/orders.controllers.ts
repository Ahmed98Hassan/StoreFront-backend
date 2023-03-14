import { Request, Response, NextFunction } from 'express'
import requestElement from '../models/orders.model'

const OrderModel = new requestElement()

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await OrderModel.createOrder(req.body)
    res.json({
      status: 'sucsees',
      data: { ...product },
      message: 'The order has been created'
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.getAllOrders()
    res.json({
      status: 'sucsees',
      data: { ...orders },
      message: 'Requests received successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.getOneOrder(
      req.params.order_id as string
    )
    res.json({
      status: 'sucsees',
      data: { ...order },
      meesage: 'The order has been received'
    })
  } catch (error) {
    next(error)
  }
}

export const updateOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.updateOneOrder(req.body)
    res.json({
      status: 'sucsees',
      data: { order },
      message: 'The order has been updated'
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOneOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderModel.deleteOneOrder(
      req.params.order_id as unknown as string
    )
    res.json({
      status: 'sucsees',
      data: { ...order },
      message: 'The order has been deleted'
    })
  } catch (error) {
    next(error)
  }
}
