import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import Navbar from '../Nabar/Navbar';
import { Link, useParams } from 'react-router-dom';

const Module = () => {
    const[moduleList,setModueleList]=useState(['']);

    // fetch all module list
    useEffect(() => {
        fetch('http://localhost:5000/api/all-modules')
        .then(res=>res.json())
        .then(data=>setModueleList(data?.module_list));
    });
    // fetch all module list



    return (
        <div>
        <Navbar/>
        <div className='p-2 lg:p-5 lg:px-48'>
        <h1 className='shadow w-48 mx-auto p-3 font-bold rounded text-center'>ALL MODULE LIST</h1>

         <div class="grid grid-cols-2 mt-5 lg:grid-cols-6 gap-2">
           {moduleList.map((mName, i) => (
            <Link key={i}  to={`/permission=${mName?.module_id}=${mName?.module_name}`}>
            <div  class=" shadow-md bordered text-white rounded p-5 rounded bordered  bg-[#0E9F6E] max-w-sm">
            <h5 className="font-normal mt-1">
            {mName?.module_name}
             </h5> 
            </div>
            </Link>
              ))}
    
         </div>
 
        </div>
        </div>
    );
};

export default Module;