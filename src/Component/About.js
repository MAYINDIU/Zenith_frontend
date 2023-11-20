import React from 'react';
import Navbar from './Nabar/Navbar';

const About = () => {

    const userAllInfo=JSON.parse(localStorage.getItem('UserDetails'));     
    const ROLE_NAME=userAllInfo.ROLE_NAME;

    return (
        <div>
            <Navbar/>
           <h1 className='mt-5'>YOU ARE A {ROLE_NAME}</h1> 
        </div>
    );
};

export default About;