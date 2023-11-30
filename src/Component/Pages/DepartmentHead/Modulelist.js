import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Nabar/Navbar';
import { ThreeCircles } from 'react-loader-spinner';
import { Button, Toast } from 'flowbite-react';
import Userlist from './Userlist';

const Modulelist = () => {
const[moduleList,setModueleList]=useState(['']);
const[userList,setUserList]=useState([]);
const[previlageList,setPrevilagelsit]=useState(['']);
const [spinner, setSpinner] = useState(false); 
const [user_id,setUser]=useState('');
const [module_id,setModuleName]=useState('');
const [previlage_id,setPrevilage]=useState('');
const [addPermission,setAddpermission]=useState('');
console.log(user_id,module_id,previlage_id)
const navigate=useNavigate();

console.log(userList)

 //Get from localstorage user_details data
 const UserD=JSON.parse(localStorage.getItem("UserDetails"));
 const PERSONAL_ID=UserD?.PERSONALID;

  const DEPT_CODE=UserD?.DEPT_CODE;
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

// fetch userlist module list
const PrevList = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/privilage-list/${module_id}/${DEPT_CODE}`);
      setUserList(response.data?.privilage_list);
      setSpinner(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (module_id && DEPT_CODE) {
      PrevList();
    }
  }, [module_id, DEPT_CODE]);
// fetch userlist module list


// fetch PrevilageList  list
const PrevilageList = async () => {
     setSpinner(true)
    try {
      const response = await axios.get(`http://localhost:5000/api/previlage-list`);
      setPrevilagelsit(response.data?.previlage_list);
      setSpinner(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    PrevilageList();
  }, []);
// fetch PrevilageList  list

const [selectedPrivileges, setSelectedPrivileges] = useState([]);

console.log(selectedPrivileges)

const handlePrivilegeChange = (e, privilegeId) => {
    const checked = e.target.checked;
  
    // Update selected privileges based on the checkbox state
    if (checked) {
      setSelectedPrivileges((prev) => [...prev, privilegeId]);
    } else {
      setSelectedPrivileges((prev) => prev.filter((id) => id !== privilegeId));
    }
  };


const previlage_idd=[1,2]
const permissionAdd = (event) => {
  event.preventDefault();

  const MODULE_ID = module_id;
  const ACCESS_BY = user_id;
  const PRIVILAGE_IDS = selectedPrivileges; // Assuming previlage_id is an array of selected privilege IDs
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
  navigate('/permission-user-list');
}




    return (
        <div>
         <Navbar/>
         <h1 className='shadow-lg w-1/3 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION DEPARTMENT HEAD TO DESK USER</h1>
         <h1 className='mt-5 text-green-700'>{addPermission}</h1>
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
                  <div class="flex items-center ps-2  rounded dark:border-gray-700">
                    <input id="bordered-checkbox-1" onChange={(e) => setModuleName(e.target.value)} type="checkbox" value={modulename?.Module_id} name="bordered-checkbox" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{modulename?.Module_name}</label>
                    </div>
                  ))}
                 </div>
               </div>
                } 

                 {userList.length>1 &&
                  <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

                  <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">
                  <div>

                  {userList?.map((user, i) => (
                    <div class="flex items-center ps-2  rounded dark:border-gray-700">
                       <input  onChange={(e) => setUser(e.target.value)} id="bordered-checkbox-1" type="checkbox" value={user?.personal_id} name="bordered-checkbox" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{user?.name}</label>
                    </div>
              
                  ))}
                  </div>
               
               
                <div>
                {userList?.map((prev, i) => (
              <div key={i} class="flex items-center ps-2  rounded dark:border-gray-700">
              <input
                  onChange={(e) => handlePrivilegeChange(e, prev?.p_read===1?1:prev?.p_read==='null'?1:1)}
                  id={`bordered-checkbox-${i}`}
                  type="checkbox"
                  value={prev?.p_read}
                  name="bordered-checkbox"
                  checked={selectedPrivileges.includes(prev?.p_read===1?1:prev?.p_read==='null'?1:1)}
                  className=" w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                  htmlFor={`bordered-checkbox-${i}`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
              >
                    {prev?.p_read===1?"READ":"NO"}
              </label>


              <input
                  onChange={(e) => handlePrivilegeChange(e, prev?.p_create===2?2:prev?.p_create==='null'?2:2)}
                  id={`bordered-checkbox-${i}`}
                  type="checkbox"
                  value={prev?.p_create===2?2:prev?.p_create==='null'?2:2}
                  name="bordered-checkbox"
                  checked={selectedPrivileges.includes(prev?.p_create===2?2:prev?.p_create==='null'?2:2)}
                  className=" w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                  htmlFor={`bordered-checkbox-${i}`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
              >
                {prev?.p_create===2?"CREATE":"NO"}
              </label>


              <input
                  onChange={(e) => handlePrivilegeChange(e, prev?.p_edit===3?3:prev?.p_edit==='null'?3:3)}
                  id={`bordered-checkbox-${i}`}
                  type="checkbox"
                  value={prev?.p_edit===3?3:prev?.p_edit==='null'?3:3}
                  name="bordered-checkbox"
                  checked={selectedPrivileges.includes(prev?.p_edit===3?3:prev?.p_edit==='null'?3:3)}
                  className=" w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                  htmlFor={`bordered-checkbox-${i}`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
              >
                {prev?.p_edit===3?"EDIT":"NO"}
              </label>

              <input
                  onChange={(e) => handlePrivilegeChange(e, prev?.p_delete===4?4:prev?.p_delete==='null'?4:4)}
                  id={`bordered-checkbox-${i}`}
                  type="checkbox"
                  value={prev?.p_delete===4?4:prev?.p_delete==='null'?4:4}
                  name="bordered-checkbox"
                  checked={selectedPrivileges.includes(prev?.p_delete===4?4:prev?.p_delete==='null'?4:4)}
                  className=" w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                  htmlFor={`bordered-checkbox-${i}`}
                  className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
              >
                {prev?.p_delete===4?"DELETE":"NO"}
              </label>

              </div>
                ))}



                </div>

         
            
               </div>
               </div>
                 }
                

                </div>

                <div className='w-80 rounded-md flex  justify-center mx-auto'>
                <Button  onClick={permissionAdd}  type='submit' color="success">Add Permission</Button>
                <div  className='ml-2 w-80' ><Button  type='submit' color="failure">Delete Permission</Button></div> 
                </div>
              </form>

            </div>
            </div>
        </div>
       </div>
    );
};

export default Modulelist;