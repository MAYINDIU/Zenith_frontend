import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Nabar/Navbar';
import { ThreeCircles } from 'react-loader-spinner';
import { Button, Toast } from 'flowbite-react';
import Userlist from './Userlist';
import {useCreatePermissionMutation, useGetProjectPrevlistQuery, useGetRolePrevlistQuery, useGetUserprivilagelistQuery } from '../../../features/api/dept_head_api';

const Modulelist = () => {
const[moduleList,setModueleList]=useState(['']);
const[roleprevList,setRoleprevList]=useState(['']);
const [spinner, setSpinner] = useState(false); 
const [user_id,setUser]=useState('');
const [previd,setPrev]=useState('');
const [sinnglePermission,setSinglePermission]=useState('');
const [module_id,setModuleName]=useState('');
const [previlage_id,setPrevilage]=useState('');
const [addPermission,setAddpermission]=useState('');
const [permissionType,setPermissionType]=useState('');
// console.log(projectprevList)
const navigate=useNavigate();

 //Get from localstorage user_details data
 const UserD=JSON.parse(localStorage.getItem("UserDetails"));
//  console.log(UserD)
 const PERSONAL_ID=UserD?.PERSONALID;

  const DEPT_CODE=UserD?.DEPT_CODE;


  // console.log(DEPT_CODE)
// fetch permitted dept-head module list
const ModuleList = async () => {
     setSpinner(true)
    try {
      const response = await axios.get(`http://localhost:5000/api/dept-head-pmodule-list/${PERSONAL_ID}`);
      setModueleList(response.data?.module_list);
      setSpinner(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  // Call sub module list
  useEffect(() => {
    ModuleList();
  }, []);
// fetch permitted dept-head module list

const [sUserId, setSUserId] = useState(null);
const [sPrevId, setSPrevId] = useState(null);
const [permittype, setPermitType] = useState(null);
const [isSubscribed, setIsSubscribed] = useState(false);
const handleChange = event => {
  const selectData = event.target.value;
  let sData;

  if (event.target.checked) {
    sData = selectData + "_A";
    console.log(sData)
    // alert(sData);
  } else {
    sData = selectData + "_D";
    console.log(sData)
    // alert(sData);
  }

  // Split sData into two parts based on underscore
  const [userId, prevId, type] = sData.split('_');
  setSUserId(userId);
  setSPrevId(prevId);
  setPermitType(type);

  setIsSubscribed(current => !current);
};

const userPermissionAdded = (event) => {

  const MODULE_ID = module_id;
  const ACCESS_BY = sUserId;
  const PERMITTED_BY = PERSONAL_ID;
  const PROCESS=permittype;
  const TYPE=permissionType;
  const PRIVILAGE_ID=sPrevId;
  if (MODULE_ID === "") {
    alert('Please Select Module');
  } else if (ACCESS_BY === "") {
    alert('Please Select Access user');
  }  else {
    const permissions ={
      MODULE_ID,
      ACCESS_BY,
      PRIVILAGE_ID,
      PERMITTED_BY,
      PROCESS,
      TYPE
    };

    console.log(permissions);

    const url = 'http://localhost:5000/api/create-permission-new';
    setSpinner(true)
    fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      body: JSON.stringify(permissions)
    })
      .then(Response => Response.json())
      .then(data => setAddpermission(data));
      setSpinner(false)
  }
}
useEffect(() => {
  // Check if previd is 1 or truthy
  if (sPrevId === '1' || sPrevId === '2' || sPrevId === '3' || sPrevId === '4' ) {
    handleCreateUser();
  }
}, [sPrevId]);

const [createPermission, { data: permission, error: permissionError, isSuccess }] = useCreatePermissionMutation();
// Create a new user
const handleCreateUser = (e) => {

  const MODULE_ID = module_id;
  const ACCESS_BY = sUserId;
  const PERMITTED_BY = PERSONAL_ID;
  const PROCESS = permittype;
  const TYPE = permissionType;
  const PRIVILAGE_ID = sPrevId;

  if (MODULE_ID === "" || ACCESS_BY === "") {
    alert('Please select Module and Access User');
    return;
  }
  const permissions = {
    MODULE_ID,
    ACCESS_BY,
    PRIVILAGE_ID,
    PERMITTED_BY,
    PROCESS,
    TYPE,
  };

  createPermission(permissions)
    .then((data) => {
      // Handle the successful response data
      // console.log('Permission created successfully:', data);
    })
    .catch((error) => {
      // Handle the error
      console.error('Error creating permission:', error);

      // You can display an error message to the user if needed
    
    });
};


if (addPermission === "Permission Successfully") {
// navigate('/permission-user-list');
}
// user permission list get data-----------------------
const [privilageList, setPrivilageList] = useState([]);
const { data, isLoading, isError } = useGetUserprivilagelistQuery({ module_id, DEPT_CODE }
  ,{
    refetchOnMountOrArgChange: true,
  });

useEffect(() => {
  if (data) {
    setPrivilageList(data);
  }
}, [data]);
// 1-user permission list get data-----------------

//2-role privilage data get data--------------------
const { data: rolePrevList } = useGetRolePrevlistQuery(module_id);
const [stateRolePrevList, setStateRolePrevList] = useState(['']);
useEffect(() => {
  if (rolePrevList) {
    setStateRolePrevList(rolePrevList);
  }
}, [rolePrevList]);
// project privilage data get data--------------------

//3-project privilage data get data--------------------
const { data: projectPrevList } = useGetProjectPrevlistQuery(module_id);
const [stateProjectPrevList, setStateProjectPrevList] = useState(['']);
useEffect(() => {
  if (projectPrevList) {
    setStateProjectPrevList(projectPrevList);
  }
}, [projectPrevList]);
// project privilage data get data--------------------

    return (
        <div>
         <Navbar/>
         <h1 className='shadow-lg lg:w-1/3 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION DEPARTMENT HEAD TO DESK USER</h1>
         <h1 className='mt-5 text-green-700'>{addPermission}</h1>
  

               
              <div class="p-2 grid grid-cols-1 shadow-md rounded   mt-0 lg:grid-cols-3 gap-0  w-full lg:w-[800px] justify-center lg:mx-auto lg:mt-2">
              <div class="flex items-center ps-2  rounded dark:border-gray-700">
              <input  onChange={(e) => setPermissionType(e.target.value)} type="checkbox" 
              value={'USER'}  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label  class="w-full py-1 ml-2 text-left ms-2 text-lg font-sm text-dark dark:text-gray-300">USER WISE PERMISSION</label>
              </div>
                  
              <div class="flex items-center ps-2  rounded dark:border-gray-700">
              <input  onChange={(e) => setPermissionType(e.target.value)} type="checkbox" 
              value={'ROLE'}  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label  class="w-full py-1 ml-2 text-left ms-2 text-lg font-sm text-dark dark:text-gray-300">ROLE WISE PERMISSION</label>
             </div>
             <div class="flex items-center ps-2  rounded dark:border-gray-700">
              <input  onChange={(e) => setPermissionType(e.target.value)} type="checkbox" 
              value={'PROJECT'}  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label  class="w-full py-1 ml-2 text-left ms-2 text-lg font-sm text-dark dark:text-gray-300">PROJECT WISE PERMISSION</label>
             </div>
                 
             </div>
     
             <div className="flex justify-center mb-2 ">
                <ThreeCircles
                height="60"
                width="60"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={spinner}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
                />
              </div>
          
          {permissionType==='USER' &&
         <div >
             <div class=" w-full lg:w-[1500px] justify-center lg:mx-auto lg:mt-2">
            <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
              <form  className="flex  flex-col gap-4">
                <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
                {moduleList.length>0 &&
                <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT MODULE</h1>
                  <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                  {moduleList?.map((modulename, u) => (
                  <div key={u} class="flex items-center ps-2  rounded dark:border-gray-700">
                    <input  onChange={(e) => setModuleName(e.target.value)} type="checkbox" 
                    value={modulename?.Module_id}  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{modulename?.Module_name}</label>
                    </div>
                  ))}
                 </div>
               </div>
                } 

                 {privilageList.length>1 &&
                  <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

                   {privilageList?.map((prev, u) => (
                     <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">

                     <div key={u}  class="flex items-center ps-2  rounded dark:border-gray-700">
                    {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                    <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{prev?.name}</label>
                    </div>
                     
                     <div>

                    
                    <div key={u} className="flex items-center ps-2 rounded dark:border-gray-700">
                    <input
                     onChange={handleChange}
                    id={`bordered-checkbox-${u}-u-read`}
                    type="checkbox"
                    value={`${prev?.personal_id}_1`}
                    name="bordered-checkbox"
                    checked={prev?.p_read===1}
                    // defaultChecked={prev?.p_read===1?true:false}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />

                    <label
                      htmlFor={`bordered-checkbox-${u}-u-read`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_read ? "READ" : "READ"}
                    </label>

                    <input
                       onChange={handleChange}               
                      id={`bordered-checkbox-${u}-u-create`}
                      type="checkbox"
                      value={`${prev?.personal_id}_2`}
                      name="bordered-checkbox"
                      checked={prev?.p_create===2}
                      // defaultChecked={prev?.p_create===2?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${u}-u-create`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_create ? "CREATE" : "CREATE"}
                    </label>

                    <input
                        onChange={handleChange} 
                      id={`bordered-checkbox-${u}-u-edit`}
                      type="checkbox"
                      value={`${prev?.personal_id}_3`}
                      name="bordered-checkbox"
                      checked={prev?.p_edit===3}
                      // defaultChecked={prev?.p_edit===3?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${u}-u-edit`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_edit ? "EDIT" : "EDIT"}
                    </label>

                    <input
                      onChange={handleChange}  
                      id={`bordered-checkbox-${u}-u-delete`}
                      type="checkbox"
                      value={`${prev?.personal_id}_4`}
                      name="bordered-checkbox"
                      checked={prev?.p_delete===4}

                      // defaultChecked={prev?.p_delete===4?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${u}-u-delete`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_delete ? "DELETE" : "DELETE"}
                    </label>

                    </div> 
                    </div>

                  </div>
             
                  ))}
                  </div>
       
                 }
                
                </div>

              </form>

            </div>
            </div>
         </div>
          }
          {permissionType==='ROLE' &&
             <div >
             <div class=" w-full lg:w-[1500px] justify-center lg:mx-auto lg:mt-2">
            <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
              <form  className="flex  flex-col gap-4">
                <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
                {moduleList.length>0 &&
                <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT MODULE</h1>
                  <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                  {moduleList?.map((modulename, i) => (
                  <div key={i} class="flex items-center ps-2  rounded dark:border-gray-700">
                    <input  onChange={(e) => setModuleName(e.target.value)} type="checkbox" 
                    value={modulename?.Module_id}  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{modulename?.Module_name}</label>
                    </div>
                  ))}
                 </div>
               </div>
                } 

                 {stateRolePrevList.length>1 &&
                  <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

                   {stateRolePrevList?.map((rolename, i) => (
                     <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">

                     <div key={i}  class="flex items-center ps-2  rounded dark:border-gray-700">
                    {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                    <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{rolename?.role_name}</label>
                    </div>
                     
                     <div>

                    
                    <div key={i} className="flex items-center ps-2 rounded dark:border-gray-700">
                    <input
                     onChange={handleChange}
                    id={`bordered-checkbox-${i}-r-read`}
                    type="checkbox"
                    value={`${rolename?.role_id}_1`}
                    name="bordered-checkbox"
                    checked={rolename?.p_read===1}
                    // defaultChecked={prev?.p_read===1?true:false}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />

                    <label
                      htmlFor={`bordered-checkbox-${i}-r-read`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_read ? "READ" : "READ"}
                    </label>

                    <input
                       onChange={handleChange}               
                      id={`bordered-checkbox-${i}-r-create`}
                      type="checkbox"
                      value={`${rolename?.role_id}_2`}
                      name="bordered-checkbox"
                      checked={rolename?.p_create===2}
                      // defaultChecked={prev?.p_create===2?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${i}-r-create`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_create ? "CREATE" : "CREATE"}
                    </label>

                    <input
                        onChange={handleChange} 
                      id={`bordered-checkbox-${i}-r-edit`}
                      type="checkbox"
                      value={`${rolename?.role_id}_3`}
                      name="bordered-checkbox"
                      checked={rolename?.p_edit===3}
                      // defaultChecked={prev?.p_edit===3?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${i}-r-edit`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_edit ? "EDIT" : "EDIT"}
                    </label>

                    <input
                      onChange={handleChange}  
                      id={`bordered-checkbox-${i}-r-delete`}
                      type="checkbox"
                      value={`${rolename?.role_id}_4`}
                      name="bordered-checkbox"
                      checked={rolename?.p_delete===4?true:false}

                      // defaultChecked={prev?.p_delete===4?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${i}-r-delete`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_delete ? "DELETE" : "DELETE"}
                    </label>

                    </div> 
                    </div>

                  </div>
             
                  ))}
                  </div>
                 }
                
                </div>

              </form>

            </div>
            </div>
             </div>
          }

          {permissionType==='PROJECT' &&
         <div >
         <div class=" w-full lg:w-[1500px] justify-center lg:mx-auto lg:mt-2">
        <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
          <form  className="flex  flex-col gap-4">
            <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
            {moduleList.length>0 &&
            <div className='lg:w-full w-full'>
              <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT MODULE</h1>
              <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
              {moduleList?.map((modulename, i) => (
              <div key={i} class="flex items-center ps-2  rounded dark:border-gray-700">
                <input onChange={(e) => setModuleName(e.target.value)} type="checkbox" 
                value={modulename?.Module_id}  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{modulename?.Module_name}</label>
                </div>
              ))}
             </div>
           </div>
            } 

             {stateProjectPrevList.length>1 &&
              <div className='lg:w-full w-full'>
              <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

               {stateProjectPrevList?.map((projectName, i) => (
                 <div key={i}  class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">

                 <div  class="flex items-center ps-2 rounded dark:border-gray-700">
                {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{projectName?.project_name}</label>
                </div>
                 
                 <div>

                
                <div  className="flex items-center ps-2 rounded dark:border-gray-700">
                <input
                 onChange={handleChange}
                id={`bordered-checkbox-${i}-p-read`}
                type="checkbox"
                value={`${projectName?.project_id}_1`}
                name="bordered-checkbox"
                checked={projectName?.p_read===1}
                // defaultChecked={prev?.p_read===1?true:false}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
               />

                <label
                  htmlFor={`bordered-checkbox-${i}-p-read`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                >
                  {projectName?.p_read ? "READ" : "READ"}
                </label>

                <input
                   onChange={handleChange}               
                  id={`bordered-checkbox-${i}-p-create`}
                  type="checkbox"
                  value={`${projectName?.project_id}_2`}
                  name="bordered-checkbox"
                  checked={projectName?.p_create===2}
                  // defaultChecked={prev?.p_create===2?true:false}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`bordered-checkbox-${i}-p-create`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                >
                  {projectName?.p_create ? "CREATE" : "CREATE"}
                </label>

                <input
                    onChange={handleChange} 
                  id={`bordered-checkbox-${i}-p-edit`}
                  type="checkbox"
                  value={`${projectName?.project_id}_3`}
                  name="bordered-checkbox"
                  checked={projectName?.p_edit===3}
                  // defaultChecked={prev?.p_edit===3?true:false}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`bordered-checkbox-${i}-p-edit`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                >
                  {projectName?.p_edit ? "EDIT" : "EDIT"}
                </label>

                <input
                  onChange={handleChange}  
                  id={`bordered-checkbox-${i}-p-delete`}
                  type="checkbox"
                  value={`${projectName?.project_id}_4`}
                  name="bordered-checkbox"
                  checked={projectName?.p_delete===4?true:false}

                  // defaultChecked={prev?.p_delete===4?true:false}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`bordered-checkbox-${i}-p-delete`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                >
                  {projectName?.p_delete ? "DELETE" : "DELETE"}
                </label>

                </div> 
                </div>

              </div>
         
              ))}
              </div>
             }
            
            </div>

          </form>

        </div>
        </div>
         </div>
          }
                    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        type="warning"
      />
       </div>
    );
};

export default Modulelist;