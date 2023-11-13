import { Card } from 'flowbite-react';
import React from 'react';
import Navbar from '../Nabar/Navbar';
import { Link } from 'react-router-dom';

const Module = () => {
    return (
        <div>
                 <Navbar/>
    
        <div className='p-2 lg:p-5 lg:px-36'>
             <h1 className='shadow w-48 mx-auto p-3 font-bold rounded text-center'>ALL MODULE LIST</h1>
         <div class="grid grid-cols-2 mt-3 lg:grid-cols-6 gap-4">
            <Link to={"/permission"}>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            </Link>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
         </div>
         <div class="grid grid-cols-2 mt-3 lg:grid-cols-6 gap-4">
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-2">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
            <div class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
             Group Insurance
             </h5> 
            </div>
         </div>
        </div>
        </div>
    );
};

export default Module;