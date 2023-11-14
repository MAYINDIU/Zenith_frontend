import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Navbar from './Component/Nabar/Navbar';
import About from './Component/About';
import Footer from './Component/Footer';
import Payment_channel from './Component/Payment_channel';
import PolicyStatement from './Component/Statement/PolicyStatement';
import Notfound from './Component/Notfound';
import PaymentOverview from './Component/Statement/PaymentOverview';
import Login from './Component/Login/Login';
import Userlist from './Component/UserList/Userlist';
import Contact from './Component/Contact';
import Module from './Component/ModuleList/Module';
import Permission from './Component/Permission/Permission';
import Requireauth from './Component/PrivateRoute/Requireauth';


function App() {
  return (
    <div className='App'>
         
       
          <Routes>
              <Route path='/' element={<Login />}>Login</Route>
              <Route path='/dashboard' element={<Requireauth><Home /></Requireauth> }>Home</Route>
              <Route path='/module' element={<Requireauth><Module /></Requireauth>}>All Module</Route>
              <Route path='/permission=:id=:name' element={<Requireauth><Permission /></Requireauth>}>Permission</Route>
              <Route path='/about' element={<About />}>About</Route>
              <Route path='/contact' element={<Contact />}>Contact</Route>
              <Route path='/user-list' element={<Requireauth><Userlist /></Requireauth>}>All user</Route>
              <Route path='/Payment-channel' element={<Payment_channel />}>Payment Channel</Route>
              <Route path='/Policy-information' element={<PolicyStatement />}>Payment Channel</Route>
              <Route path='/payment_overview=:id=:name=:amount' element={<PaymentOverview />}>Payment Overview</Route>
              <Route path='*' element={<Notfound />}>Notfound</Route>
          
          </Routes>
         {/* <Footer></Footer> */}

    </div>
  );
}

export default App;
