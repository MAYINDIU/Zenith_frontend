import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Nabar/Navbar';
import { ThreeCircles } from 'react-loader-spinner';
import { Button, Toast } from 'flowbite-react';

const Modulelist = () => {
const[moduleList,setModueleList]=useState(['']);
const[userList,setUserList]=useState(['']);
const[previlageList,setPrevilagelsit]=useState(['']);
const [spinner, setSpinner] = useState(false); 
const [user_id,setUser]=useState('');
const [module_id,setModuleName]=useState('');
const [previlage_id,setPrevilage]=useState('');
const [addPermission,setAddpermission]=useState('');
console.log(user_id,module_id,previlage_id)
const navigate=useNavigate();

 //Get from localstorage user_details data
 const UserD=JSON.parse(localStorage.getItem("UserDetails"));
 const PERSONAL_ID=UserD?.PERSONALID;

  const DEPT_CODE=UserD?.DEPT_CODE;
// fetch permitted dept-head module list
const ModuleList = async () => {
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
const UserList = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user-list/${DEPT_CODE}`);
      setUserList(response.data?.user_list);
      setSpinner(false); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    UserList();
  }, []);
// fetch userlist module list


// fetch PrevilageList  list
const PrevilageList = async () => {
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

//module permission for desk-employee by department head
// const permissionAdd= event => {
//     event.preventDefault();
//     const MODULE_ID=module_id;
//     const ACCESS_BY=user_id;
//     const PRIVILAGE_ID=previlage_id;
//     const PERMITTED_BY=PERSONAL_ID;
  
//     if(MODULE_ID===""){
//       alert('Pleasee Select Module');
//     }else if(ACCESS_BY===""){
//       alert('Pleasee Select Access user');
//     }
//     else if(PRIVILAGE_ID===""){
//       alert('Pleasee Select Preivilage');
//     }
//     else{
  
//     const addItem = {MODULE_ID, ACCESS_BY,PRIVILAGE_ID,PERMITTED_BY};

//     console.log(addItem)
//     const url = 'http://localhost:5000/api/create-permission';
//     fetch(url, {
//         method: "POST",
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "content-type": "application/json"
//         },
//         body: JSON.stringify(addItem)
  
//     })
//         .then(Response => Response.json())
//         .then(data => setAddpermission(data));
//         //  setSpinner(true);
     
//       }
    
//   }

//   if(addPermission==='Permission Successfully'){
//     navigate('/permission-user-list');
//   }
//module permission for desk-employee by department head

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
              
                <div className='lg:w-full w-full'>
                  <h1 className='shadow-xl p-2 text-white bg-[#2E7D32] rounded'>SELECT USER</h1>
                   <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                  {userList?.map((user, i) => (
                    <div class="flex items-center ps-2  rounded dark:border-gray-700">
                    <input  onChange={(e) => setUser(e.target.value)} id="bordered-checkbox-1" type="checkbox" value={user?.PERSONAL_ID} name="bordered-checkbox" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{user?.NAME}</label>
                    
                    

                <div className='lg:w-full w-full'>
                <div className="p-2 grid grid-cols-4 mt-0 lg:grid-cols-4 gap-3">
                {previlageList?.map((prev, i) => (
                    <div className="mx-auto items-center ps-2 rounded dark:border-gray-700" key={i}>
                    <input
                        onChange={(e) => handlePrivilegeChange(e, prev.prev_id)}
                        id={`bordered-checkbox-${i}`}
                        type="checkbox"
                        value={prev.prev_id}
                        name="bordered-checkbox"
                        checked={selectedPrivileges.includes(prev.prev_id)}
                        className="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor={`bordered-checkbox-${i}`}
                        className="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300"
                    >
                        {prev.prev_name}
                    </label>
                    </div>
                ))}
                </div>
               </div>
                  
           

                    </div>
                  
              
                  ))}
                 </div>
               </div>
         
            


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