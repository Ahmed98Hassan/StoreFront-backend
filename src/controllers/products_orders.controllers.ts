import { Request, Response, NextFunction } from 'express'
import products_ordersModel from '../models/products_orders.model'

const Products_OrdersModel = new products_ordersModel()

export const createProducts_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.createProducts_orders(
      req.body
    )
    res.json({
      status: 'sucsees',
      data: { ...prodOrd },
      message: 'The product has been created'
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.getAllProducts_orders()
    res.json({
      status: 'sucsees',
      data: { ...prodOrd },
      message: 'products received successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getOneProducts_orders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.getOneProducts_orders(
      req.params.product_order_id as unknown as string
    )
    res.json({
      status: 'sucsees',
      data: { ...prodOrd },
      meesage: 'The product has been received'
    })
  } catch (error) {
    next(error)
  }
}

export const updateProdcutsOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.updateProdcutsOrder(
      req.body
    )
    res.json({
      status: 'sucsees',
      data: { prodOrd },
      message: 'The product has been updated'
    })
  } catch (error) {
    next(error)
  }
}

export const deletePRoductsOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodOrd = await Products_OrdersModel.deletePRoductsOrder(
      req.params.product_order_id as unknown as string
    )
    res.json({
      status: 'sucsees',
      data: { ...prodOrd },
      message: 'The product has been deleted'
    })
  } catch (error) {
    next(error)
  }
}
