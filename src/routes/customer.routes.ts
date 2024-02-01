import {Router} from 'express'
import { loginCustomer, registerCustomer,logoutCustomer,updateCustomer } from '../controllers/customer.controllers'

const customerRouter = Router()

customerRouter.post('/registerCustomer',registerCustomer);
customerRouter.post('/loginCustomer',loginCustomer);
customerRouter.post('/updateCustomer',updateCustomer);
customerRouter.get('/logoutCustomer',logoutCustomer);

export default customerRouter;