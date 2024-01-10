import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon/jenith.png";
import { Circles, ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
// import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [spinner, setSpinner] = useState(false);
  // console.log(userData)
  const error = userData?.error;
  // console.log(error);
  const User = userData?.user_details;

  const ROLE_ID = User?.ROLE_ID;

  localStorage.setItem("UserDetails", JSON.stringify(User));

  //user login process
  const login = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const url = `http://localhost:5000/api/user-login/${username}/${password}`;
    fetch(url, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json",
      },
    })
      .then((Response) => Response.json())
      .then((data) => setUserData(data));
    setSpinner(true);
  };

  useEffect(() => {
    if (ROLE_ID === 0) {
      swal({
        title: "Login Successfully",
        icon: "success",
      });
      navigate(`/dashboard`);
    } else if (error === "User not found") {
      // alert('Please type proper user id & pass');
      setSpinner(false);
      //  toast.error(`Opps!Please type proper emp code & password`);
    } else if (ROLE_ID === 1) {
      navigate(`/development`);
    } else if (ROLE_ID === 2) {
      navigate(`/department-head`);
    } else if (ROLE_ID === 3) {
      navigate(`/development`);
    } else if (ROLE_ID === 4) {
      navigate(`/development`);
    } else if (ROLE_ID === 5) {
      navigate(`/about`);
      // alert('!!Your Account Deactivated');
    }
  });

  return (
    <div>
      <div class="flex justify-center mx-6 mt-24 lg:mx-0 lg:mt-36">
        <div class="block shadow-xl w-full lg:w-1/2  bordered rounded p-3 lg:p-10 rounded bordered shadow-xl bg-white max-w-lg">
          <form onSubmit={login} className="flex w-full flex-col gap-4">
            <div className="flex justify-center">
              <img
                className="w-24  shadow-lg bg-white rounded-full p-2 hidden lg:block"
                src={logo}
              />
            </div>

            <div className="w-full">
              <div className="mb-2 block w-full text-left">
                <Label htmlFor="PERSONALID" value="PERSONAL ID" />
              </div>
              <TextInput
                id="username"
                type="text"
                placeholder="Enter PERSONAL ID"
                required
              />
            </div>
            <div>
              <div className="mb-2 block text-left">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <h6 className="text-red-700">{error}</h6>
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
            <div></div>

            <Button type="submit" color="success">
              Login
            </Button>
          </form>
        </div>

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
    </div>
  );
};

export default Login;
