import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import verification from '../../middleware/authentication.middleware'

const route = Router()
// api/user
route.post('/', controllers.createUser)
route.get('/', verification, controllers.getAllUsers)
route.get('/:user_id', verification, controllers.getOneUser)
route.patch('/:user_id', verification, controllers.updateOneUser)
route.delete('/:user_id', verification, controllers.deleteOneUser)
route.post(`/authenticate`, controllers.authenticateOneUser)
export default route
