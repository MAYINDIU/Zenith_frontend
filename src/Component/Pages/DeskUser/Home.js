import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import user from "../../../assets/icon/user.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
const Home = () => {
  const [moduleList, setModueleList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  //Get from localstorage user_details data
  const UserD = JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID = UserD?.PERSONALID;
  const NAME = UserD?.NAME;

  console.log(moduleList);

  // fetch permitted dept-head module list
  const ModuleList = async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/deskmodule-list/${PERSONAL_ID}`
      );
      setModueleList(response.data?.module_list);
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    ModuleList();
  }, []);
  // fetch permitted dept-head module list

  return (
    <div>
      <Navbar />
      <h1 className="mt-5">Welcome To User Panel</h1>
      <div className="p-2 lg:p-5 lg:px-48">
        <div className="shadow p-3 w-full lg:w-1/4 mt-5 mx-auto lg:p-3  rounded-lg text-center">
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

        <div className="flex justify-content-center">
          <div class="grid   grid-cols-2 mt-5 lg:grid-cols-6 gap-2 ">
            {moduleList.map((mName, i) => (
              <Link key={i} to="#">
                <div className="shadow-md bordered text-white rounded p-2 lg:p-4 rounded bordered bg-[#0E9F6E] max-w-sm">
                  <h5 className="font-normal mt-1">{mName?.module_name}</h5>
                  <div className="mt-5">
                    <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                      {" "}
                      {mName?.p_read === 1 ? "VIEW" : null}{" "}
                    </span>
                    <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                      {" "}
                      {mName?.p_create === 2 ? "CREATE" : null}{" "}
                    </span>
                    <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                      {mName?.p_edit === 3 ? "EDIT" : null}{" "}
                    </span>
                    <span className="ml-1 text-white bg-[#00838F] rounded p-2">
                      {mName?.p_delete === 4 ? "DELETE" : null}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
