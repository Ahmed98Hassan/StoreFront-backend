import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import Validation from '../../middleware/authentication.middleware'

const route = Router()
// api/products
route.post('/', Validation, controllers.createProduct)
route.get('/', controllers.getAllProducts)
route.get('/:product_id', controllers.getOneProduct)
route.patch('/:product_id', Validation, controllers.updateOneProduct)
route.delete('/:product_id', Validation, controllers.deleteOneProduct)

export default route
