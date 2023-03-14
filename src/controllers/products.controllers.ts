import { Request, Response, NextFunction } from 'express'
import product from '../models/products.model'

const ProductModel = new product()

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.createProduct(req.body)
    res.json({
      status: 'sucsees',
      data: { ...product },
      message: 'The product has been created'
    })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.getAllProducts()
    res.json({
      status: 'sucsees',
      data: { ...products },
      message: 'All products have been collected'
    })
  } catch (error) {
    next(error)
  }
}

export const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.getOneProduct(
      req.params.product_id as unknown as string
    )
    res.json({
      status: 'sucsees',
      data: { ...product },
      meesage: 'product has retrieved successfully '
    })
  } catch (error) {
    next(error)
  }
}

export const updateOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.updateOneProduct(req.body)
    res.json({
      status: 'sucsees',
      data: { ...product },
      message: 'product has update successfully'
    })
  } catch (error) {
    next(error)
  }
}
export const deleteOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductModel.deleteOneProduct(
      req.params.product_id as unknown as string
    )
    res.json({
      status: 'sucsees',
      data: { ...product },
      message: 'product was deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
