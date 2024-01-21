import React, { useEffect, useState } from "react";
import Navbar from "../../Nabar/Navbar";
import { Checkbox, Label, Radio, Table } from "flowbite-react";
import {
  useGetAgentlistQuery,
  useGetBankListQuery,
  useGetBankbranchlistQuery,
  useGetBranchlistQuery,
  useGetCountrylistQuery,
  useGetDistrictlisttQuery,
  useGetEducationListQuery,
  useGetGenderQuery,
  useGetLocallityQuery,
  useGetModelistQuery,
  useGetOccupationlistQuery,
  useGetPlanlistQuery,
  useGetPostofficelistQuery,
  useGetPremiumListQuery,
  useGetProjectlistQuery,
  useGetSupplimentClassListQuery,
  useGetSupplimentListQuery,
  useGetThanalistQuery,
} from "../../../features/api/proposal";
import axios from "axios";
import swal from "sweetalert";

const Index = () => {
  const [projectId, setProjectId] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStaus] = useState("");
  const [agentValue, setAgentValue] = useState("");
  const [proposalNo, setProposalNo] = useState("");
  const [chainlist, setChainList] = useState([]);
  const [proposalInfo, setProposalInfo] = useState([]);
  const [proposal_date, setProposalDate] = useState();
  const [birth_date, setBirthDate] = useState();
  const [resident, setResident] = useState();
  const [district, setDistrict] = useState();
  const [thana, setThana] = useState();
  const [postOffice, setPostoffice] = useState();
  const [pdistrict, setPDistrict] = useState();
  const [pthana, setPThana] = useState();
  const [ppostOffice, setPPostoffice] = useState();
  const [policytype, setPolicyType] = useState(1);
  const [risk_date, setRiskdate] = useState();
  const [proposerName, setProposer] = useState();
  const [fatherName, setFather] = useState();
  const [husbandName, setHusband] = useState();
  const [motherName, setMother] = useState();
  const [address, setAddress] = useState();
  const [mobile, setMobile] = useState();
  const [nid, setNID] = useState();
  const [age, setAge] = useState();
  const [occupation, setOccupation] = useState();
  const [branch, setBranch] = useState();
  const [education, setEducation] = useState();
  const [religion, setReligion] = useState();
  const [country, setCountry] = useState();
  const [newProposalNo, setNewProposalNo] = useState();
  const [commencementDate, setUpdateCommDate] = useState();
  const [planName, setPlan] = useState();
  const [premage, setPremAge] = useState();
  const [termList, setTermList] = useState([""]);
  const [calAge, setCalage] = useState();
  const [pmode, setPaymode] = useState();
  const [t_installment, setInstallment] = useState();
  const [selectTerm, setTerm] = useState();
  const [calcuType, setCalcuType] = useState();
  const [rate, setRate] = useState();
  const [bankCode, setBankCode] = useState();
  const [minAge, setMinage] = useState();
  const [maxAge, setMaxAge] = useState();
  const [minTerm, setMinterm] = useState();
  const [maxTerm, setMaxterm] = useState();
  const [maxSumInsure, setMaxSumInsure] = useState();
  const [minSumInsure, setMinSumInsure] = useState();

  const [supplimentId, setSuppli] = useState();
  const [supplimentClass, setSuppliClass] = useState();
  const [sumAssured, setSumassured] = useState();
  const [suppPremium, setSuppPrem] = useState([]);
  const [basicPremium, setBasicPrem] = useState([]);
  const [sumAtrisk, setSumAtRisk] = useState([]);
  const [premPlanlist, setPremPlanlist] = useState([]);
  const [endAtDate, setEndatDate] = useState([]);
  const [ipdPremRate, setIpdPlanRate] = useState([]);
  const [riderPremRate, setRiderPremRate] = useState([]);
  const [ipdPlanNo, setIpdplanNo] = useState();

  const [birth_dateE, setBirthDateE] = useState();
  console.log(
    "minAge" + minAge,
    "maxAge" + maxAge,
    "minTerm" + minTerm,
    "maxTerm" + maxTerm
  );

  // console.log(bankCode);
  // console.log(rate);
  // console.log(selectTerm, pmode);
  // console.log(calcuType);

  const totalInstallment = t_installment?.total_install[0];
  // console.log(totalInstallment);
  const calcuAge = calAge?.age[0];
  const sPrem = suppPremium[0]?.premium;
  const basicPrem = basicPremium[0]?.basic_premium;
  const sumAtRisk = sumAtrisk[0]?.sum_at_risk;
  const IpdPremRate = ipdPremRate[0]?.ipd_prem_rate;
  const riderPrem = riderPremRate[0]?.prem;
  const riderRate = riderPremRate[0]?.rate;

  console.log(IpdPremRate);

  const pRate = rate?.[0]?.toFixed(2);
  const pFactor = rate?.[1]?.toFixed(2);

  // console.log(pRate, pFactor);

  // useEffect(() => {
  //   // Check if minAge is greater than maxAge
  //   if (calcuAge < minAge) {
  //     alert(`This plan does not support age below ${minAge}`);
  //     setPlan("");
  //   }
  //   // Check if calcuAge is greater than maxAge
  //   else if (calcuAge > maxAge) {
  //     alert(`This plan does not support age above ${maxAge}`);
  //     setPlan("");
  //   }
  // }, [minAge, maxAge, calcuAge]);

  // useEffect(() => {
  //   if (sumAssured < minSumInsure) {
  //     alert(`This plan does not support sum issure below ${minSumInsure}`);
  //   } else if (sumAssured > maxSumInsure) {
  //     alert(`This plan does not support sum issure above ${maxSumInsure}`);
  //   }
  // }, [sumAssured, minSumInsure, maxSumInsure]);

  const UserD = JSON.parse(localStorage.getItem("UserDetails"));
  const USER_ID = UserD?.PERSONALID;
  // console.log(UserD);

  const formatAsMMDDYYYY = (dateString) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${year}${month}${day}`;
  };
  const formatAsMMDDYYYYy = (dateString) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(dateObj.getDate()).padStart(2, "0"); // Add leading zero if needed
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const comm_datee = formatAsMMDDYYYY(risk_date);
  const endAtdateFormatted = formatAsMMDDYYYYy(endAtDate[0]?.endAtDate);

  const dob = formatAsMMDDYYYY(birth_date);
  // console.log(dob);
  // console.log(formatAsMMDDYYYY(commencementDate?.comm_date[0]));
  // console.log(formatAsMMDDYYYY(proposal_date));

  const handleClearClick = () => {
    // Check for any actions causing a page reload
    window.location.reload(); // Remove this line if present
    // ... other logic
  };

  const handleIpdplan = (e) => {
    setIpdplanNo(e.target.value);
  };

  const handleSumAssured = (e) => {
    setSumassured(e.target.value);
  };

  const handleSupply = (e) => {
    setSuppli(e.target.value);
  };

  const handleSuppliClass = (e) => {
    setSuppliClass(e.target.value);
  };
  const handleBankCode = (e) => {
    setBankCode(e.target.value);
  };

  const handleterm = (e) => {
    setTerm(e.target.value);
  };
  const handlePaymode = (e) => {
    setPaymode(e.target.value);
  };

  const handlePremAge = (e) => {
    setPremAge(e.target.value);
  };
  const handlePlan = (e) => {
    const value = e.target.value;

    const [
      planId,
      calcuType,
      min_age,
      max_age,
      min_term,
      max_term,
      min_suminsured,
      max_suminsured,
    ] = value.split("-");
    setPlan(planId);
    setCalcuType(calcuType);
    setMinage(min_age);
    setMaxAge(max_age);
    setMinterm(min_term);
    setMaxterm(max_term);
    setMaxSumInsure(max_suminsured);
    setMinSumInsure(min_suminsured);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleMaritalStatus = (e) => {
    setMaritalStaus(e.target.value);
  };

  const handleReligion = (e) => {
    setReligion(e.target.value);
  };
  const handleEducation = (e) => {
    setEducation(e.target.value);
  };
  const handleBranch = (e) => {
    setBranch(e.target.value);
  };
  const handleOccupation = (e) => {
    setOccupation(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.dob) {
      setBirthDateE(formatAsMMDDYYYY(proposalInfo[0]?.dob));
    }
  }, [proposalInfo]);

  const handleNid = (e) => {
    setNID(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.nid_number) {
      setNID(proposalInfo[0]?.nid_number);
    }
  }, [proposalInfo]);

  const handleMobile = (e) => {
    setMobile(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.mobile) {
      setMobile(proposalInfo[0]?.mobile);
    }
  }, [proposalInfo]);

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.address1) {
      setAddress(proposalInfo[0]?.address1);
    }
  }, [proposalInfo]);

  const handleMotherName = (e) => {
    setMother(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.mothers_name) {
      setMother(proposalInfo[0]?.mothers_name);
    }
  }, [proposalInfo]);

  const handleHusband = (e) => {
    setHusband(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.fatherhusb) {
      setHusband(proposalInfo[0]?.fatherhusb);
    }
  }, [proposalInfo]);

  const handleFather = (e) => {
    setFather(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.fathers_name) {
      setFather(proposalInfo[0]?.fathers_name);
    }
  }, [proposalInfo]);

  const handleGetProposer = (e) => {
    setProposer(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.proposer) {
      setProposer(proposalInfo[0]?.proposer);
    }
  }, [proposalInfo]);

  const handleproposalDateChange = (e) => {
    setProposalDate(e.target.value);
  };

  const handleriskDateChange = (e) => {
    setRiskdate(e.target.value);
  };

  useEffect(() => {
    if (proposalInfo[0]?.proposal_date) {
      setProposalDate(formatAsMMDDYYYYy(proposalInfo[0]?.proposal_date));
    }
  }, [proposalInfo]);
  useEffect(() => {
    if (proposalInfo[0]?.risk_date) {
      setRiskdate(formatAsMMDDYYYYy(proposalInfo[0]?.risk_date));
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

  const proposer = proposalInfo[0]?.proposer;
  // get proposal informations
  const handleProposalNo = (e) => {
    const newValue = e.target.value;
    setProposalNo(newValue);
  };

  // get proposal informations
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

  // get End At date informations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/endAtDate/${comm_datee}`
        );
        setEndatDate(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [risk_date]);
  // get End At date informations

  //total installment
  useEffect(() => {
    const InstallmentData = async () => {
      const url = `http://localhost:5000/api/total-installment/${pmode}/${selectTerm}`;
      try {
        const response = await axios.get(url);
        setInstallment(response?.data);
      } catch (error) {
      } finally {
      }
    };

    InstallmentData();
  }, [pmode, selectTerm]);
  // total installment

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

  // get rate calculation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rate-calculation/${calcuAge}/${selectTerm}/${planName}`
        );
        setRate(response?.data?.rate);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [calcuAge, selectTerm, planName]);
  // get rate calculation

  // get age
  useEffect(() => {
    const fetchData = async () => {
      const abc = `http://localhost:5000/api/get-age/${comm_datee}/${
        birth_dateE ? birth_dateE : dob
      }`;
      try {
        const response = await axios.get(abc);
        setCalage(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [comm_datee, birth_dateE, dob]);
  // get age

  // get term-list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/term-list/${planName}/${calcuAge}`
        );
        setTermList(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [planName, calcuAge]);
  // get chainlist

  // get new proposal Number
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/proposal-number?OFFICE_CODE=${branch}`
        );
        setNewProposalNo(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [branch]);
  //get new proposal Number

  // get commencement date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/comm_date/${comm_datee}/${policytype}`
        );
        setUpdateCommDate(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [comm_datee, policytype]);
  // get commencement date

  // get suppliment premium
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/suppliment-premium/${planName}/${occupation}/${supplimentId}/${supplimentClass}/${sumAssured}/${pmode}`
        );
        setSuppPrem(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [planName, occupation, supplimentId, supplimentClass, sumAssured, pmode]);
  //get suppliment premium

  // get basic premium
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/basic-premium/${planName}/${selectTerm}/${calcuAge}/${pmode}/${sumAssured}/'A' `
        );
        setBasicPrem(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [planName, selectTerm, calcuAge, pmode, sumAssured]);
  //get basic premium

  // get sum at risk
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sumat-risk/${planName}/${sumAssured}/${basicPrem}/${pFactor}/${pmode}
          `
        );
        setSumAtRisk(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [planName, sumAssured, basicPrem, pFactor, pmode]);
  // get sum at risk

  // get prem plan list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/prem-plan-list/${sumAssured}
            `
        );
        setPremPlanlist(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [sumAssured]);
  //  get prem plan list

  // get idp premium rate
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ipd-prem-rate/${ipdPlanNo}/${dob}/${comm_datee}/${pmode}/${planName}`
        );
        setIpdPlanRate(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [ipdPlanNo, dob, comm_datee, pmode, planName]);
  // get idp premium rate

  // get rider premium rate
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rider-prem-rate/${planName}/${selectTerm}/${dob}/${comm_datee}/${sumAssured}/${pmode}`
        );
        setRiderPremRate(response?.data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [planName, selectTerm, dob, comm_datee, sumAssured, pmode]);
  // get rider premium rate

  const { data: branchList, isLoading, isError } = useGetBranchlistQuery();
  const { data: projectList, isLoadingg, isErrorr } = useGetProjectlistQuery();
  const { data: agentList } = useGetAgentlistQuery(projectId);
  const { data: modeList } = useGetModelistQuery(planName);
  const { data: bankList } = useGetBankListQuery();
  const { data: bankbranchList } = useGetBankbranchlistQuery(bankCode);
  const { data: districtList } = useGetDistrictlisttQuery();
  const { data: birthPlaceList } = useGetDistrictlisttQuery();
  const { data: genderList } = useGetGenderQuery();
  const { data: locallityList } = useGetLocallityQuery();
  const { data: countryList } = useGetCountrylistQuery();
  const { data: occupationList } = useGetOccupationlistQuery();
  const { data: educationList } = useGetEducationListQuery();
  const { data: planList } = useGetPlanlistQuery(calcuAge);
  const { data: premiumList } = useGetPremiumListQuery();
  const { data: SupplementaryList } = useGetSupplimentClassListQuery();
  const { data: SupplementList } = useGetSupplimentListQuery();

  const { data: thanaList } = useGetThanalistQuery(
    district ? district : pdistrict
  );
  const { data: postOfficeList } = useGetPostofficelistQuery(
    thana ? thana : pthana
  );

  // console.log(agentList);

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
      code: "PRBM",
      title: "PRBM NOMINEE",
    },
    {
      code: "OTHERS",
      title: "OTHERS INFO",
    },
  ];

  // Enter proposal Entry
  const saveProposal = async () => {
    const pDate = formatAsMMDDYYYY(proposal_date)
      ? formatAsMMDDYYYY(proposal_date)
      : "";

    // Check for required data before making the API call
    if (
      !proposerName ||
      !address ||
      !mobile ||
      !nid ||
      !age ||
      !gender ||
      !occupation ||
      !agentValue ||
      !religion ||
      !maritalStatus ||
      !country ||
      !projectId
    ) {
      // Show an alert indicating missing data
      swal({
        title: "Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/proposal-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PROPOSAL_N: newProposalNo?.proposal_no[0]
            ? newProposalNo?.proposal_no[0]
            : "",
          PROPOSAL_D: pDate,
          RISKDATE: formatAsMMDDYYYY(commencementDate?.comm_date[0])
            ? formatAsMMDDYYYY(commencementDate?.comm_date[0])
            : "",
          PROPOSER: proposerName,
          FATHERS_NAME: fatherName,
          FATHERHUSB: fatherName,
          MOTHERS_NAME: motherName,
          ADDRESS1: address,
          POST_CODE_CUR: "12",
          POST_CODE_PER: "13",
          CITY: district,
          MOBILE: mobile,
          LOCALITY: resident ? resident : "",
          N_ID_NUMBER: nid,
          DOB: "19980202",
          AGE: age,
          SEX: gender,
          OCCUPATION: occupation,
          AGENT_ID: agentValue,
          BRANCH_ID: branch ? branch : "",
          USERID: "650",
          LAST_EDUCATION: "BSC",
          RELIGION: religion,
          MARITAL_STATUS: maritalStatus,
          LOCALITY_COUNTRY: country,
          SPOUSE: "",
          PD_CODE: projectId,
        }),
      });

      const data = await response.json();
      console.log(data);

      // Handle the response from the server
      if (data === "Proposal Entry Successfully") {
        // alert("Proposal Entry Successfully");
        swal({
          title: "Proposal Entry Successfully",
          icon: "success",
        });
      } else {
        console.error("Error saving proposal:", data?.error);
      }
    } catch (error) {
      console.error("Error saving proposal:", error.message);
    }
  };
  // Enter proposal Entry
  return (
    <div>
      <Navbar />
      <h1
        style={{ fontFamily: "sans-serif" }}
        className=" shadow-lg font-bold text-dark w-full px-5 lg:w-72  mx-auto p-2 mt-5 rounded text-center"
      >
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
                  onChange={(e) => setPolicyType(e.target.value)}
                  id="cp"
                  name="countries"
                  value="1"
                  // Check the radio button if policyType is '1'
                />
                <Label htmlFor="cp">CURRENT POLICY</Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio
                  onChange={(e) => setPolicyType(e.target.value)}
                  id="tp"
                  name="countries"
                  value="10"
                />
                <Label htmlFor="tp">TP POLICY</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  onChange={(e) => setPolicyType(e.target.value)}
                  id="bp"
                  name="countries"
                  value="13"
                />
                <Label htmlFor="bp">BACK DATE POLICY</Label>
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
              <select
                onChange={handleBranch}
                className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
              >
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
          </div>

          <div className="shadow-lg m-2 border mt-5">
            <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
              <div className="text-start px-0">
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start px-2">
                    <label className="text-start text-xs">GENDER</label>

                    <select
                      onChange={(e) => setGender(e.target.value)}
                      className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    >
                      {gender === "1" && <option value="1">MALE</option>}
                      {gender === "2" && <option value="2">FEMALE</option>}
                      {gender === "3" && <option value="3">COMMON</option>}
                      {gender === "4" && <option value="4">OTHERS</option>}
                      {!gender && (
                        <>
                          <option>Select Gender</option>
                          {genderList?.map((g, i) => (
                            <option key={i} value={g?.gender_id}>
                              {g?.gender_name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                  <div className="text-start px-2">
                    <label className="text-start text-xs">MARITAL STATUS</label>
                    <select
                      onChange={handleMaritalStatus}
                      className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full "
                    >
                      {maritalStatus === "" && (
                        <option value="1">Select</option>
                      )}

                      <option value={1}>SINGLE</option>
                      <option value={2}>MARRIED</option>
                      <option value={3}>WIDOWED</option>
                      <option value={4}>DEVORCED</option>
                    </select>
                  </div>
                  <div className="text-start px-2">
                    <label className="text-start text-xs">MARRIAGE DATE</label>
                    <input
                      type="date"
                      id="success"
                      className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>

                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">PROPOSER</label>

                    {proposer ? (
                      <input
                        type="text"
                        id="success"
                        value={proposer ? proposer : ""}
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleGetProposer}
                      />
                    ) : (
                      <input
                        type="text"
                        id="success"
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleGetProposer}
                      />
                    )}
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">HUSBAND/WIFE</label>

                    {proposalInfo[0]?.fatherhusb ? (
                      <input
                        type="text"
                        id="success"
                        value={
                          proposalInfo[0]?.fatherhusb
                            ? proposalInfo[0]?.fatherhusb
                            : ""
                        }
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleHusband}
                      />
                    ) : (
                      <input
                        type="text"
                        id="success"
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleHusband}
                      />
                    )}
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">FATHER</label>
                    {proposalInfo[0]?.fathers_name ? (
                      <input
                        type="text"
                        id="success"
                        value={
                          proposalInfo[0]?.fathers_name
                            ? proposalInfo[0]?.fathers_name
                            : ""
                        }
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleFather}
                      />
                    ) : (
                      <input
                        type="text"
                        id="success"
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleFather}
                      />
                    )}
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">MOTHER</label>

                    {proposalInfo[0]?.mothers_name ? (
                      <input
                        type="text"
                        id="success"
                        value={
                          proposalInfo[0]?.mothers_name
                            ? proposalInfo[0]?.mothers_name
                            : ""
                        }
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleMotherName}
                      />
                    ) : (
                      <input
                        type="text"
                        id="success"
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        onChange={handleMotherName}
                      />
                    )}
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
                          onChange={setAge}
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
                        {proposalInfo[0]?.address1 ? (
                          <input
                            type="text"
                            id="success"
                            value={
                              proposalInfo[0]?.address1
                                ? proposalInfo[0]?.address1
                                : ""
                            }
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                            onChange={handleAddress}
                          />
                        ) : (
                          <input
                            type="text"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                            onChange={handleAddress}
                          />
                        )}
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

                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          POST OFFICE
                        </label>
                        <select
                          onChange={(e) => setPostoffice(e.target.value)}
                          value={postOffice}
                          className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
                        >
                          {postOfficeList?.map((office, i) => (
                            <option key={i} value={office?.postoffice_code}>
                              {office?.postoffice_name} -{" "}
                              {office?.postoffice_code}
                            </option>
                          ))}
                        </select>
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
                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          SELECT DISTRICT
                        </label>
                        <select
                          onChange={(e) => setPDistrict(e.target.value)}
                          value={pdistrict}
                          className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
                        >
                          {districtList?.map((districtt, ii) => (
                            <option key={ii} value={districtt?.div_code}>
                              {districtt?.division_name} - {districtt?.div_code}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          SELECT THANA
                        </label>
                        <select
                          onChange={(e) => setPThana(e.target.value)}
                          value={pthana}
                          className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
                        >
                          {thanaList?.map((thanaa, ii) => (
                            <option key={ii} value={thanaa?.thana_code}>
                              {thanaa?.thana_name} - {thanaa?.thana_code}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          POST OFFICE
                        </label>
                        <select
                          onChange={(e) => setPPostoffice(e.target.value)}
                          value={ppostOffice}
                          className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full"
                        >
                          {postOfficeList?.map((officee, ii) => (
                            <option key={ii} value={officee?.postoffice_code}>
                              {officee?.postoffice_name} -{" "}
                              {officee?.postoffice_code}
                            </option>
                          ))}
                        </select>
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
                        {proposalInfo[0]?.nid_number ? (
                          <input
                            type="text"
                            id="success"
                            value={
                              proposalInfo[0]?.nid_number
                                ? proposalInfo[0]?.nid_number
                                : ""
                            }
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                            onChange={handleNid}
                          />
                        ) : (
                          <input
                            type="text"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                            onChange={handleNid}
                          />
                        )}
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

                          {proposalInfo[0]?.mobile ? (
                            <input
                              type="number"
                              id="success"
                              maxLength={11}
                              minLength={11}
                              value={
                                proposalInfo[0]?.mobile
                                  ? proposalInfo[0]?.mobile
                                  : ""
                              }
                              class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                              onChange={handleMobile}
                            />
                          ) : (
                            <input
                              type="numnber"
                              id="success"
                              maxLength={11}
                              minLength={11}
                              class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                              onChange={handleMobile}
                            />
                          )}
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

          <div className="shadow-xl m-2 ">
            <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
              <div className="text-start px-0">
                <div className="text-start">
                  <div className="shadow-lg border m-2 rounded p-2">
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-1">
                        <label className="w-32 mt-4 font-bold text-xs">
                          PLACE OF BIRTH
                        </label>
                        <select className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full">
                          {birthPlaceList?.map((district, i) => (
                            <option key={i} value={district?.div_code}>
                              {district?.division_name} - {district?.div_code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-1 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-2">
                      <div className="bg-white col-span-2 flex align-items-center m-1  lg:mt-0">
                        <label className="w-36 mt-4 font-bold text-xs">
                          DATE OF BIRTH
                        </label>
                        {birth_dateE ? (
                          <input
                            type="text"
                            id="success"
                            value={birth_dateE}
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                            onChange={handleBirthDateChange}
                          />
                        ) : (
                          <input
                            type="date"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                            onChange={handleBirthDateChange}
                          />
                        )}
                      </div>
                      <div className="bg-white flex  justify-content-end m-1  lg:mt-0">
                        <label className="w-16  mt-4 font-bold text-xs">
                          AGE
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={calcuAge}
                          onChange={handleAge}
                          disabled
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>

                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-1 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-2">
                      <div className="text-start flex px-1">
                        <label className="w-44 text-center  mt-3 font-bold text-xs">
                          RELIGION
                        </label>

                        <select
                          onChange={handleReligion}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          <>
                            <option value="ISLAM">ISLAM</option>
                            <option value="HINDU">HINDU</option>
                            <option value="KHRISTAN">KHRISTAN</option>
                            <option value="BOUDDHA">BOUDDHA</option>
                          </>
                        </select>
                      </div>
                      <div className="text-start flex px-1">
                        <label className="w-24   mt-3 font-bold text-xs">
                          RESIDENT
                        </label>

                        <select
                          onChange={(e) => setResident(e.target.value)}
                          value={resident}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          <>
                            {locallityList?.map((locallity, i) => (
                              <option key={i} value={locallity?.locallity_id}>
                                {locallity?.locallity_name}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                      <div className="text-start flex px-1">
                        <select
                          onChange={handleCountry}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          {resident === "3" && (
                            <>
                              {countryList?.map((country, i) => (
                                <option key={i} value={country?.country_name}>
                                  {country?.country_name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-start px-0">
                <div className="text-start">
                  <div className="text-start px-0">
                    <div className="shadow-lg border m-2 rounded p-0">
                      <div class=" mb-0 flex grid grid-cols-1 rounded p-2    mt-1 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                        <div className="text-start flex px-0">
                          <label className="w-32   mt-3 font-bold text-xs">
                            OCCUPATION
                          </label>

                          <select
                            onChange={handleOccupation}
                            className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                          >
                            <option>Select Occupation</option>
                            {occupationList?.map((occupation, i) => (
                              <option key={i} value={occupation?.occupation_ID}>
                                {occupation?.occupation_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-start flex px-1">
                          <label className="w-32 text-center  mt-3 font-bold text-xs">
                            EDUCATION
                          </label>

                          <select
                            onChange={handleEducation}
                            className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                          >
                            {educationList?.map((education, i) => (
                              <option key={i} value={education?.education_name}>
                                {education?.education_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <hr className="mt-2  bg-[#333]" />
                      <div class=" mb-0 flex grid grid-cols-1 rounded  p-2   mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-2">
                        <div class="flex border items-center shadow p-2 mb-0">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="default-checkbox"
                            class="ms-2 ml-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            FIRST PREGNANCY
                          </label>
                        </div>
                        <div class="flex border items-center ml-2 shadow p-2 mb-0">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="default-checkbox"
                            class="ms-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            MINORITY
                          </label>
                        </div>
                      </div>

                      <div class=" mb-0 flex grid grid-cols-1 rounded  p-2   mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                        <div class="flex border items-center shadow p-2 mb-2">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="default-checkbox"
                            class="ms-2 ml-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            LIEN
                          </label>
                        </div>

                        <div className="bg-white flex align-items-center m-1  lg:mt-0">
                          <label className="w-28 mt-4 font-bold text-xs">
                            LIEN%
                          </label>
                          <input
                            type="text"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                          />
                        </div>
                        <div className="bg-white flex  align-items-center m-1  lg:mt-0">
                          <label className="w-20  mt-4 font-bold text-xs">
                            YEARS
                          </label>
                          <input
                            type="text"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={saveProposal}
              type="submit"
              class="rounded text-end btn-sm focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {selectedTopbarItem === "P" && (
        <div className="shadow-lg border lg:mx-48 mt-1 m-2">
          <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
            <div className="text-start px-2">
              <div className="shadow border-2 rounded p-1 mt-2 mb-3">
                <h2 className=" text-center font-bold text-success  p-2 rounded text-xs text-dark">
                  PREMIUM CALCULATION
                </h2>

                <div class="p-0 mb-0 flex grid grid-cols-1 rounded  mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  {proposalInfo[0]?.plan_desc ? (
                    <div className="text-start px-2">
                      <label className="text-start text-xs">Plan Name</label>
                      <input
                        type="text"
                        id="success"
                        value={proposalInfo[0]?.plan_desc}
                        disabled
                        class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        onChange={handlePlan}
                      />
                    </div>
                  ) : (
                    <div className="text-start px-2">
                      <label className="text-start text-xs">PLAN LIST</label>
                      <select
                        onChange={handlePlan}
                        className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                      >
                        <>
                          <option>Select Plan</option>
                          {planList?.map((plan, i) => (
                            <option
                              key={i}
                              value={`${plan?.plan_id}-${plan?.calcu_type}-${plan?.min_age}-${plan?.max_age}-${plan?.min_term}-${plan?.max_term}-${plan?.min_suminsured}-${plan?.max_suminsured}`}
                            >
                              {plan?.plan_id}-{plan?.plan_name}
                            </option>
                          ))}
                        </>
                      </select>
                    </div>
                  )}
                </div>

                <div class="p-1 mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="w-full lg:w-full bg-white align-items-center pr-2 m-1  lg:mt-0">
                    <label className="text-start text-xs">
                      POLICY HOLDER AGE
                    </label>
                    <input
                      type="text"
                      id="success"
                      value={calcuAge}
                      disabled
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                      onChange={handlePremAge}
                    />
                  </div>
                  <div className="col-span-2 bg-white align-items-center m-1  lg:mt-0">
                    {proposalInfo[0]?.term ? (
                      <div className="text-start px-2">
                        <label className="text-start text-xs">
                          {" "}
                          TERM OF POLICY
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.term}
                          disabled
                          class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                          onChange={handlePlan}
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-start text-xs">
                          TERM OF POLICY
                        </label>
                        <select
                          onChange={handleterm}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          <>
                            <option>Select Term</option>
                            {termList?.map((termm, i) => (
                              <option key={i} value={termm?.term}>
                                {termm?.term}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  {proposalInfo[0]?.instmode ? (
                    <div className="text-start px-2">
                      <label className="text-start text-xs">PAYMENT MODE</label>
                      <input
                        type="text"
                        id="success"
                        value={proposalInfo[0]?.instmode}
                        disabled
                        class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        onChange={handlePaymode}
                      />
                    </div>
                  ) : (
                    <div className=" bg-white align-items-center m-1  lg:mt-0">
                      <label className="text-start text-xs">PAYMENT MODE</label>
                      <select
                        onChange={handlePaymode}
                        className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                      >
                        <>
                          <option>Select Mode</option>
                          {modeList?.map((mode, i) => (
                            <option key={i} value={mode?.mode_code}>
                              {mode?.mode_code}-{mode?.mode_name}
                            </option>
                          ))}
                        </>
                      </select>
                    </div>
                  )}
                </div>
                <div class="p-1 mb-8 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="col-span-2 bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">
                      TOTAL INSTALLMENT
                    </label>
                    {proposalInfo[0]?.totalinst ? (
                      <input
                        type="text"
                        id="success"
                        value={proposalInfo[0]?.totalinst}
                        disabled
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    ) : (
                      <input
                        type="text"
                        id="success"
                        value={totalInstallment}
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    )}
                  </div>
                  <div className="w-full lg:w-full bg-white align-items-center m-1  lg:mt-0">
                    <label className="text-start text-xs">AGE ADMITTED</label>
                    <select
                      // onChange={handlePaymode}
                      className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    >
                      <>
                        <option>Select AGE ADMITTED</option>
                        <option value="Y">YES</option>
                        <option value="N">NO</option>
                      </>
                    </select>
                  </div>
                </div>
              </div>

              <div className="text-start mt-28 mb-2">
                <div className="shadow border-2  m-0 rounded p-1">
                  {calcuType === "P" && (
                    <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                      <div className="w-full lg:w-full bg-white align-items-center m-1  lg:mt-0">
                        <select
                          // onChange={handlePaymode}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          <>
                            <option>Select Premium</option>

                            {premiumList?.map((prem, i) => (
                              <option key={i} value={prem?.prem_amt}>
                                Premium Tk-{prem?.premium}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>
                    </div>
                  )}

                  <div class=" mb-0 flex grid grid-cols-3 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                    <div className="bg-white align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-44 mt-3 p-0">
                        SUM ASSURED
                      </label>
                      {proposalInfo[0]?.sum_insure ? (
                        <input
                          onChange={handleSumAssured}
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.sum_insure}
                          disabled
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      ) : (
                        <input
                          onChange={handleSumAssured}
                          type="text"
                          id="success"
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      )}
                    </div>

                    <div className="bg-white  align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-16 mt-3 p-0">
                        RATE
                      </label>
                      <input
                        type="text"
                        id="success"
                        value={pRate}
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                    <div className="bg-white  align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-center w-16 mt-3 p-0">
                        FACTOR
                      </label>

                      <input
                        type="text"
                        id="success"
                        value={pFactor}
                        class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                  </div>
                  <div class=" mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                    <div className="bg-white  align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-40 mt-3 p-0">
                        BASIC PREMIUM
                      </label>
                      {proposalInfo[0]?.premium ? (
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.premium}
                          disabled
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      ) : (
                        <input
                          type="text"
                          id="success"
                          value={basicPrem}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      )}
                    </div>

                    <div className="bg-white  align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-center w-36 mt-3 p-0">
                        SUM AT RISK
                      </label>
                      {proposalInfo[0]?.sumatrisk ? (
                        <input
                          type="text"
                          id="success"
                          value={proposalInfo[0]?.sumatrisk}
                          disabled
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      ) : (
                        <input
                          type="text"
                          id="success"
                          value={sumAtRisk}
                          class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-start px-2">
              <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                <div className="text-start  mb-4 m-1">
                  <div className="shadow border-2 h-[215px]  m-0 rounded p-0">
                    <div class=" mb-0 flex grid grid-cols-3 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <div className="flex items-center gap-2">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Clear Supplementary
                          </Label>
                        </div>
                      </div>
                      <div className="flex bg-white align-items-center m-1  lg:mt-0">
                        <label className="w-16 text-start mt-3 text-xs">
                          SUPPL.
                        </label>
                        <select
                          onChange={handleSupply}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          <>
                            <option>Select Suppli.</option>
                            {SupplementList?.map((suppl, i) => (
                              <option key={i} value={suppl?.supp_code}>
                                {suppl?.supp_name}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>

                      <div className="flex bg-white align-items-center m-1  lg:mt-1">
                        <label className="w-16 text-start mt-3 text-xs">
                          CLASS
                        </label>
                        <select
                          onChange={handleSuppliClass}
                          className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        >
                          <>
                            <option>Select Suppli. Class</option>
                            {SupplementaryList?.map((supp, i) => (
                              <option key={i} value={supp?.class_id}>
                                {supp?.class_name}
                              </option>
                            ))}
                          </>
                        </select>
                      </div>

                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-start w-16 mt-3 p-0">
                          RATE
                        </label>
                        <input
                          type="text"
                          id="success"
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>

                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-start w-16 mt-3 p-0">
                          PREMIUM
                        </label>
                        <input
                          type="text"
                          value={sPrem}
                          id="success"
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-start  mb-4 m-1">
                  <div className="shadow h-[215px] border-2  m-0 rounded p-0">
                    <div class=" mb-0 flex grid grid-cols-3 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <div className="flex items-center gap-2">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Clear Major Diaseas Rider
                          </Label>
                        </div>
                      </div>
                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-start w-16 mt-3 p-0">
                          RATE
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={riderRate ? riderRate : "0"}
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>

                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-start w-16 mt-3 p-0">
                          PREMIUM
                        </label>
                        <input
                          type="text"
                          id="success"
                          value={riderPrem ? riderPrem : "0"}
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-start mb-4">
                <div className="shadow-lg border m-1 rounded p-1">
                  <h2 className="text-xs font-bold ml-2">
                    IPD TREATEMENT RIDER
                  </h2>
                  <div className="bg-white flex justify-center m-1  lg:mt-0">
                    <div className="flex items-center gap-2">
                      <Checkbox id="promotion" />
                      <Label className="italic" htmlFor="promotion">
                        Clear IPD Rider
                      </Label>
                    </div>
                  </div>
                  <div class=" mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="w-24 text-start mt-3 text-xs">
                        PLAN PREM
                      </label>
                      <select
                        onChange={handleIpdplan}
                        className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                      >
                        <>
                          <option>SELECT PLAN PREM</option>
                          {premPlanlist?.map((planList, i) => (
                            <option key={i} value={planList?.plan_no}>
                              {planList?.plan_name}
                            </option>
                          ))}
                        </>
                      </select>
                    </div>

                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-48 mt-3 p-0">
                        START FROM
                      </label>

                      <input
                        type="text"
                        id="success"
                        value={risk_date}
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                  </div>
                  <div class=" mb-0 flex grid grid-cols-3 rounded  mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-32 mt-3 p-0">
                        PREM RATE
                      </label>

                      <input
                        type="text"
                        id="success"
                        value={IpdPremRate ? IpdPremRate : "0"}
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>

                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-24 mt-3 p-0">
                        BENIFITS
                      </label>
                      <input
                        type="text"
                        id="success"
                        value={0}
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>

                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-24 mt-3 p-0">
                        END AT
                      </label>

                      <input
                        type="text"
                        id="success"
                        value={endAtdateFormatted}
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-start mb-4">
                <div className="shadow-lg border m-1 rounded p-1">
                  <h2 className="text-xs font-bold ml-2">EXTRA PREMIUM</h2>

                  <div class=" mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-80 mt-3 p-0">
                        OE RATE & PREM
                      </label>
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] ml-1 mt-1 w-full"
                      />
                    </div>

                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-3/4 mt-3 p-0">
                        H. RATE & PREM
                      </label>
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] ml-1 mt-1 w-full"
                      />
                    </div>
                  </div>
                  <div class=" mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-36 mt-3 p-0">
                        EXT. PREM
                      </label>
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>

                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-32 mt-3 p-0">
                        TOTAL EXTRA
                      </label>

                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-start mb-4">
                <div className="shadow-lg border m-1 rounded p-1">
                  <h2 className="text-xs font-bold ml-2">
                    OPTION & POLICY STATUS
                  </h2>

                  <div class=" mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className=" flex gap-2">
                      <div className="flex items-center gap-2">
                        <Radio
                          id="uk"
                          name="countries"
                          value="1"
                          // Check the radio button if policyType is '1'
                        />
                        <Label htmlFor="uk">A</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Radio id="uk" name="countries" value="10" />
                        <Label htmlFor="uk">B</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio id="uk" name="countries" value="13" />
                        <Label htmlFor="uk">C</Label>
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      <div className="flex items-center gap-2">
                        <Radio
                          id="ukS"
                          name="CS"
                          value="1"
                          // Check the radio button if policyType is '1'
                        />
                        <Label htmlFor="ukS">STANDARD</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Radio id="ukS" name="CS" value="10" />
                        <Label htmlFor="ukS">SUBSTANDARD</Label>
                      </div>
                    </div>
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start ml-5 w-48 mt-3 p-0">
                        TOTAL PREM.
                      </label>
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                  </div>
                  <div class=" mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-36 mt-3 p-0">
                        EXT. PREM
                      </label>
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>

                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-32 mt-3 p-0">
                        TOTAL EXTRA
                      </label>

                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>
                  </div>
                  <div class=" mb-0 flex grid grid-cols-2 rounded  mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-1  lg:mx-auto lg:mt-0">
                    <div className="bg-white flex align-items-center m-1  lg:mt-0">
                      <label className="text-xs text-start w-36 mt-3 p-0">
                        STATUS
                      </label>
                      <input
                        type="text"
                        id="success"
                        class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                      />
                    </div>

                    <div className="justify-center flex gap-2">
                      <div className="flex items-center gap-2">
                        <Radio
                          id="ukS"
                          name="CS"
                          value="1"
                          // Check the radio button if policyType is '1'
                        />
                        <Label htmlFor="ukS">MEDICAL</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Radio id="ukS" name="CS" value="10" />
                        <Label htmlFor="ukS">NON MEDICAL</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={saveProposal}
              type="submit"
              class="rounded text-end btn-sm focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}
      {selectedTopbarItem === "PRBM" && (
        <div className="shadow-lg border lg:mx-48 mt-1 m-2">
          <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
            <div className="text-start  px-2">
              <div className="shadow border-2 h-[210px] rounded p-1 mt-2 mb-3">
                <h2 className=" text-start font-bold text-success  p-1 rounded text-xs text-dark">
                  SETUP
                </h2>
                <div class="p-1 mb-0 flex grid grid-cols-3 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className=" text-start text-xs lg:ml-1">
                      DESIGNATION
                    </label>
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>

                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className=" text-start text-xs lg:ml-1">NAME</label>
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <label className=" text-start text-xs lg:ml-1">CODE</label>
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-3 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>

                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-3 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>

                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                  <div className="bg-white align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="  text-start px-2 mb-3">
              <div class="h-[210px] p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                <div className="text-start bg-gray mb-4 m-1">
                  <div className="shadow border-2   m-0 rounded p-0">
                    <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-center w-48 mt-3 p-0">
                          DEPOSIT
                        </label>
                        <input
                          type="text"
                          id="success"
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>

                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-center w-48 mt-3 p-0">
                          SUSPENSE
                        </label>
                        <input
                          type="text"
                          id="success"
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>

                    <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-start w-48 mt-3 p-0">
                          NEXT PREM DATE
                        </label>
                        <input
                          type="text"
                          id="success"
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>

                      <div className="bg-white flex align-items-center m-1  lg:mt-0">
                        <label className="text-xs text-start w-48 mt-3 p-0">
                          MATURITY DATE
                        </label>
                        <input
                          type="text"
                          id="success"
                          class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
                        />
                      </div>
                    </div>
                    <div class=" mb-3 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                      <div className="bg-white  justify-center flex align-items-center m-1  lg:mt-0">
                        <button
                          type="submit"
                          class="rounded text-end btn-sm focus:outline-none text-dark bg-green-100 hover:bg-green-100 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-100 dark:focus:ring-green-800"
                        >
                          NOMINEE ENTRY
                        </button>
                        <button
                          type="submit"
                          class="rounded text-end btn-sm focus:outline-none text-dark bg-green-100 hover:bg-green-100 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-2 me-2 ml-2 mb-2 dark:bg-green-100 dark:hover:bg-green-100 dark:focus:ring-green-800"
                        >
                          PRBM ENTRY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
            <div className="overflow-x-auto px-4">
              <Table className="border bordered">
                <Table.Head>
                  <Table.HeadCell>RELATION</Table.HeadCell>
                  <Table.HeadCell>QTY</Table.HeadCell>
                  <Table.HeadCell>PRESENT HEALTH STATUS</Table.HeadCell>
                  <Table.HeadCell>AGE</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Father
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Mother
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Brother
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Sister
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Husb/Wife
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>

                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Son
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Daughter
                    </Table.Cell>
                    <div className="w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                    <Table.Cell>
                      <div className="flex">
                        <div className="flex items-center gap-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Good
                          </Label>
                        </div>
                        <div className="flex items-center gap-1  ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Sick
                          </Label>
                        </div>
                        <div className="flex items-center gap-1 ml-1">
                          <Checkbox id="promotion" />
                          <Label className="italic" htmlFor="promotion">
                            Late
                          </Label>
                        </div>
                      </div>
                    </Table.Cell>
                    <div className="pr-1 justify-right w-16">
                      <input
                        type="text"
                        id="success"
                        class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-2 w-full"
                      />
                    </div>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            <div className="overflow-x-auto px-4">
              <Table className="border bordered">
                <Table.Head>
                  <Table.HeadCell>AGE AT DEATH</Table.HeadCell>
                  <Table.HeadCell>CAUSE OF DEATH</Table.HeadCell>
                  <Table.HeadCell>DURATION OF DEASEAS</Table.HeadCell>
                  <Table.HeadCell>DEATH OF YEAR</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="py-1">
                      <div className="w-24 ">
                        <input
                          type="text"
                          id="success"
                          class=" form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell className="py-1">
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell className="py-1">
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell className="py-1">
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8 form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="pr-1 justify-right w-24">
                        <input
                          type="text"
                          id="success"
                          class="h-8  form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>

          <div class=" mb-0 flex grid grid-cols-2 rounded lg:px-80    mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
            <div className="bg-white flex align-items-center m-1  lg:mt-0">
              <label className="text-xs text-center w-48 mt-3 p-0">
                WITNESS NAME
              </label>
              <input
                type="text"
                id="success"
                class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
              />
            </div>

            <div className="bg-white flex align-items-center m-1  lg:mt-0">
              <label className="text-xs text-center w-48 mt-3 p-0">
                WITNESS MOBILE NO
              </label>
              <input
                type="text"
                id="success"
                class="form-input text-xs shadow border-[#E3F2FD] mt-1 w-full"
              />
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              type="submit"
              class="rounded text-end btn-sm focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {selectedTopbarItem === "OTHERS" && (
        <div className="shadow-lg border lg:mx-48 mt-1 m-2">
          <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-4 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
            <div className="col-span-2">
              <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center lg:mx-auto lg:mt-0">
                <div className="text-start col-span-1  px-2">
                  <div className="shadow border-2 h-100 rounded p-1 mt-2 mb-3">
                    <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                      HEALTH INFORMATION
                    </h2>

                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Fully Healthy
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Admit Hospital
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Surgery Record
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Diseases List
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Addiction Info
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Proposal Decline
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Current Madication
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Disability info
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Infections Diaseases
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                    <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                      <div className="text-start flex px-2">
                        <label className="text-center mt-2  text-sm  w-60">
                          Other Risk
                        </label>
                        <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                          <>
                            <option>Yes</option>
                            <option>No</option>
                          </>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" text-start px-2 mb-3">
                  <div class="  p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                    <div className="text-start bg-gray mb-4 m-1">
                      <div className="h-[500px]  shadow border-2   m-0 rounded p-0">
                        <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                          DIAGNOSTIC TEST
                        </h2>
                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1">
                            <Checkbox id="promotion" />
                            <Label className="italic pr-3" htmlFor="promotion">
                              SD
                            </Label>{" "}
                          </div>

                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              CR
                            </Label>
                          </div>
                        </div>
                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              FMR
                            </Label>
                          </div>
                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              SGPT
                            </Label>
                          </div>
                        </div>

                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1 ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              SGOT
                            </Label>
                          </div>

                          <div className="flex items-center gap-1">
                            <Checkbox id="promotion" />
                            <Label className="italic pr-3" htmlFor="promotion">
                              PUR
                            </Label>{" "}
                          </div>
                        </div>

                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1">
                            <Checkbox id="promotion" />
                            <Label className="italic pr-3" htmlFor="promotion">
                              ESR
                            </Label>{" "}
                          </div>

                          <div className="flex items-center gap-1">
                            <Checkbox id="promotion" />
                            <Label className="italic pr-3" htmlFor="promotion">
                              PUR
                            </Label>{" "}
                          </div>
                        </div>

                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              CBC
                            </Label>
                          </div>

                          <div className="flex items-center gap-1">
                            <Checkbox id="promotion" />
                            <Label className="italic pr-3" htmlFor="promotion">
                              PUR
                            </Label>{" "}
                          </div>
                        </div>

                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              BILIRUBIN
                            </Label>
                          </div>

                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              ECG
                            </Label>
                          </div>
                        </div>
                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1 ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              GAMMA GT
                            </Label>
                          </div>
                          <div className="flex items-center gap-1">
                            <Checkbox id="promotion" />
                            <Label className="italic pr-3" htmlFor="promotion">
                              ESR
                            </Label>{" "}
                          </div>
                        </div>
                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic w-60" htmlFor="promotion">
                              GTT
                            </Label>
                          </div>
                          <div className="flex items-center gap-1 ">
                            <Checkbox id="promotion" />
                            <Label className="italic w-60" htmlFor="promotion">
                              COLESTOROL
                            </Label>
                          </div>
                        </div>
                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1 ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              OTHER TEST
                            </Label>
                          </div>
                          <div className="flex items-center gap-1 ">
                            <Checkbox id="promotion" />
                            <Label className="italic w-60" htmlFor="promotion">
                              FBS
                            </Label>
                          </div>
                        </div>
                        <div class=" mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                          <div className="flex items-center gap-1 ">
                            <Checkbox id="promotion" />{" "}
                            <Label className="italic" htmlFor="promotion">
                              URIC ACID
                            </Label>
                          </div>
                          <div className="flex items-center gap-1  ">
                            <Checkbox id="promotion" />
                            <Label className="italic" htmlFor="promotion">
                              X RAY
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class=" p-1 mb-0 flex col-span-2 grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-1">
                  <div className="text-start bg-gray mb-4 m-1">
                    <div className="shadow border-2   m-0 rounded p-0">
                      <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                        ONLY FOR WOMEN
                      </h2>
                      <div class=" mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center  p-2  lg:mx-auto lg:mt-0">
                        <div className="text-start flex px-1">
                          <label className="text-center mt-2  text-sm  w-48">
                            Pregnant Info
                          </label>
                          <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                            <>
                              <option>Yes</option>
                              <option>No</option>
                            </>
                          </select>
                        </div>
                        <div className="text-start flex px-1 mt-2">
                          <label className="text-center mt-2  text-sm  w-48">
                            Delivery Process
                          </label>
                          <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                            <>
                              <option>Yes</option>
                              <option>No</option>
                            </>
                          </select>
                        </div>
                        <div className="text-start flex px-1 mt-2">
                          <label className="text-center mt-2  text-sm  w-48">
                            Female Diaseas
                          </label>
                          <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                            <>
                              <option>Yes</option>
                              <option>No</option>
                            </>
                          </select>
                        </div>

                        <div className="bg-white  flex align-items-center m-1  lg:mt-0">
                          <label className="w-48 mt-4 text-sm">
                            Exp Delivery Date
                          </label>
                          <input
                            type="date"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          />
                        </div>
                        <div className="bg-white  flex align-items-center m-1  lg:mt-0">
                          <label className="w-48 mt-4 text-sm">
                            Last Delivery Date
                          </label>
                          <input
                            type="date"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          />
                        </div>
                        <div className="bg-white  flex align-items-center m-1  lg:mt-0">
                          <label className="w-48 mt-4 text-sm">
                            Last Menstrual Date
                          </label>
                          <input
                            type="text"
                            id="success"
                            class="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-start col-span-2  px-2 lg:mt-2">
              <div className="shadow border-2 h-100 rounded p-1 mt-2 mb-3">
                <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                  ARMED FORCE INFORMATION
                </h2>
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <label className="text-xs text-center w-48 mt-3 p-0">
                      ARMED FORCE DESG
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Yes</option>
                        <option>No</option>
                      </>
                    </select>
                  </div>
                  <div className="text-start flex px-2">
                    <label className="text-center mt-2  text-sm  w-60">
                      Health Category
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Yes</option>
                        <option>No</option>
                      </>
                    </select>
                  </div>
                </div>
              </div>

              <div className="shadow border-2 h-100 rounded p-1 mt-2 mb-3">
                <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                  PHYSICAL MEASUREMENTS
                </h2>
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-2  text-sm  w-60">
                      Hight type
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Foot</option>
                        <option>Meter</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-xs p-1 shadow border-[#E3F2FD] mt-1 w-full"
                    />

                    <input
                      type="text"
                      id="success"
                      class="form-input text-xs p-1 shadow border-[#E3F2FD] mt-1 ml-2 w-full"
                    />
                  </div>
                </div>

                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-2  text-sm  w-60">
                      Weight type
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Kilogram</option>
                        <option>Pund</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-xs p-1 shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-2  text-sm  w-60">
                      Chest Onbreat Type
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Inch</option>
                        <option>Centimeter</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-xs p-1 shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-2  text-sm  w-60">
                      Chest Breatless Type
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Inch</option>
                        <option>Centimeter</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-xs p-1 shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-2  text-sm  w-60">
                      Stomach Type
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Inch</option>
                        <option>Centimeter</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input text-xs p-1 shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="shadow border-2 h-100 rounded p-1 mt-2 mb-3">
                <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                  BANK INFORMATION
                </h2>
                <div class="p-1 mb-0 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-1 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <label className="text-center mt-3  text-sm  w-32">
                      Account No
                    </label>
                    <input
                      type="text"
                      id="success"
                      class="form-input text-sm p-2 shadow border-[#E3F2FD] mt-1 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-2 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-20">
                      BANK
                    </label>
                    <select
                      onChange={handleBankCode}
                      className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full"
                    >
                      {bankList?.map((bank, i) => (
                        <option key={i} value={bank?.bank_code}>
                          {bank?.bank_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-48">
                      BANK BRANCH
                    </label>
                    <select className="form-input text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      {bankbranchList?.map((branch, i) => (
                        <option key={i} value={branch?.branch_name}>
                          {branch?.branch_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* previous policy entry */}
              <div className="shadow border-2 h-100 rounded p-1 mt-2 mb-3">
                <h2 className=" text-center font-bold text-success  p-1 rounded text-xs text-dark">
                  PREVIOUS POLICY NO
                </h2>
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-20">
                      Policy 1
                    </label>
                    <select className="form-input h-10 text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Islami bank</option>
                        <option>Midland bank</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input h-10 text-sm p-2 shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>

                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-20">
                      Policy 2
                    </label>
                    <select className="form-input h-10 text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Islami bank</option>
                        <option>Midland bank</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input h-10 text-sm p-2 shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-20">
                      Policy 3
                    </label>
                    <select className="form-input h-10 text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Islami bank</option>
                        <option>Midland bank</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input h-10 text-sm p-2 shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-20">
                      Policy 4
                    </label>
                    <select className="form-input h-10 text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Islami bank</option>
                        <option>Midland bank</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input h-10 text-sm p-2 shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>
                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-start flex px-2">
                    <label className="text-center mt-3  text-sm  w-20">
                      Policy 5
                    </label>
                    <select className="form-input h-10 text-sm shadow border-[#E3F2FD] mt-0 w-full">
                      <>
                        <option>Islami bank</option>
                        <option>Midland bank</option>
                      </>
                    </select>
                  </div>
                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input h-10 text-sm p-2 shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>

                <div class="p-1 mb-0 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
                  <div className="text-end">
                    <label className="text-center font-bold  mt-3  text-sm  w-20">
                      Total:
                    </label>
                  </div>

                  <div className="bg-white flex align-items-center m-1  lg:mt-0">
                    <input
                      type="text"
                      id="success"
                      class="form-input h-10 text-sm p-2 shadow border-[#E3F2FD] mt-0 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-2 mb-2">
            <button
              type="submit"
              class="rounded text-end btn-sm focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2 mt-5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              SAVE/EDIT
            </button>

            <button
              type="submit"
              class="focus:outline-none rounded  btn-sm  text-xs lg:text-md  mt-1   w-32 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm ml-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              CLEAR
            </button>
            <button
              type="submit"
              class="focus:outline-none rounded  btn-sm  text-xs lg:text-md  mt-1   w-32 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm ml-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              EXIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
