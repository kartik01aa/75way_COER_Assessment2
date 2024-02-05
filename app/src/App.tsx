import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import RegisterDriver from './pages/RegisterDriver'
import RegisterCustomer from './pages/RegisterCustomer';
import LoginDriver from './pages/LoginDriver';
import LoginCustomer from './pages/LoginCustomer';
import CustomerHome from './pages/CustomerHome';
import DriverHome from './pages/DriverHome';
import { useAppDispatch } from './store/store';
import { loginCustomer } from './store/reducer/customerReducer';
import { loginDriver } from './store/reducer/driverReducer';
import { useEffect } from 'react';
import { rideBook } from './store/reducer/bookRideReducer';
import CustomerWait from './pages/CustomerWait';
import DriverWait from './pages/DriverWait';
import RideHistory from './pages/RideHistory';

function App() {
  const dispatch = useAppDispatch();
  const user1 = JSON.parse(localStorage.getItem("customerLogged") || "{}");
  const user2 = JSON.parse(localStorage.getItem("driverLogged") || "{}");
  const user3 = JSON.parse(localStorage.getItem("rideDetails") || "{}");
  console.log(user3)
  useEffect(() => {
    dispatch(loginCustomer(user1));
    dispatch(loginDriver(user2));
    dispatch(rideBook(user3));
    console.log(user3)
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/registerDriver' element={<RegisterDriver />} />
        <Route path='/loginDriver' element={<LoginDriver />} />
        <Route path='/registerCustomer' element={<RegisterCustomer />} />
        <Route path='/loginCustomer' element={<LoginCustomer />} />
        <Route path='/customerHome' element={<CustomerHome />} />
        <Route path='/driverHome' element={<DriverHome />} />
        <Route path='/customerWait' element={<CustomerWait />} />
        <Route path='/driverWait' element={<DriverWait />} />
        <Route path='/rideHistory' element={<RideHistory />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
