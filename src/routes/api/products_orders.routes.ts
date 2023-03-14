import { Router } from 'express'
import * as controllers from '../../controllers/products_orders.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()
// api/products
route.post('/', Validation, controllers.createProducts_orders)
route.get('/', Validation, controllers.getAllProducts_orders)
route.get(
  '/:product_order_id',
  Validation,
  controllers.getOneProducts_orders
)
route.patch(
  '/:product_order_id',
  Validation,
  controllers.updateProdcutsOrder
)
route.delete(
  '/:product_order_id',
  Validation,
  controllers.deletePRoductsOrder
)
export default route
