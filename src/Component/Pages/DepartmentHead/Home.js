import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import user from "../../../assets/icon/user.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
const Home = () => {
  const [Dept_head, setDept_head] = useState("");
  const [moduleList, setModueleList] = useState([]);
  const [spinner, setSpinner] = useState(false);

  console.log(moduleList.length);

  const dept_name = Dept_head?.department_name;
  //Get from localstorage user_details data
  const UserD = JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID = UserD?.PERSONALID;
  const NAME = UserD?.NAME;

  // Department Head Details
  const departmentHeadList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/department-head/${PERSONAL_ID}`
      );
      setDept_head(response.data?.dept_head_details);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    departmentHeadList();
  }, []);
  // Department Head Details

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

  return (
    <div className="">
      <Navbar />
      <h1 className="mt-5">Welcome To Department Head Panel</h1>

      <div className="p-2 lg:p-5 lg:px-48">
        <div className=" shadow p-3 w-full lg:w-1/4 mt-5 mx-auto lg:p-3  rounded-lg text-center">
          <div className="flex justify-center">
            <img
              className="lg:w-20   w-16   shadow-lg bg-white rounded-full p-1 
                 lg:block"
              src={user}
            />
          </div>
          <h1 className="mt-4">
            {" "}
            <span className="font-bold">{NAME}</span> <br />{" "}
            <span className="text-sm">({PERSONAL_ID})</span>
            <br /> <span className="text-sm font-bold-none">
              {dept_name}{" "}
            </span>{" "}
          </h1>
        </div>

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
        {moduleList.length >= 1 && (
          <div class="grid grid-cols-2 mt-5 lg:grid-cols-6 gap-2 flex  justify-center">
            {moduleList?.map((mName, i) => (
              <Link key={i} to={"#"}>
                <div class=" shadow-md bordered text-white rounded p-2 lg:p-4 rounded bordered  bg-[#0E9F6E] max-w-sm">
                  <h5 className="font-normal mt-1">{mName?.Module_name}</h5>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
