import React, { useEffect, useState } from 'react';
import Navbar from '../Nabar/Navbar';
import axios from 'axios';

const Userlist = () => {

const[permissionList,setpermissionList]=useState(['']);
// console.log(permissionList)
// fetch permission list
const dept_permission_list = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dept-permission-list`);
      setpermissionList(response.data?.dept_permission_list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dept_permission_list();
  }, []);
//  fetch permission list


    return (
        <div>
            <Navbar/>
            <h1 className='shadow w-64 mx-auto p-3 mt-5 font-bold rounded text-center'>ALL USER PERMISSION LIST</h1>
            
    <div className='lg:px-48 mt-5'>  
   <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full border bordered  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-[#087f23] dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="px-4 py-2">
                SL. NO.
                </th>
                <th scope="col" class="px-4 py-3">
                 MODULE ID
                </th>
                <th scope="col" class="px-4 py-3">
                   ACCESS USER
                </th>
                <th scope="col" class="px-4 py-3">
                STATUS
                </th>
                <th scope="col" class="px-4 py-3">
                CREATED DATE
                </th>
                <th scope="col" class="px-4 py-3">
                PERMITTED_BY
                </th>
                <th scope="col" class="px-4 py-3">
                OPERATION
                </th>
            </tr>
        </thead>
        <tbody>
        {permissionList?.map((p_list, i) => (
            <tr key={i} class="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  border bordered dark:border-gray-700">
                 <th scope="row" class="px-4 text-start py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {i+1}
                </th>
                <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {p_list?.module_id}
                </th>
                <td class="px-2 py-3">
                {p_list?.access_user}
                </td>
                <td class="px-2 py-3">
                {p_list?.status}
                </td>
                <td class="px-2 py-3">
                {p_list?.created_date}
                </td>
                <td class="px-2 py-3">
                {p_list?.permitted_by} 
                </td>
                <td class="px-2 py-3">
                    <a href="#" class="font-medium p-2 rounded text-white bg-[#004D40]  dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium p-2 rounded ml-3 text-white bg-[#BF360C]  dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>
                   ))}
        </tbody>

    </table>
</div>

</div>
        </div>
    );
};

export default Userlist;