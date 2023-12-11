import React from 'react';
import Navbar from './Nabar/Navbar';
import { useGetDepartmentHeadQuery } from '../features/api/dept_head_api';


const About = () => {

    const userAllInfo=JSON.parse(localStorage.getItem('UserDetails'));     
    const ROLE_NAME=userAllInfo.ROLE_NAME;
    const { data: test } = useGetDepartmentHeadQuery();
    console.log(test)

    return (
        <div>
            <Navbar/>
           <h1 className='mt-5'>YOU ARE A {ROLE_NAME}</h1> 
        </div>
    );
};

export default About;