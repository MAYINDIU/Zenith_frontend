import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";
import {
  useGetAgentlistQuery,
  useGetBranchlistQuery,
  useGetDistrictlisttQuery,
  useGetProjectlistQuery,
  useGetThanalistQuery,
} from "../../../features/api/proposal";
import axios from "axios";

const Index = () => {
  const [projectId, setProjectId] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStaus] = useState("");
  const [agentValue, setAgentValue] = useState("");
  const [proposalNo, setProposalNo] = useState("");
  const [chainlist, setChainList] = useState([]);
  const [proposalInfo, setProposalInfo] = useState([]);
  const [proposal_date, setProposalDate] = useState();
  const [district, setDistrict] = useState();
  const [thana, setThana] = useState();
  const [risk_date, setRiskdate] = useState();

  const formatAsMMDDYYYY = (dateString) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleClearClick = () => {
    // Check for any actions causing a page reload
    window.location.reload(); // Remove this line if present
    // ... other logic
  };

  const handleproposalDateChange = (e) => {
    setProposalDate(e.target.value);
  };
  const handleriskDateChange = (e) => {
    setRiskdate(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.proposal_date) {
      setProposalDate(formatAsMMDDYYYY(proposalInfo[0]?.proposal_date));
    }
  }, [proposalInfo]);
  useEffect(() => {
    if (proposalInfo[0]?.risk_date) {
      setRiskdate(formatAsMMDDYYYY(proposalInfo[0]?.risk_date));
    }
  }, [proposalInfo]);

  useEffect(() => {
    if (proposalInfo[0]?.marital_status) {
      setMaritalStaus(proposalInfo[0]?.marital_status);
    }
  }, [proposalInfo]);

  useEffect(() => {
    if (proposalInfo[0]?.sex) {
      setGender(proposalInfo[0]?.sex);
    }
  }, [proposalInfo]);

  useEffect(() => {
    if (proposalInfo[0]?.pd_code) {
      setProjectId(proposalInfo[0]?.pd_code);
    }
  }, [proposalInfo]);

  useEffect(() => {
    if (proposalInfo[0]?.agent_id) {
      setAgentValue(proposalInfo[0]?.agent_id);
    }
  }, [proposalInfo]);

  const handleAgentChange = (e) => {
    setAgentValue(e.target.value);
  };

  const proposer = proposalInfo[0]?.proposer;
  // get proposal informations
  const handleProposalNo = (e) => {
    const newValue = e.target.value;
    setProposalNo(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/proposal-info?proposal_no=${proposalNo}`
        );
        setProposalInfo(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [proposalNo]);
  // get proposal informations

  // get chainlist

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chain-list/${projectId}/${agentValue}`
        );
        setChainList(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [projectId, agentValue]);
  // get chainlist

  const { data: branchList, isLoading, isError } = useGetBranchlistQuery();
  const { data: projectList, isLoadingg, isErrorr } = useGetProjectlistQuery();
  const { data: agentList } = useGetAgentlistQuery(projectId);
  const { data: districtList } = useGetDistrictlisttQuery();
  const { data: thanaList } = useGetThanalistQuery(district);
  console.log(thanaList);

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
      <h1 className=" shadow-lg text-dark w-full px-5 lg:w-72  mx-auto p-2 mt-5 rounded text-center">
        PROPOSAL ENTRY FORM
      </h1>

      <div className="lg:mx-48 mt-3">
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
        <div className="shadow-lg border lg:mx-48 mt-1 m-2 ">
          <div class="p-4 flex grid grid-cols-1       mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-2">
            <div className="justify-center  flex gap-2">
              <div className="flex items-center gap-2">
                <Radio
                  select
                  id="permission"
                  name="countries"
                  value={"inforce"}
                />
                <Label className="text-xs lg:text-sm" htmlFor="permission">
                  CURRENT POLICY
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
                className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                onChange={handleProposalNo}
                placeholder="Enter Proposal No"
              />
            </div>
            <div className="text-center flex w-full  mt-2 lg:mt-0">
              <button
                onClick={handleClearClick}
                type="button"
                class="focus:outline-none  text-xs lg:text-md ml-7 mt-1 lg:ml-20  w-32 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                CLEAR
              </button>
              <button
                type="button"
                class="w-801 lg:w-62 mr-12 ml-3 text-xs lg:text-md mt-1 lg:mr-0 lg:ml-5  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                UNDERWRITING PREVIEW
              </button>
            </div>
          </div>
          <hr />

          <div class="p-1 mb-0 flex grid grid-cols-1 rounded  mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
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
              <label className="text-start text-xs">SELECT PROJECT</label>
              <select
                onChange={(e) => setProjectId(e.target.value)}
                className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                value={projectId}
              >
                {projectList?.map((project, i) => (
                  <option key={i} value={project?.project_code}>
                    {project?.project_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-start px-2">
              <label className="text-start text-xs">SELECT AGENT</label>
              <select
                onChange={(e) => setAgentValue(e.target.value)}
                className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                value={agentValue}
              >
                {agentList?.map((agent, i) => (
                  <option key={i} value={agent?.agent_code}>
                    {agent?.agent_name}- {agent?.agent_code}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-start px-2">
              <label className="text-start text-xs">PROPOSAL DATE</label>
              {proposalInfo[0]?.proposal_date ? (
                <input
                  type="text"
                  id="success"
                  value={proposal_date}
                  className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                  onChange={handleproposalDateChange}
                />
              ) : (
                <input
                  type="date"
                  id="success"
                  value={proposal_date}
                  className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                  onChange={handleproposalDateChange}
                />
              )}
            </div>
            <div className="text-start px-2">
              <label className="text-start text-xs">COMMENCEMENT DATE</label>
              {proposalInfo[0]?.risk_date ? (
                <input
                  type="text"
                  id="success"
                  class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                  value={risk_date}
                  onChange={handleriskDateChange}
                />
              ) : (
                <input
                  type="date"
                  id="success"
                  class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                  value={risk_date}
                  onChange={handleriskDateChange}
                />
              )}
            </div>

            {/* 
            <div className="text-start px-2">
              <label className="text-start text-xs">AGENT</label>
              <input
                type="text"
                id="success"
                className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                value={agentValue}
                onChange={handleAgentChange}
              />
            </div> */}
          </div>

          <div className="shadow-lg m-2 border mt-5">
            <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
              <div className="text-start px-0">
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start px-2">
                    <label className="text-start text-xs">GENDER</label>

                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      {gender === "1" && <option value="1">MALE</option>}
                      {gender === "2" && <option value="2">FEMALE</option>}
                      {gender !== "1" && gender !== "2" && (
                        <>
                          <option value="1">MALE</option>
                          <option value="2">FEMALE</option>
                          <option value="3">OTHERS</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="text-start px-2">
                    <label className="text-start text-xs">MARITAL STATUS</label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full ">
                      {maritalStatus === "" && (
                        <option value="1">Select</option>
                      )}

                      <option value={"name"}>SINGLE</option>
                      <option value={"name"}>MARRIED</option>
                      <option value={"name"}>WIDOWED</option>
                      <option value={"name"}>DEVORCED</option>
                    </select>
                  </div>
                </div>

                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">PROPOSER</label>
                    <input
                      type="text"
                      id="success"
                      value={proposer ? proposer : ""}
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      placeholder="TYPE POLICY HOLDER NAME"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">HUSBAND/WIFE</label>
                    <input
                      type="text"
                      id="success"
                      value={
                        proposalInfo[0]?.fatherhusb
                          ? proposalInfo[0]?.fatherhusb
                          : ""
                      }
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      placeholder="TYPE SPOUSE'S NAME"
                    />
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">FATHER</label>

                    <input
                      type="text"
                      id="success"
                      value={
                        proposalInfo[0]?.fathers_name
                          ? proposalInfo[0]?.fathers_name
                          : ""
                      }
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      placeholder="TYPE FATHER'S NAME"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">MOTHER</label>
                    <input
                      type="text"
                      id="success"
                      value={
                        proposalInfo[0]?.mothers_name
                          ? proposalInfo[0]?.mothers_name
                          : ""
                      }
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
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
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          placeholder="NAME"
                        />
                      </div>
                    </div>
                    <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <input
                          type="text"
                          id="success"
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          placeholder="DOB"
                        />
                      </div>

                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <input
                          type="text"
                          id="success"
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          placeholder="AGE"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="m-3 shadow-lg">
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-2">
                          CHAIN NAME
                        </th>
                        <th scope="col" class="px-4 py-2">
                          CHAIN CODE
                        </th>
                        <th scope="col" class="px-4 py-2">
                          CHAIN DESIGNATION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {chainlist?.map((chain, i) => (
                        <tr
                          key={i}
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td class="px-4 py-2">{chain?.chain_name}</td>
                          <td class="px-4 py-2">{chain?.chain_code}</td>
                          <td class="px-4 py-2">{chain?.chain_designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-lg m-2 border">
            <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
              <div className="text-start px-0">
                <div className="text-start">
                  <div className="shadow-lg border m-2 rounded p-2">
                    <label className="text-sm font-bold text-center p-2">
                      PRESENT ADDRESS
                    </label>
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="bg-white  align-items-center m-1  lg:mt-0">
                        <label className="align-items-center  text-xs">
                          F/H/R/VILLAGE
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.address1}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>

                    <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          SELECT DISTRICT
                        </label>
                        <select
                          onChange={(e) => setDistrict(e.target.value)}
                          value={district}
                          className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
                        >
                          {districtList?.map((district, i) => (
                            <option key={i} value={district?.div_code}>
                              {district?.division_name} - {district?.div_code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          SELECT THANA
                        </label>
                        <select
                          onChange={(e) => setThana(e.target.value)}
                          value={thana}
                          className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
                        >
                          {thanaList?.map((thana, i) => (
                            <option key={i} value={thana?.thana_code}>
                              {thana?.thana_name} - {thana?.thana_code}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <label className="align-items-center  text-xs">
                          P. OFFICE
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.city}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-start px-0">
                <div className="text-start">
                  <div className="shadow-lg border m-2 rounded p-2">
                    <label className="text-sm font-bold text-center p-2">
                      PERMANENT ADDRESS
                    </label>
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="bg-white  align-items-center m-1  lg:mt-0">
                        <label className="align-items-center  text-xs">
                          F/H/R/VILLAGE
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.address1}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>

                    <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                      <div className="bg-white  align-items-center m-1  lg:mt-0">
                        <label className="align-items-center  text-xs">
                          DISTRICT
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.address2}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>

                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <label className="align-items-center  text-xs">
                          THANA
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.city}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>

                      <div className="bg-white align-items-center m-1  lg:mt-0">
                        <label className="align-items-center  text-xs">
                          P. OFFICE
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.city}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-xl m-2 ">
            <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
              <div className="text-start px-0">
                <div className="text-start">
                  <div className="shadow-lg border m-2 rounded p-2">
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="w-36 font-bold mt-4 text-xs">
                          ID TYPE & NUMBER{" "}
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.nid_number}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>

                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="bg-white flex  align-items-center m-1  lg:mt-0">
                        <label className="w-36 font-bold  mt-4 text-xs">
                          E-TIN NUMBER{" "}
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.nid_number}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-start px-0">
                <div className="text-start">
                  <div className="text-start px-0">
                    <div className="shadow-lg border m-2 rounded p-2">
                      <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                        <div className="bg-white flex align-items-center m-1  lg:mt-0">
                          <label className="w-28 mt-4 font-bold text-xs">
                            MOB. NO.{" "}
                          </label>
                          <input
                            type="text"
                            id="success"
                            value={proposalInfo[0]?.mobile}
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          />
                        </div>
                        <div className="bg-white flex  align-items-center m-1  lg:mt-0">
                          <label className="w-20  mt-4 font-bold text-xs">
                            TEL NO.{" "}
                          </label>
                          <input
                            type="text"
                            id="success"
                            value={proposalInfo[0]?.nid_number}
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          />
                        </div>
                      </div>
                      <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                        <div className="bg-white flex align-items-center m-1  lg:mt-0">
                          <label className="w-24 mt-4 font-bold text-xs">
                            EMAIL{" "}
                          </label>
                          <input
                            type="text"
                            id="success"
                            value={proposalInfo[0]?.nid_number}
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          />
                        </div>
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
