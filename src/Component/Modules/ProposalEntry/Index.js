import React from "react";
import Navbar from "../../Nabar/Navbar";
import { Button, Dropdown, Label, Radio, TextInput } from "flowbite-react";

const Index = () => {
  return (
    <div>
      <Navbar />
      <h1 className=" shadow-lg text-white w-full px-5 lg:w-60 bg-[#087f23] mx-auto p-2 mt-5 rounded text-center">
        PROPOSAL ENTRY FORM
      </h1>
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
              type="number"
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
        <div class="p-1 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-2">
          <div className="text-start px-2">
            <label className="text-start text-xs">SELECT OFFICE</label>
            <select className="form-input shadow text-sm border-[#E3F2FD] mt-1 w-full">
              <option value={"name"}>Dhaka Mohanagar</option>
              <option value={"name"}>Dhaka North</option>
              <option value={"name"}>Dhaka South</option>
            </select>
          </div>
          <div className="text-start px-2">
            <label className="text-start text-xs">SELECT PROJECT</label>
            <select className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full ">
              <option value={"name"}>Dhaka Mohanagar</option>
              <option value={"name"}>Dhaka North</option>
              <option value={"name"}>Dhaka South</option>
            </select>
          </div>
          <div className="text-start px-2">
            <label className="text-start text-xs text-sm">
              SELECT CHAIN LIST
            </label>
            <select className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full">
              <option value={"name"}>Dhaka Mohanagar</option>
              <option value={"name"}>Dhaka North</option>
              <option value={"name"}>Dhaka South</option>
            </select>
          </div>
        </div>
        <div class="p-1 mb-4 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-3 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
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
            <label className="text-start text-xs text-sm">
              SELECT CHAIN LIST
            </label>
            <select className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full">
              <option value={"name"}>Dhaka Mohanagar</option>
              <option value={"name"}>Dhaka North</option>
              <option value={"name"}>Dhaka South</option>
            </select>
          </div>
        </div>

        <div class="p-1 mb-4 flex grid grid-cols-1 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
          <div className="text-start px-0">
            <div class="p-1 mb-4 flex grid grid-cols-2 rounded     mt-0 lg:grid-cols-2 gap-0  w-full  justify-center align-items-center   lg:mx-auto lg:mt-0">
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
          </div>

          <div className="text-start px-2">
            <label className="text-start text-xs text-sm">
              SELECT CHAIN LIST
            </label>
            <select className="form-input text-sm shadow border-[#E3F2FD] mt-1 w-full">
              <option value={"name"}>Dhaka Mohanagar</option>
              <option value={"name"}>Dhaka North</option>
              <option value={"name"}>Dhaka South</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
