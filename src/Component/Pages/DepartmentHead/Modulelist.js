import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Nabar/Navbar";
import { ThreeCircles } from "react-loader-spinner";
import { Button, Label, Radio, Toast } from "flowbite-react";
import Userlist from "./Userlist";
import {
  useCreatePermissionMutation,
  useGetProjectPrevlistQuery,
  useGetRolePrevlistQuery,
  useGetUserprivilagelistQuery,
} from "../../../features/api/dept_head_api";
import { clear } from "@testing-library/user-event/dist/clear";

const Modulelist = () => {
  const [moduleList, setModueleList] = useState([""]);
  const [spinner, setSpinner] = useState(false);
  const [user_id, setUser] = useState("");
  const [previd, setPrev] = useState("");
  const [sinnglePermission, setSinglePermission] = useState("");
  const [module_id, setModuleName] = useState("");
  const [previlage_id, setPrevilage] = useState("");
  const [addPermission, setAddpermission] = useState("");
  const [permissionType, setPermissionType] = useState("");
  // console.log(projectprevList)
  const navigate = useNavigate();

  //Get from localstorage user_details data
  const UserD = JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID = UserD?.PERSONALID;

  const DEPT_CODE = UserD?.DEPT_CODE;

  // fetch permitted dept-head module list
  const ModuleList = async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/dept-head-pmodule-list/${PERSONAL_ID}`
      );
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

  const handleChange = (event) => {
    const selectData = event.target.value;
    let sData;
    if (event.target.checked) {
      sData = selectData + "_A";
    } else {
      sData = selectData + "_D";
    }
    const [userId, prevId, type] = sData.split("_");
    setSUserId(userId);
    setSPrevId(prevId);
    setPermitType(type);
  };

  const [
    createPermission,
    { data: permission, error: permissionError, isSuccess },
  ] = useCreatePermissionMutation();
  // Create a new user
  const handleCreateUser = (e) => {
    const MODULE_ID = module_id;
    const ACCESS_BY = sUserId;
    const PERMITTED_BY = PERSONAL_ID;
    const PROCESS = permittype;
    const TYPE = permissionType;
    const PRIVILAGE_ID = sPrevId;

    if (MODULE_ID === "" || ACCESS_BY === "") {
      alert("Please select Module and Access User");
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

    // console.log(permissions)
    createPermission(permissions)
      .then((data) => {})
      .catch((error) => {
        // Handle the error
        console.error("Error creating permission:", error);
      });
  };

  useEffect(() => {
    // Check if sPrevId is not null before calling handleCreateUser

    if (sPrevId !== null) {
      const done = async () => {
        await handleCreateUser();
        setSUserId(null);
        setSPrevId(null);
        setPermitType(null);
      };
      done();
    }
  }, [sPrevId]);

  if (addPermission === "Permission Successfully") {
    // navigate('/permission-user-list');
  }

  // console.log(module_id,DEPT_CODE)
  // 1-user permission list get data-----------------
  const [privilageList, setPrivilageList] = useState([]);

  const { data, isLoading, isError } = useGetUserprivilagelistQuery(
    { module_id, DEPT_CODE },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (data) {
      setPrivilageList(data);
    }
  }, [data]);

  //2-project privilage data get data--------------------
  const { data: projectPrevList } = useGetProjectPrevlistQuery(module_id);

  const [stateProjectPrevList, setStateProjectPrevList] = useState([""]);
  useEffect(() => {
    if (projectPrevList) {
      setStateProjectPrevList(projectPrevList);
    }
  }, [projectPrevList]);
  // project privilage data get data--------------------

  return (
    <div>
      <Navbar />
      <h1 className="shadow-lg lg:w-1/3 mx-auto p-3 mt-5 font-bold rounded text-center">
        MODULE PERMISSION DEPARTMENT HEAD TO DESK USER
      </h1>
      <h1 className="mt-5 text-green-700">{addPermission}</h1>

      <div class="p-4 grid grid-cols-1 shadow-md rounded    mt-0 lg:grid-cols-2 gap-0  w-full lg:w-[600px] justify-center  lg:mx-auto lg:mt-2">
        <div className="flex items-center gap-2">
          <Radio
            onChange={(e) => setPermissionType(e.target.value)}
            id="permission"
            name="countries"
            value={"USER"}
          />
          <Label htmlFor="permission">USER WISE PERMISSION</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(e) => setPermissionType(e.target.value)}
            id="permission"
            name="countries"
            value={"PROJECT"}
          />
          <Label htmlFor="permission">PROJECT WISE PERMISSION</Label>
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

      {permissionType === "USER" && (
        <div>
          <div class=" w-full lg:w-[1500px] justify-center lg:mx-auto lg:mt-2">
            <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
              <form className="flex  flex-col gap-4">
                <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
                  {moduleList.length > 0 && (
                    <div className="lg:w-full w-full">
                      <h1 className="shadow-xl p-2 text-white bg-[#2E7D32] rounded">
                        SELECT MODULE
                      </h1>
                      <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                        {moduleList?.map((modulename, u) => (
                          <div key={u} className="flex items-center gap-2">
                            <Radio
                              onChange={(e) => setModuleName(e.target.value)}
                              id="permission"
                              name="countries"
                              value={modulename?.Module_id}
                            />
                            <Label htmlFor="permission">
                              {modulename?.Module_name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {privilageList?.length > 1 && (
                    <div className="lg:w-full w-full">
                      <h1 className="shadow-xl p-2 text-white bg-[#2E7D32] rounded">
                        SELECT USER
                      </h1>

                      {privilageList?.map((prev, u) => (
                        <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2">
                          <div
                            key={u}
                            class="flex items-center ps-2  rounded dark:border-gray-700"
                          >
                            {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                            <label class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">
                              {prev?.name}
                            </label>
                          </div>

                          <div>
                            <div
                              key={u}
                              className="flex items-center ps-2 rounded dark:border-gray-700"
                            >
                              <input
                                onClick={handleChange}
                                id={`bordered-checkbox-${u}-u-read`}
                                type="checkbox"
                                value={`${prev?.personal_id}_1`}
                                name="bordered-checkbox"
                                checked={prev?.p_read === 1}
                                // defaultChecked={prev?.p_read === 1 ?? false}
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
                                checked={prev?.p_create === 2}
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
                                checked={prev?.p_edit === 3}
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
                                checked={prev?.p_delete === 4}
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
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {permissionType === "PROJECT" && (
        <div>
          <div class=" w-full lg:w-[1500px] justify-center lg:mx-auto lg:mt-2">
            <div class="block shadow-xl lg:w-full  bordered rounded p-3 lg:p-5 rounded-xl border-gray bordered-sm bg-white">
              <form className="flex  flex-col gap-4">
                <div class="p-2 grid grid-cols-1 mt-2 lg:grid-cols-2 gap-5">
                  {moduleList.length > 0 && (
                    <div className="lg:w-full w-full">
                      <h1 className="shadow-xl p-2 text-white bg-[#2E7D32] rounded">
                        SELECT MODULE
                      </h1>
                      <div class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-1 gap-3">
                        {moduleList?.map((modulename, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Radio
                              color="success"
                              onChange={(e) => setModuleName(e.target.value)}
                              id="permission"
                              name="countries"
                              value={modulename?.Module_id}
                            />
                            <Label htmlFor="permission">
                              {modulename?.Module_name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {stateProjectPrevList.length > 1 && (
                    <div className="lg:w-full w-full">
                      <h1 className="shadow-xl p-2 text-white bg-[#2E7D32] rounded">
                        SELECT USER
                      </h1>

                      {stateProjectPrevList?.map((projectName, i) => (
                        <div
                          key={i}
                          class="p-2 grid grid-cols-1  mt-0 lg:grid-cols-2 gap-2"
                        >
                          <div class="flex items-center ps-2 rounded dark:border-gray-700">
                            {/* <input  onChange={(e) => setUser(e.target.value)} id="y" type="checkbox" value={prev?.personal_id} name="y" class="w-4 h-4 text-dark bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                            <label class="w-full py-1 ml-2 text-left ms-2 text-sm font-sm text-dark dark:text-gray-300">
                              {projectName?.project_name}
                            </label>
                          </div>

                          <div>
                            <div className="flex items-center ps-2 rounded dark:border-gray-700">
                              <input
                                onChange={handleChange}
                                id={`bordered-checkbox-${i}-p-read`}
                                type="checkbox"
                                value={`${projectName?.project_id}_1`}
                                name="bordered-checkbox"
                                checked={projectName?.p_read === 1}
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
                                checked={projectName?.p_create === 2}
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
                                checked={projectName?.p_edit === 3}
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
                                checked={
                                  projectName?.p_delete === 4 ? true : false
                                }
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
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
