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
const [spinner, setSpinner] = useState(false); 
const [user_id,setUser]=useState('');
const [previd,setPrev]=useState('');
const [sinnglePermission,setSinglePermission]=useState('');
const [module_id,setModuleName]=useState('');
const [previlage_id,setPrevilage]=useState('');
const [addPermission,setAddpermission]=useState('');
// console.log(user_id,module_id)
const navigate=useNavigate();

// console.log(userList);
// console.log(sinnglePermission)

 //Get from localstorage user_details data
 const UserD=JSON.parse(localStorage.getItem("UserDetails"));
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

const [selectedPrivileges, setSelectedPrivileges] = useState([]);
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

const [sUserId, setSUserId] = useState(null);
const [sPrevId, setSPrevId] = useState(null);
const [permittype, setPermitType] = useState(null);
const [isSubscribed, setIsSubscribed] = useState(false);

const handleChange = event => {
  const selectData = event.target.value;
  let sData;

  if (event.target.checked) {
    sData = selectData + "_A";
    alert(sData);
  } else {
    sData = selectData + "_D";
    alert(sData);
  }

  // Split sData into two parts based on underscore
  const [userId, prevId, type] = sData.split('_');
  setSUserId(userId);
  setSPrevId(prevId);
  setPermitType(type);

  setIsSubscribed(current => !current);
};

// Rest of your component...

// You can now use sUserId, sPrevId, and permittype throughout your component
console.log('sUserId:', sUserId);
console.log('sPrevId:', sPrevId);
console.log('permittype:', permittype);
      

     
     // after select data delete or new add



const permissionAdded = (event) => {
  const MODULE_ID = module_id;
  const ACCESS_BY = sUserId;
  const PERMITTED_BY = PERSONAL_ID;
  const PERMIT=permittype;
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
      PERMIT
    };

    console.log(permissions);

    const url = 'http://localhost:5000/api/create-permission-new';
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

useEffect(() => {
  // Check if previd is 1 or truthy
  if (sPrevId === '1' || sPrevId === '2' || sPrevId === '3' || sPrevId === '4' ) {
    permissionAdded();
  }
}, [sPrevId]);


if (addPermission ==="Permission Successfully") {
  navigate('/permission-user-list');
  alert("Successfully Permission Update Done");
}






 const test = "01700000181-3-D-A";

// Split the string using the hyphen as the delimiter
const values = previd.split('-');

// Extract individual values
const userId = values[0];    // "01700000181"
const moduleNumber = values[1];  // "3"
const permissionType = values[2];  // "D"
const permit = values[3];    // "A"

console.log(previd)
if(userId){
alert('vai amr ghum vangce');

}

// console.log('User ID:', userId);
// console.log('Module Number:', moduleNumber);
// console.log('Permission Type:', permissionType);
// console.log('Permit:', permit);
      // Assuming response.data?.permission_list is an array of objects

      // if(sinnglePermission){
      //   const permission = sinnglePermission?.find(item => item?.module_id === moduleNumber);
  
      //   // Check if the permission is found
      //   if (permission) {
      //     const p_read = permission?.p_read;
      //     const p_create = permission?.p_create;
      //     const p_edit = permission?.p_edit;
      //     const p_delete = permission?.p_delete;
        
      //     console.log('p_read:', p_read);
      //     console.log('p_create:', p_create);
      //     console.log('p_edit:', p_edit);
      //     console.log('p_delete:', p_delete);
      //   } else {
      //     console.log('Permission not found for the specified module_id.');
      //   }
      // }
   






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
                    <input id="mod_name" onChange={(e) => setModuleName(e.target.value)} type="checkbox" 
                    value={modulename?.Module_id} name="mod_name" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="mod_name" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{modulename?.Module_name}</label>
                    </div>
                  ))}
                 </div>
               </div>
                } 

                 {userList.length>1 &&
                  <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>

                   {userList?.map((prev, i) => (
                     <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">

                     <div key={i}  class="flex items-center ps-2  rounded dark:border-gray-700">
                    {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                    <label for="y" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{prev?.name}</label>
                    </div>
                     
                     <div>

                    
                     <div key={i} className="flex items-center ps-2 rounded dark:border-gray-700">
                    <input
                     onChange={handleChange}
                    id={`bordered-checkbox-${i}-read`}
                    type="checkbox"
                    value={`${prev?.personal_id}_1`}
                    name="bordered-checkbox"
                    checked={prev?.p_read===1}
                    // defaultChecked={prev?.p_read===1?true:false}
                    className="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />

                    <label
                      htmlFor={`a-${i}-read`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_read ? "READ" : "READ"}
                    </label>

                    <input
                       onChange={handleChange}               
                      id={`bordered-checkbox-${i}-create`}
                      type="checkbox"
                      value={`${prev?.personal_id}_2`}
                      name="bordered-checkbox"
                      checked={prev?.p_create===2}
                      // defaultChecked={prev?.p_create===2?true:false}
                      className="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${i}-create`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_create ? "CREATE" : "CREATE"}
                    </label>

                    <input
                        onChange={handleChange} 
                      id={`bordered-checkbox-${i}-edit`}
                      type="checkbox"
                      value={`${prev?.personal_id}_3`}
                      name="bordered-checkbox"
                      checked={prev?.p_edit===3}
                      // defaultChecked={prev?.p_edit===3?true:false}
                      className="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${i}-edit`}
                      className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                      {prev?.p_edit ? "EDIT" : "EDIT"}
                    </label>

                    <input
                      onChange={handleChange}  
                      id={`bordered-checkbox-${i}-delete`}
                      type="checkbox"
                      value={`${prev?.personal_id}_4`}
                      name="bordered-checkbox"
                      checked={prev?.p_delete===4?true:false}

                      // defaultChecked={prev?.p_delete===4?true:false}
                      className="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`bordered-checkbox-${i}-delete`}
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
       </div>
    );
};

export default Modulelist;