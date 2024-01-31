import {BrowserRouter, Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import RegisterDriver from './pages/RegisterDriver'
import RegisterCustomer from './pages/RegisterCustomer';
import LoginDriver from './pages/LoginDriver';
import LoginCustomer from './pages/LoginCustomer';
import CustomerHome from './pages/CustomerHome';
import DriverHome from './pages/DriverHome';
import { useAppDispatch } from './store/store';
import { loginCustomer, loginDriver } from './store/reducer/login';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const user1 = JSON.parse(localStorage.getItem("customerLogged") ||"{}");
  const user2 = JSON.parse(localStorage.getItem("driverLogged") ||"{}");
  useEffect(() => {
    dispatch(loginCustomer(user1));
    dispatch(loginDriver(user2));
  }, []);
  
  return (
    <BrowserRouter>
    <Routes>
          <Route index element={<Home />} />
          <Route path='/registerDriver' element={<RegisterDriver/>} />
          <Route path='/loginDriver' element={<LoginDriver />} />
          <Route path='/registerCustomer' element={<RegisterCustomer />} />
          <Route path='/loginCustomer' element={<LoginCustomer />} />
          <Route path='/customerHome' element={<CustomerHome />} />
          <Route path='/driverHome' element={<DriverHome />} />
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
