import React from 'react';
import Navbar from '../../Nabar/Navbar';
import user from '../../../assets/icon/user.png';
const Home = () => {

     //Get from localstorage user_details data
  const UserD=JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID=UserD?.PERSONALID;
  const NAME=UserD?.NAME;
    return (
        <div>
        <Navbar/>
        <h1 className='mt-5'>Welcome To Director Panel</h1>
        <div className='shadow p-3 w-full lg:w-1/4 mt-5 mx-auto lg:p-3  rounded-lg text-center'>
         <div className='flex justify-center'>
            <img className='lg:w-20   w-16   shadow-lg bg-white rounded-full p-1 
             lg:block' src={user} />
            </div>
          <h1 className='mt-4'> <span className='font-bold'>{NAME}(Director)</span>  <br/> <span className='text-sm'>({PERSONAL_ID})</span> 
          </h1>
         </div>
    </div>
    );
};

export default Home;