import React, { useEffect, useState } from 'react';
import Navbar from '../../Nabar/Navbar';
import user from '../../../assets/icon/user.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const[moduleList,setModueleList]=useState([]);

  console.log(moduleList)
  const [spinner, setSpinner] = useState(false); 
     //Get from localstorage user_details data
     const UserD=JSON.parse(localStorage.getItem("UserDetails"));
     const PERSONAL_ID=UserD?.PERSONALID;
     const NAME=UserD?.NAME;

     // fetch permitted dept-head module list
      const ModuleList = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/deskmodule-list/${PERSONAL_ID}`);
          setModueleList(response.data?.module_list);
          setSpinner(false); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        ModuleList();
      }, []);
// fetch permitted dept-head module list

    return (
        <div>
        <Navbar/>
        <h1 className='mt-5'>Welcome To User Panel</h1>
        <div  className='p-2 lg:p-5 lg:px-48'>

  
        <div className='shadow p-3 w-full lg:w-1/4 mt-5 mx-auto lg:p-3  rounded-lg text-center'>
         <div className='flex justify-center'>
            <img className='lg:w-20   w-16   shadow-lg bg-white rounded-full p-1 
             lg:block' src={user} />
            </div>
          <h1 className='mt-4'> <span className='font-bold'>{NAME}</span>  <br/> <span className='text-sm'>({PERSONAL_ID})</span> 
          </h1>
         </div>
         <div className='flex justify-center'>
         <div class="grid  grid-cols-2 mt-5 lg:grid-cols-6 gap-2 ">
        
        {moduleList?.length > 0 ? (
          moduleList.map((mName, i) => (
            <Link key={i} to="#">
              <div className="shadow-md bordered text-white rounded p-2 lg:p-4 rounded bordered bg-[#0E9F6E] max-w-sm">
                <h5 className="font-normal mt-1">{mName?.Module_name}</h5>
                <p>Privilage: {mName?.Previlage_id === 1 ? "View" : mName?.Previlage_id === 2?"CREATE": mName?.Previlage_id === 3? "EDIT":null}</p>
              </div>
            </Link>
          ))
        ) : (
          
          <div className="text-center w-full text-red lg:ml-72"></div>
        )}
</div>         
</div>
 </div>
 </div>
    );
};

export default Home;