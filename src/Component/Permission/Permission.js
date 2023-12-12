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
const Permission = () => {
 const [deptHeadList,setDeptHeadList]=useState([]);
 const [moduleList,setModuleList]=useState([]);
 const [departmentName,setDepartmentName]=useState('');
 const [moduleName,setModuleName]=useState('');
 const [addPermission,setAddpermission]=useState('');
 const [spinner, setSpinner] = useState(false); 
 const [selectdept,setselectdept]=useState('');
 const [permissionType,setPermissionType]=useState('');
console.log(permissionType)
 const { id,name} = useParams();
const navigate=useNavigate();


// console.log(selectdept)

const user_information=JSON.parse(localStorage.getItem('UserDetails'));
const PERSONAL_ID=user_information?.PERSONALID;


const showToastMessage = () => {
  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_RIGHT,
  });
};
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
         <h1 className='shadow-lg w-64 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION</h1>
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
              <div class="p-2 grid grid-cols-1 shadow-md rounded   mt-0 lg:grid-cols-2 gap-0  w-full lg:w-[650px] justify-center lg:mx-auto lg:mt-2">
              <div className="flex items-center gap-2">
              <Radio onChange={(e) => setPermissionType(e.target.value)} id="permission" name="countries" value={1}  />
              <Label htmlFor="permission">USER WISE PERMISSION</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio onChange={(e) => setPermissionType(e.target.value)} id="permission" name="countries" value={2}  />
              <Label htmlFor="permission">ROLE WISE PERMISSION</Label>
            </div>
         
                 
             </div>

             {permissionType==="1" &&
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
               <div key={i} className="flex items-center gap-2">
               <Radio onChange={(e) => setModuleName(e.target.value)} id="permission" name="countries"
               value={modulename?.Module_id}  />
               <Label htmlFor="permission">{modulename?.Module_name}</Label>
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
                     <input  onChange={(e) => setDepartmentName(e.target.value)} id="bordered-checkbox-1" type="checkbox" value={headname?.dept_head_id} name="bordered-checkbox" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                     <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{headname?.department_name}</label>
                     </div>
               
                   ))}
                  </div>
                </div>
 
 
                 </div>
                 <div className='w-80 rounded-md flex  justify-center mx-auto'>
                 <Button onClick={permissionAdd}  type='submit' color="success">Add Permission</Button>
                 <div  className='ml-2 w-80' ><Button  type='submit' color="failure">Delete Permission</Button></div> 
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