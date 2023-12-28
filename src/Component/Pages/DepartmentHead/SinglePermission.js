import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { Button } from "flowbite-react";

const SinglePermission = () => {
  const [permission, setPermissionDetails] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  console.log(selectedPermissions);
  const { id, name } = useParams();

  // fetch userlist module list
  const PrevList = async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/single-privilage-list/${id}/${name}`
      );
      setPermissionDetails(response.data?.permission_list);
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id && name) {
      PrevList();
    }
  }, [id, name]);

  // handle checkbox change
  const handleCheckboxChange = (permissionId) => {
    // Check if the permission is already selected
    if (selectedPermissions.includes(permissionId)) {
      // Remove the permission from the selectedPermissions array
      setSelectedPermissions((prev) =>
        prev.filter((id) => id !== permissionId)
      );
    } else {
      // Add the permission to the selectedPermissions array
      setSelectedPermissions((prev) => [...prev, permissionId]);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="shadow w-1/5 mx-auto p-3 mt-5 font-bold rounded text-center">
        UPDATE USER PERMISSIONS
      </h1>

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

      {permission?.map((p, i) => (
        <div key={i} className=" p-3 w-full lg:w-1/4 mt-5 mx-auto  text-center">
          <div class="max-w-xl p-6 bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
            <h1 className="font-bold text-lg">
              {p?.name} <span className="text-sm">( {p?.dep_name})</span>{" "}
            </h1>
            <h1 className="font-bold mt-5 text-center">
              Module Name: {p?.module_name}
            </h1>

            <h1 class="px-0 py-5 text-center">
              <span
                className={`ml-1 text-white bg-[#00838F] rounded p-2 ${
                  selectedPermissions.includes(1) ? "bg-[#DD2C00]" : ""
                }`}
                onClick={() => handleCheckboxChange(1)}
              >
                {p?.p_read === 1 ? "VIEW" : "NO"}
              </span>
              <span
                className={`ml-1 text-white bg-[#00838F] rounded p-2 ${
                  selectedPermissions.includes(2) ? "bg-[#DD2C00]" : ""
                }`}
                onClick={() => handleCheckboxChange(2)}
              >
                {p?.p_create === 2 ? "CREATE" : "NO"}
              </span>
              <span
                className={`ml-1 text-white bg-[#00838F] rounded p-2 ${
                  selectedPermissions.includes(3) ? "bg-[#DD2C00]" : ""
                }`}
                onClick={() => handleCheckboxChange(3)}
              >
                {p?.p_edit === 3 ? "EDIT" : "NO"}
              </span>
              <span
                className={`ml-1 text-white bg-[#00838F] rounded p-2 ${
                  selectedPermissions.includes(4) ? "bg-[#DD2C00]" : ""
                }`}
                onClick={() => handleCheckboxChange(4)}
              >
                {p?.p_delete === 4 ? "DELETE" : "NO"}
              </span>
            </h1>
            <div className="w-32 rounded-md flex  justify-center mx-auto">
              <button
                type="button"
                class="px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
              >
                UPDATE
              </button>
              <button
                color="failure"
                type="button"
                class="px-3 ml-1 py-2 text-xs font-medium text-center text-white bg-[#DD2C00] rounded hover:bg-[#BF360C] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SinglePermission;
