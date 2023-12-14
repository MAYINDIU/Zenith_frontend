import React, { useEffect, useState } from 'react';
import Navbar from '../Nabar/Navbar';
import { Button, Checkbox, Dropdown, Label, Radio, TextInput } from 'flowbite-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/icon/jenith.png';
import axios from "axios";
import { ThreeCircles } from 'react-loader-spinner';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from 'sweetalert';
import {useGetDeptPermissionListQuery, useCreatePermissionMutation, useGetRolePrevlistQuery }
 from '../../features/api/dept_head_api';
const Permission = () => {
 const [deptHeadList,setDeptHeadList]=useState([]);
 const [moduleList,setModuleList]=useState([]);
 const [departmentName,setDepartmentName]=useState('');
 const [moduleName,setModuleName]=useState('');
 const [addPermission,setAddpermission]=useState('');
 const [spinner, setSpinner] = useState(false); 
 const [selectdept,setselectdept]=useState('');
 const [permissionType,setPermissionType]=useState('');
 const[moduleRoleList,setModueleRoleList]=useState(['']);

const { id,name} = useParams();
const navigate=useNavigate();







const user_information=JSON.parse(localStorage.getItem('UserDetails'));
const PERSONAL_ID=user_information?.PERSONALID;


//2-project privilage data get data--------------------
const { data: departmentPrevList } = useGetDeptPermissionListQuery(moduleName);
const[departmentpList,setDepartmentPList]=useState(['']);
useEffect(() => {
  if (departmentPrevList) {
    setDepartmentPList(departmentPrevList);
  }
}, [departmentPrevList]);




// fetch for role module list
const ModuleList = async () => {
  setSpinner(true)
 try {
   const response = await axios.get(`http://localhost:5000/api/dept-head-pmodule-list/${PERSONAL_ID}`);
   setModueleRoleList(response.data?.module_list);
   setSpinner(false); 
  } catch (error) {
   console.error("Error fetching data:", error);
 }
};
useEffect(() => {
 ModuleList();
}, []);
// fetch for role module list

//2-role privilage data get data--------------------
const { data: rolePrevList } = useGetRolePrevlistQuery(moduleName);
const [stateRolePrevList, setStateRolePrevList] = useState(['']);
useEffect(() => {
  if (rolePrevList) {
    setStateRolePrevList(rolePrevList);
  }
}, [rolePrevList]);

const [sUserId, setSUserId] = useState(null);
const [sPrevId, setSPrevId] = useState(null);
const [permittype, setPermitType] = useState(null);
const [isSubscribed, setIsSubscribed] = useState(false);
const handleChange = (event) => {
  const selectData = event.target.value;
  console.log(selectData);
  let sData;
  if (event.target.checked) {
    sData = selectData + "_A";
    
  } else {
    sData = selectData + "_D";
   
  }
  const [userId, prevId, type] = sData.split('_');
  setSUserId(userId);
  setSPrevId(prevId);
  setPermitType(type);
};



const [createPermission, { data: permission, error: permissionError, isSuccess }] = useCreatePermissionMutation();
// Create a new user
const handleCreateUser = (e) => {

  const MODULE_ID = moduleName;
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

  console.log(permissions)
  createPermission(permissions)
    .then((data) => {

    })
    .catch((error) => {
      // Handle the error
      console.error('Error creating permission:', error);

    });
};

useEffect(() => {
  // Check if sPrevId is not null before calling handleCreateUser

if(sPrevId!==null){
const done = async () => {
await  handleCreateUser();
setSUserId(null);
setSPrevId(null);
setPermitType(null);
};
done();
 }
}, [sPrevId]);



// fetch all department head data




  const deptHeadData = async () => {
    setSpinner(true)
    try {
      const response = await axios.get("http://localhost:5000/api/department-head-list");
      setDeptHeadList(response.data?.dept_head);
      setSpinner(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    deptHeadData();
  }, []);
// fetch all department head data


// fetch sub module list
const submoduleData = async () => {
  setSpinner(true)
  try {
    const response = await axios.get(`http://localhost:5000/api/module-list/${id}`);
    setModuleList(response.data?.sub_module_list);
    setSpinner(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call sub module list
useEffect(() => {
  submoduleData();
}, []);
// fetch sub module list


// fetch sub module list
const selectedDepatData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/dept-list-mIdwise/${moduleName}`);
    setselectdept(response.data?.department_list);
  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call sub module list
useEffect(() => {
  selectedDepatData();
}, []);
// fetch sub module list


//module permission for department head by admin
const previlage_idd=[1,2,3,4]
const permissionAdd = (event) => {
  event.preventDefault();

  const MODULE_ID = moduleName;
  const ACCESS_BY = departmentName;
  const PRIVILAGE_IDS = previlage_idd; // Assuming previlage_id is an array of selected privilege IDs
  const PERMITTED_BY = PERSONAL_ID;

  if (MODULE_ID === "") {
    alert('Please Select Module');
  } else if (ACCESS_BY === "") {
    alert('Please Select Access user');
  } else if (PRIVILAGE_IDS.length === 0) {
    alert('Please Select Privileges');
  } else {
    const permissions = PRIVILAGE_IDS.map((privilegeId) => ({
      MODULE_ID,
      ACCESS_BY,
      PRIVILAGE_ID: privilegeId,
      PERMITTED_BY,
    }));

    console.log(permissions);

    const url = 'http://localhost:5000/api/create-permission';
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
  }
}

if (addPermission === 'Permission Successfully') {
  swal({
    title: "Permission Successfully",
    icon: "success",
  });
  navigate('/user-list');
}

    return (
        <div>
         <Navbar/>
         <h1 className='shadow w-1/3 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION FOR DEPARTMENT HEAD/ TOP MANAGEMENT</h1>
         <h1 className='mt-5 text-green-700'>{addPermission}</h1>
    
              <div class="p-3 grid grid-cols-1 shadow-md rounded   mt-0 lg:grid-cols-2 gap-0  w-full lg:w-[600px] justify-center lg:mx-auto lg:mt-2">
              <div className="flex items-center gap-2">
              <Radio  onChange={(e) => setPermissionType(e.target.value)} id="permission" name="countries" value={'DEPT-HEAD'}  />
              <Label htmlFor="permission">DEPARTMENT WISE PERMISSION</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio  onChange={(e) => setPermissionType(e.target.value)} id="permission" name="countries" value={'ROLE'}  />
                <Label htmlFor="permission">ROLE WISE PERMISSION</Label>
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

       {permissionType==='DEPT-HEAD' &&
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
               <div key={i} className="flex items-center gap-2">
               <Radio onChange={(e) => setModuleName(e.target.value)} id="permission" name="countries"
               value={modulename?.Module_id}  />
               <Label htmlFor="permission">{modulename?.Module_name}</Label>
               </div>
               
                   ))}
                 </div>
               </div>
                } 

                 {departmentpList.length>1 &&
                  <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

                   {departmentpList?.map((prev, u) => (
                     <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">

                     <div key={u}  class="flex items-center ps-2  rounded dark:border-gray-700">
                    {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                    <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{prev?.DEP_NAME}</label>
                    </div>
                     
                     <div>
                    <div key={u} className="flex items-center ps-2 rounded dark:border-gray-700">
                    <input
                    onClick={handleChange}
                    id={`bordered-checkbox-${u}-u-read`}
                    type="checkbox"
                    value={`${prev?.ACCESS_BY}_0`}
                    name="bordered-checkbox"
                    checked={prev?.PERMIT_STATUS===1}
                    // defaultChecked={prev?.p_read === 1 ?? false}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />

                    <label
                      htmlFor={`bordered-checkbox-${u}-u-read`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.PERMIT_STATUS ? "PERMITTED" : "PERMITTED"}
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

             {permissionType==="ROLE" &&
             <div >
             <div class=" w-full lg:w-[1300px] justify-center lg:mx-auto lg:mt-2">
            <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
              <form  className="flex  flex-col gap-4">
                <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
                {moduleRoleList.length>0 &&
                <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT MODULE</h1>
                  <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                  {moduleList?.map((modulename, role) => (
                  <div key={role} className="flex items-center gap-2">
                  <Radio color="success" onChange={(e) => setModuleName(e.target.value)} id="permission" name="countries"
                  value={modulename?.Module_id}  />
                  <Label htmlFor="permission">{modulename?.Module_name}</Label>
                  </div>
                  ))}
                 </div>
               </div>
                } 

                 {stateRolePrevList.length>1 &&
                  <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

                   {stateRolePrevList?.map((rolename, Role) => (
                     <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">

                     <div key={Role}  class="flex items-center ps-2  rounded dark:border-gray-700">
                    {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                    <label  class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{rolename?.role_name}</label>
                    </div>
                     
                     <div>
                  
                    <div key={Role} className="flex items-center ps-2 rounded dark:border-gray-700">

                    <input
                    onChange={handleChange}
                    id={`bordered-checkbox-${Role}-r-read`}
                    type="checkbox"
                    value={`${rolename?.role_id}_1`}
                    name={`bordered-checkbox-${Role}`}
                    checked={rolename?.p_read===1}
                    // defaultChecked={prev?.p_read===1?true:false}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />

                    <label
                      htmlFor={`bordered-checkbox-${Role}-r-read`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_read ? "READ" : "READ"}
                    </label>

                    <input
                       onChange={handleChange}               
                      id={`bordered-checkbox-${Role}-c-create`}
                      type="checkbox"
                      value={`${rolename?.role_id}_2`}
                      name={`bordered-checkbox-${Role}`}
                      checked={rolename?.p_create===2}
                      // defaultChecked={prev?.p_create===2?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${Role}-c-create`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_create ? "CREATE" : "CREATE"}
                    </label>

                    <input
                        onChange={handleChange} 
                      id={`bordered-checkbox-${Role}-e-edit`}
                      type="checkbox"
                      value={`${rolename?.role_id}_3`}
                      name={`bordered-checkbox-${Role}`}
                      checked={rolename?.p_edit===3}
                      // defaultChecked={prev?.p_edit===3?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${Role}-e-edit`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {rolename?.p_edit ? "EDIT" : "EDIT"}
                    </label>

                    <input
                      onChange={handleChange}  
                      id={`bordered-checkbox-${Role}-d-delete`}
                      type="checkbox"
                      value={`${rolename?.role_id}_4`}
                      name={`bordered-checkbox-${Role}`}
                      checked={rolename?.p_delete===4?true:false}

                      // defaultChecked={prev?.p_delete===4?true:false}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${Role}-d-delete`}
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

export default Permission;