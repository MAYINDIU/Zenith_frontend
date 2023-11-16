import React, { useEffect, useState } from 'react';
import Navbar from '../Nabar/Navbar';
import { Button, Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/icon/jenith.png';

const Permission = () => {
 const [deptHeadList,setDeptHeadList]=useState([]);
 const [moduleList,setModuleList]=useState([]);
 const [departmentName,setDepartmentName]=useState('');
 const [moduleName,setModuleName]=useState('');
 const { id,name} = useParams();

console.log(departmentName)


 //sub module list
 useEffect(() => {
    fetch(`http://localhost:5000/api/module-list/${id}`)
    .then(res=>res.json())
    .then(data=>setModuleList(data?.sub_module_list));
  });
 //sub module list

// fetch all department head data
 useEffect(() => {
    fetch('http://localhost:5000/api/department-head-list')
    .then(res=>res.json())
    .then(data=>setDeptHeadList(data.dept_head));
  });
// fetch all department head data

    return (
        <div>
         <Navbar/>
         <h1 className='shadow-lg w-64 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION</h1>
         <div >
             <div class=" w-full lg:w-[1200px] justify-center lg:mx-auto lg:mt-2">
            <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
            <form  className="flex  flex-col gap-4">
                <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
                <div className='lg:w-full w-full'>
                  {/* <select className="form-input mt-2 w-full shadow rounded"   onChange={(e) => setModuleName(e.target.value)} >
                  <option>Select Module</option>
                  {moduleList?.map((modulename, i) => (
                     <option value={modulename?.Module_id}>{modulename?.Module_name}</option>
                    ))}
                  </select> */}
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT MODULE</h1>
                  <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                
                  {moduleList?.map((modulename, i) => (
                  <div class="flex items-center ps-2  rounded dark:border-gray-700">
                    <input id="bordered-checkbox-1" type="checkbox" value={modulename?.Module_id} name="bordered-checkbox" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{modulename?.Module_name}</label>
                    </div>
              
                  ))}
                 </div>
               </div>
              
                <div className='lg:w-full w-full'>
                  {/* <select className="form-input mt-2 w-full shadow rounded"   onChange={(e) => setDepartmentName(e.target.value)} >
                  <option>Select Department</option>
                  {deptHeadList?.map((headname, i) => (
                     <option value={headname?.dept_head_id}>{headname?.department_name}</option>
                    ))}
                  </select> */}
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT DEPARTMENT</h1>
                   <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                  {deptHeadList?.map((headname, i) => (
                  <div class="flex items-center ps-2  rounded dark:border-gray-700">
                    <input  onChange={(e) => setDepartmentName(e.target.value)} id="bordered-checkbox-1" type="checkbox" value={headname?.dept_head_id} name="bordered-checkbox" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{headname?.department_name}</label>
                    </div>
              
                  ))}
                 </div>
               </div>


                </div>
                <div className='w-56 rounded-md  justify-center mx-auto'>
                <Button  type='submit' color="success">Submit</Button>
                </div>
            
                </form>
            </div>
            </div>
        </div>
       </div>

    );
};

export default Permission;