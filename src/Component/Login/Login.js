import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon/jenith.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

const navigate = useNavigate();
const[userData,setUserData]=useState('');
console.log(userData)
const error=userData?.error;
console.log(error);
const User=userData?.user_details;


const status=User?.STATUS;

localStorage.setItem("UserDetails", JSON.stringify(User));
        

// fetch all department head data
// useEffect(() => {
//     fetch('http://localhost:5000/api/department-head-list')
//     .then(res=>res.json())
//     .then(data=>setDeptHeadList(data.dept_head));
//   });
// fetch all department head data

const login = event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    // const addItem = {username, password};
    //     console.log(addItem);

    //     if(username==='admin' && password==='admin'){
    //       navigate('/dashboard');

    //     }

    const url = `http://localhost:5000/api/user-login/${username}/${password}`;
    fetch(url, {
        method: "get",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
        },
        // body: JSON.stringify(addItem)

    })
        .then(Response => Response.json())
        .then(data => setUserData(data));              
    }

    useEffect(() => {
        if (status=== 'A') {
      
            navigate(`/dashboard`);
             
        } else if(error=== 'User not found') {
            // alert('Please type proper user id & pass');
        
            //  toast.error(`Opps!Please type proper emp code & password`);
        }
        else if(status==='I') {
            alert('!!Your Account Deactivated');
        }
    });

    return (
        <div>
             <div class="flex justify-center lg:mt-36">
            <div class="block shadow-xl w-1/2 lg:w-1/2  bordered rounded p-3 lg:p-10 rounded bordered shadow-xl bg-white max-w-lg">
            <form onSubmit={login} className="flex w-full flex-col gap-4">

                <div className='flex justify-center'>
                <img className='w-24  shadow-lg bg-white rounded-full p-2 hidden lg:block' src={logo} />
                </div>

                <div className='w-full'>
                    <div className="mb-2 block w-full text-left">
                    <Label htmlFor="PERSONALID" value="PERSONAL ID" />
                    </div>
                    <TextInput id="username" type="text" placeholder="Enter PERSONAL ID" required />
                </div>
                <div>
                    <div className="mb-2 block text-left">
                    <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput id="password" type="password" placeholder="Enter Password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <h6 className='text-red-700'>{error}</h6>
                
                <div>
                    
                </div>
                
                  <Button   type='submit' color="success">Login</Button>
               
                </form>
                <ToastContainer />
            </div>

     
            </div>
        </div>
    );
};

export default Login;