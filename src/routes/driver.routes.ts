import {Router} from 'express'
import { loginDriver, registerDriver,logoutDriver, getDriver } from '../controllers/driver.controllers'

const driverRouter = Router()

driverRouter.post('/registerDriver',registerDriver);
driverRouter.post('/loginDriver',loginDriver);
driverRouter.get('/logoutDriver',logoutDriver);
driverRouter.get('/getDriver',getDriver);

export default driverRouter;