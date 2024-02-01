import {Router} from 'express'
import { loginDriver, registerDriver,logoutDriver, getDriver,updateDriver } from '../controllers/driver.controllers'

const driverRouter = Router()

driverRouter.post('/registerDriver',registerDriver);
driverRouter.post('/loginDriver',loginDriver);
driverRouter.post('/updateDriver',updateDriver);
driverRouter.get('/logoutDriver',logoutDriver);
driverRouter.post('/getDriver',getDriver);

export default driverRouter;