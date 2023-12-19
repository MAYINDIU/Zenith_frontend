import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import DepartmentHeadHome from './Component/Pages/DepartmentHead/Home';
import Director from './Component/Pages/Director/Home';
import Developement from './Component/Pages/Development/Home';
import ModuleList from './Component/Pages/DepartmentHead/Modulelist';
import Desk from './Component/Pages/DeskUser/Home';
import Navbar from './Component/Nabar/Navbar';
import About from './Component/About';
import Footer from './Component/Footer';
import Payment_channel from './Component/Payment_channel';
import PolicyStatement from './Component/Statement/PolicyStatement';
import Notfound from './Component/Notfound';
import PaymentOverview from './Component/Statement/PaymentOverview';
import Login from './Component/Login/Login';
import Userlist from './Component/UserList/Userlist';
import DepartmentUserlist from './Component/Pages/DepartmentHead/Userlist';
import Contact from './Component/Contact';
import Module from './Component/ModuleList/Module';
import Permission from './Component/Permission/Permission';
import Requireauth from './Component/PrivateRoute/Requireauth';
import SinglePermission from './Component/Pages/DepartmentHead/SinglePermission';
import Index from './Component/Modules/ProposalEntry/Index';


function App() {
  return (
    <div className='App'>
         
       
          <Routes >
              <Route path='/' element={<Login />}>Login</Route>
              <Route path='/dashboard' element={<Requireauth><Home /></Requireauth> }>Home</Route>
              <Route path='/module' element={<Requireauth><Module /></Requireauth>}>All Module</Route>
              <Route path='/permission=:id=:name' element={<Requireauth><Permission /></Requireauth>}>Permission</Route>
              <Route path='/about' element={<About />}>About</Route>
              <Route path='/contact' element={<Contact />}>Contact</Route>
              <Route path='/user-list' element={<Requireauth><Userlist /></Requireauth>}>All user</Route>

            {/* Department Head */}
            <Route path='/department-head' element={<Requireauth><DepartmentHeadHome/></Requireauth>}>Department Head Home</Route>
            <Route path='/module-list' element={<Requireauth><ModuleList/></Requireauth>}>Department Head permitted module list</Route>
            <Route path='/permission-user-list' element={<Requireauth><DepartmentUserlist /></Requireauth>}>Department All user</Route>
            <Route path='/permission-update=:id=:name' element={<Requireauth><SinglePermission /></Requireauth>}>Permission update</Route>

            {/* Department Head */}

            {/*Director*/}
            <Route path='/director' element={<Requireauth><Director/></Requireauth>}>Director Home</Route>
           {/*Director*/}
            {/*Developement*/}
            <Route path='/development' element={<Requireauth><Developement/></Requireauth>}>Development Home</Route>
           {/*Developement*/}

            {/*Developement*/}
            <Route path='/desk-user' element={<Requireauth><Desk/></Requireauth>}>Desk user</Route>
           {/*Developement*/}

           {/*Proposal Module*/}
               <Route path='/proposal-entry' element={<Requireauth><Index/></Requireauth>}>Proposal Entry Form</Route>
           {/*Proposal Module*/}




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
