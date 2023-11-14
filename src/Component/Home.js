import React, { useEffect, useState } from 'react';
import Navbar from './Nabar/Navbar';
import user from '../assets/icon/user.png';


const Home = () => {

  const[Dept_head,setDept_head]=useState('');
  console.log(Dept_head)

  const dept_name=Dept_head?.department_name;
  // console.log(dept_name);

  //Get from localstorage user_details data
  const UserD=JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID=UserD?.PERSONALID;
  const NAME=UserD?.NAME;
      
  // fetch all department head data
  useEffect(() => {
    fetch(`http://localhost:5000/api/department-head/${PERSONAL_ID}`)
    .then(res=>res.json())
    .then(data=>setDept_head(data?.dept_head_details));
  });
  // fetch all department head data

     
   
    return (
        <div>
            <Navbar/>
             <div className='shadow p-3 w-full lg:w-1/4 mt-5 mx-auto lg:p-3  rounded-lg text-center'>
             <div className='flex justify-center'>
                <img className='w-20  shadow-lg bg-white rounded-full p-1 hidden lg:block' src={user} />
                </div>
              <h1 className='mt-4'> <span className='font-bold'>{NAME}</span>  <br/> <span className='text-sm'>({PERSONAL_ID})</span> 
               <br/> <span className='text-sm font-bold-none'>{dept_name} </span> </h1>
             </div>
          
     

             <div className='p-2 lg:p-5 lg:px-48'>
            <div class="grid grid-cols-2 mt-3 lg:grid-cols-5 gap-4">
           
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#3F83F8] max-w-sm">

             <h5 className="text-xl font-bold tracking-tight ">
               100
            </h5>
            <h5 className="font-normal mt-2">
            TOTAL USER
             </h5> 
            </div>

            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#3F83F8] max-w-sm">
             <h5 className="text-xl font-bold tracking-tight ">
               100
            </h5>
            <h5 className="font-normal mt-2">
            TOTAL MODULE
             </h5> 
            </div>
         
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#3F83F8] max-w-sm">
             <h5 className="text-xl font-bold tracking-tight ">
               100
            </h5>
            <h5 className="font-normal mt-2">
            TOTAL DEPT HEAD
             </h5> 
            </div>
        
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#3F83F8] max-w-sm">
             <h5 className="text-xl font-bold tracking-tight ">
               100
            </h5>
            <h5 className="font-normal mt-2">
            TOTAL USER
             </h5> 
            </div>
   
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#3F83F8] max-w-sm">
             <h5 className="text-xl font-bold tracking-tight ">
               100
            </h5>
            <h5 className="font-normal mt-2">
            TOTAL USER
             </h5> 
            </div>

            
            </div>
            </div>
        </div>
    );
};

export default Home;