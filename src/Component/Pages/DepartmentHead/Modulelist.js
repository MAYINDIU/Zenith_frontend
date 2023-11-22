import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Nabar/Navbar';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from 'flowbite-react';

const Modulelist = () => {
const[moduleList,setModueleList]=useState(['']);
const[userList,setUserList]=useState(['']);
const[previlageList,setPrevilagelsit]=useState(['']);
const [spinner, setSpinner] = useState(false); 
const [user_id,setUser]=useState('');
const [module_id,setModuleName]=useState('');
const [previlage_id,setPrevilage]=useState('');
console.log(user_id,module_id,previlage_id)


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

    return (
        <div>
         <Navbar/>
         <h1 className='shadow-lg w-64 mx-auto p-3 mt-5 font-bold rounded text-center'>MODULE PERMISSION</h1>
         <h1 className='mt-5 text-green-700'></h1>
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
                <div class="p-2 grid grid-cols-4  mt-0 lg:grid-cols-4 gap-3">
                  {previlageList?.map((prev, i) => (
                  <div class="mx-auto items-center ps-2  rounded dark:border-gray-700">
                    <input  onChange={(e) => setPrevilage(e.target.value)} id="bordered-checkbox-1" type="checkbox" value={prev?.prev_id} name="bordered-checkbox" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="bordered-checkbox-1" class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">{prev?.prev_name}</label>
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
                <Button   type='submit' color="success">Add Permission</Button>
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