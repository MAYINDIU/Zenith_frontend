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
         <h1 className='shadow w-64 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION</h1>
         <div>
             <div class="flex justify-center lg:mt-12">
            <div class="block shadow-xl w-full p-10 lg:w-1/2  bordered rounded p-3 lg:p-10 rounded bordered shadow-xl bg-white max-w-lg">
            <form  className="flex w-full flex-col gap-4">
                <div className='flex justify-center'>
                <img className='w-32  shadow-lg bg-white rounded-full p-2 hidden lg:block' src={logo} />
                </div>

                <div className='w-full'>
                  <select className="form-input mt-2 w-full shadow rounded"   onChange={(e) => setModuleName(e.target.value)} >
                  <option>Select Module</option>
                  {moduleList?.map((modulename, i) => (
                     <option value={modulename?.Module_id}>{modulename?.Module_name}</option>
                    ))}
         
                  </select>
               </div>
              
                <div className='w-full'>
                  <select className="form-input mt-2 w-full shadow rounded"   onChange={(e) => setDepartmentName(e.target.value)} >
                  <option>Select Department</option>
                  {deptHeadList?.map((headname, i) => (
                     <option value={headname?.dept_head_id}>{headname?.department_name}</option>
                    ))}
         
                  </select>
               </div>
             
              <Button type='submit' color="success">Submit</Button>
               
                </form>
            </div>
            </div>
        </div>
       </div>

    );
};

export default Permission;