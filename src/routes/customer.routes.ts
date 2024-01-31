import {Router} from 'express'
import { loginCustomer, registerCustomer,logoutCustomer } from '../controllers/customer.controllers'

const customerRouter = Router()

customerRouter.post('/registerCustomer',registerCustomer);
customerRouter.post('/loginCustomer',loginCustomer);
customerRouter.get('/logoutCustomer',logoutCustomer);

export default customerRouter;