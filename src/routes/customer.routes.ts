import {Router} from 'express'
import { loginCustomer, registerCustomer,logoutCustomer,updateCustomer,changeCustomerStatus } from '../controllers/customer.controllers'

const customerRouter = Router()

customerRouter.post('/registerCustomer',registerCustomer);
customerRouter.post('/loginCustomer',loginCustomer);
customerRouter.post('/updateCustomer',updateCustomer);
customerRouter.post('/changeCustomerStatus',changeCustomerStatus);
customerRouter.get('/logoutCustomer',logoutCustomer);

export default customerRouter;