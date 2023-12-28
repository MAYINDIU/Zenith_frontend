import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import user from "../../../assets/icon/user.png";
import { Link } from "react-router-dom";
import { Button, Label, Radio, Toast } from "flowbite-react";
import { green } from "@mui/material/colors";
import { ThreeCircles } from "react-loader-spinner";
const Home = () => {
  const [Dept_head, setDept_head] = useState("");
  const [projectList, setProjetList] = useState([""]);
  const [ModulepermitList, setModuleList] = useState([""]);
  const [projectid, setProject] = useState("");
  const [spinner, setSpinner] = useState(false);

  console.log(ModulepermitList);

  const handleChange = (e) => {
    setProject(e.target.value);
  };
  const dept_name = Dept_head?.department_name;
  //Get from localstorage user_details data
  const UserD = JSON.parse(localStorage.getItem("UserDetails"));
  const PERSONAL_ID = UserD?.PERSONALID;
  const prjct = UserD?.PROJECT;
  const NAME = UserD?.NAME;
  const role_name = UserD?.ROLE_NAME;

  useEffect(() => {
    if (projectList?.length <= 1) {
      const extractedProjectIds = projectList?.map(
        (project) => project.PROJECT_ID
      );
      setProject(extractedProjectIds);
    }
  }, [projectList]);

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

  // Project List
  const projectpermissionList = async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/project-list/${PERSONAL_ID}`
      );
      setProjetList(response.data?.project_list);
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    projectpermissionList();
  }, []);
  // Project List

  // Module List
  const moduleList = async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/permission-module-list/${PERSONAL_ID}/${projectid}`
      );
      setModuleList(response?.data);
      setSpinner(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    moduleList();
  }, [PERSONAL_ID, projectid]);
  // Module List

  return (
    <div>
      <Navbar />
      <h1 className="mt-5">Welcome To dashboard</h1>

      <div className="shadow p-3 w-full lg:w-1/4 mt-5 mx-auto lg:p-3  rounded-lg text-center">
        <div className="flex justify-center">
          <img
            className="lg:w-20   w-16   shadow-lg bg-white rounded-full p-1 lg:block"
            src={user}
          />
        </div>
        <h1 className="mt-4">
          {" "}
          <span className="font-bold">{NAME}</span> <br />{" "}
          <span className="text-sm">({PERSONAL_ID})</span>
          <br /> <span className="text-sm font-bold">{role_name} </span>
          <span className="text-sm font-bold-none">{dept_name} </span>
        </h1>
      </div>
      <div className="flex justify-center mb-2 mt-2 ">
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
        {projectList?.length > 1 && (
          <div class="p-3 grid grid-cols-1 shadow-md rounded   mt-3 lg:grid-cols-2 gap-0  w-full lg:w-[600px] justify-center lg:mx-auto lg:mt-2">
            {projectList?.map((project, i) => (
              <div className="flex items-center gap-2">
                <Radio
                  onChange={(e) => setProject(e.target.value)}
                  id="permission"
                  name="countries"
                  value={project?.PROJECT_ID}
                />
                <Label htmlFor="permission">
                  {"Project-" + project?.PROJECT_ID}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-content-center">
        <div className="flex mx-auto">
          {ModulepermitList?.length > 1 &&
            ModulepermitList?.map((mName, i) => (
              <Link key={i} to="#">
                <div className="mt-3 ml-2">
                  <Button color="success">{mName?.MODULE_NAME}</Button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
