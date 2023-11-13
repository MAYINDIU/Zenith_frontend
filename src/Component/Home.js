import React from 'react';
import Navbar from './Nabar/Navbar';



const Home = () => {

    return (
        <div>
            <Navbar/>
             <div className='p-2 lg:p-5 lg:px-36'>
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