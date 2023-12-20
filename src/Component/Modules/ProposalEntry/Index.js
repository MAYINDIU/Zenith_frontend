import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import {
  useGetBranchlistQuery,
  useGetChainlistQuery,
  useGetProjectlistQuery,
} from "../../../features/api/proposal";

const Index = () => {
  const [projectId, setProjectId] = useState("");

  const { data: branchList, isLoading, isError } = useGetBranchlistQuery();
  const { data: projectList, isLoadingg, isErrorr } = useGetProjectlistQuery();
  const { data: chainList } = useGetChainlistQuery(projectId);

  const [selectedTopbarItem, setSelectedTopbarItem] = useState("PI");

  const handleTopbarItemClick = (item) => {
    setSelectedTopbarItem(item);
  };
  const topbarItems = [
    {
      code: "PI",
      title: "PROPOSAL INFO",
    },
    {
      code: "P",
      title: "PREMIUM INFO",
    },
    {
      code: "PRVM",
      title: "PRVM NOMINEE",
    },
    {
      code: "CD",
      title: "OTHER INFO",
    },
  ];
  return (
    <div>
      <Navbar />
      <h1 className=" shadow-lg text-white w-full px-5 lg:w-60 bg-[#087f23] mx-auto p-2 mt-5 rounded text-center">
        PROPOSAL ENTRY FORM
      </h1>

      <div className="lg:mx-48 mt-2">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-success-200 dark:border-gray-700 dark:text-gray-400">
          {(topbarItems || [])?.map((item, index) => {
            return (
              <li
                key={index}
                className={`border-b-transparent mr-3 px-4 inline-flex items-center gap-2 text-sm font-medium text-center border text-dark rounded-t-lg py-3 border rounded  ${
                  selectedTopbarItem === item.code
                    ? "bg-[#087f23] text-[#fff]"
                    : ""
                }`}
                onClick={() => handleTopbarItemClick(item.code)}
              >
                {" "}
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>

      {selectedTopbarItem === "PI" && (
        <div className="shadow-lg border lg:mx-48 mt-3 m-2 ">
          <div class="p-4 flex grid grid-cols-1       mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-2">
            <div className="justify-center  flex gap-2">
              <div className="flex items-center gap-2">
                <Radio id="permission" name="countries" value={"inforce"} />
                <Label className="text-xs lg:text-sm" htmlFor="permission">
                  INFORCE POLICY
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="permission" name="countries" value={"PROJECT"} />
                <Label className="text-xs lg:text-sm" htmlFor="permission">
                  TP POLICY
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="permission" name="countries" value={"backDate"} />
                <Label className="text-xs lg:text-sm" htmlFor="permission">
                  BACK DATE POLICY
                </Label>
              </div>
            </div>

            <div className="bg-white w-full   mt-3 lg:ml-12 lg:mt-0">
              <input
                type="text"
                id="success"
                class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                placeholder="TYPE PROPOSAL NO."
              />
            </div>

            <div className="text-end w-48 mx-auto mt-2 lg:mt-0">
              <Button
                className="w-40 text-sm justify-end"
                gradientDuoTone="greenToBlue"
              >
                Underwriting Preview
              </Button>
            </div>
          </div>
          <hr />

          <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-4 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
            <div className="text-start px-2">
              <label className="text-start text-xs">PROPOSAL DATE</label>
              <input
                type="date"
                id="success"
                class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                placeholder="Success input"
              />
            </div>
            <div className="text-start px-2">
              <label className="text-start text-xs">COMMENCEMENT DATE</label>
              <input
                type="date"
                id="success"
                class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                placeholder="Success input"
              />
            </div>

            <div className="text-start px-2">
              <label className="text-start text-xs">SELECT PROJECT</label>
              <select
                onChange={(e) => setProjectId(e.target.value)}
                className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full "
              >
                {projectList?.map((project, i) => (
                  <option key={i} value={project?.project_code}>
                    {project?.project_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-start px-2">
              <label className="text-start text-xs">AGENT</label>
              <input
                type="text"
                id="success"
                class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
              />
            </div>
          </div>
          <div class="p-1 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
            <div className="text-start px-2">
              <label className="text-start text-xs">SELECT OFFICE</label>
              <select className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full">
                {branchList?.map((branchName, i) => (
                  <option key={i} value={branchName?.branch_id}>
                    {branchName?.branch_name} - {branchName?.branch_id}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-start px-2">
              <label className="text-start text-xs">AGENT</label>
              <input
                type="text"
                id="success"
                class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
              />
            </div>
          </div>
          <div className="shadow-lg m-2 border">
            <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
              <div className="text-start px-0">
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start px-2">
                    <label className="text-start text-xs">GENDER</label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full ">
                      <option value={"name"}>MALE</option>
                      <option value={"name"}>FEMALE</option>
                    </select>
                  </div>
                  <div className="text-start px-2">
                    <label className="text-start text-xs">MARITAL STATUS</label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full ">
                      <option value={"name"}>SINGLE</option>
                      <option value={"name"}>MARRIED</option>
                      <option value={"name"}>WIDOWED</option>
                      <option value={"name"}>DEVORCED</option>
                    </select>
                  </div>
                </div>

                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                      placeholder="TYPE POLICY HOLDER NAME"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                      placeholder="TYPE SPOUSE'S NAME"
                    />
                  </div>
                </div>
                <div class="p-1 mb-4 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                      placeholder="TYPE FATHER'S NAME"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                      placeholder="TYPE MOTHER'S NAME"
                    />
                  </div>
                </div>
                <div className="text-start">
                  <div className="shadow-lg border m-2 rounded p-2">
                    <label className="text-sm p-2">JOINT LIFE POLICY</label>
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <input
                          type="text"
                          id="success"
                          class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                          placeholder="NAME"
                        />
                      </div>
                    </div>
                    <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <input
                          type="text"
                          id="success"
                          class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                          placeholder="DOB"
                        />
                      </div>

                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <input
                          type="text"
                          id="success"
                          class="form-input rounded text-sm shadow border-[#00897B] mt-0 w-full"
                          placeholder="AGE"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
