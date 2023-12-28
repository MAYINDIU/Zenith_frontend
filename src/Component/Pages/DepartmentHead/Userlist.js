import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Nabar/Navbar";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [permissionList, setpermissionList] = useState([""]);
  const [spinner, setSpinner] = useState(false);
  //Get from localstorage user_details data
  const UserD = JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID = UserD?.PERSONALID;
  const DEPT_CODE = UserD?.DEPT_CODE;

  // console.log(permissionList)
  // fetch permission list
  const dept_permission_list = async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/permission-list-depthead/${PERSONAL_ID}/${DEPT_CODE}`
      );
      setpermissionList(response.data?.permission_list);
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dept_permission_list();
  }, []);
  //  fetch permission list

  return (
    <div>
      <Navbar />
      <h1 className="shadow w-1/5 mx-auto p-3 mt-5 font-bold rounded text-center">
        DEPARTMENT ALL USER PERMISSION LIST
      </h1>
      <div className="flex justify-center mb-2 mt-5">
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
      {permissionList.length > 1 && (
        <div className="lg:px-48 mt-5">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full border bordered  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white uppercase bg-[#087f23] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-2">
                    SL. NO.
                  </th>
                  <th scope="col" class="px-4 py-3">
                    MODULE ID
                  </th>
                  <th scope="col" class="px-4 py-3">
                    ACCESS USER
                  </th>
                  <th scope="col" class="px-4 py-3">
                    DEPARTMENT
                  </th>
                  <th scope="col" class="px-4 py-3">
                    ROLE
                  </th>
                  <th scope="col" class="px-4 py-3">
                    PERMITTED_BY
                  </th>
                  <th scope="col" class="px-4 py-3">
                    OPERATION
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissionList?.map((p_list, i) => (
                  <tr
                    key={i}
                    class="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800  border bordered dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-4 text-start py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </th>
                    <th
                      scope="row"
                      class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {p_list?.module_name}
                    </th>
                    <td class="px-2 py-3">{p_list?.name}</td>

                    <td class="px-2 py-3">{p_list?.dep_name}</td>
                    <td class="px-2 py-3">
                      <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                        {" "}
                        {p_list?.p_read === 1 ? "VIEW" : "NO"}{" "}
                      </span>
                      <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                        {" "}
                        {p_list?.p_create === 2 ? "CREATE" : "NO"}{" "}
                      </span>
                      <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                        {p_list?.p_edit === 3 ? "EDIT" : "NO"}{" "}
                      </span>
                      <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                        {p_list?.p_delete === 4 ? "DELETE" : "NO"}
                      </span>
                    </td>

                    <td class="px-2 py-3">
                      {UserD?.NAME + " - "} {p_list?.permitted_by}
                    </td>
                    <td class="px-2 py-3">
                      <Link
                        to={`/permission-update=${p_list?.access_by}=${p_list?.module_id}`}
                      >
                        <a
                          href="#"
                          class="font-medium p-2 rounded text-white bg-[#004D40]  dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </Link>
                      <a
                        href="#"
                        class="font-medium p-2 rounded ml-3 text-white bg-[#BF360C]  dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userlist;
