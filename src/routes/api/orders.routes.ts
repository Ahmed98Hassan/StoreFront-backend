import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()
// api/orders
route.post('/', Validation, controllers.createOrder)
route.get('/', Validation, controllers.getAllOrders)
route.get('/:order_id', Validation, controllers.getOneOrder)
route.patch('/:order_id', Validation, controllers.updateOneOrder)
route.delete('/:order_id', Validation, controllers.deleteOneOrder)
export default route
