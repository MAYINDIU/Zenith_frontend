import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/img/payment.jpg';

const Banner = () => {

    const test = '00006238';
    return (
   


        <div className='lg:px-24 px-2 mt-3 lg:mb-12 lg:mt-5  items-center'>
            <div class="grid lg:grid-cols-2 gap-2  justify-center">
                <div className=''>
                <a  class="flex flex-col items-center bg-white rounded-md bordered shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img class="object-cover w-full h-30  md:h-48 md:w-48 lg:w-96 lg:h-48 rounded " src={banner} alt=""/>
                <div class="flex flex-col justify-between p-0 leading-normal">
                    <h5 class="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pay Premium</h5>
                    <p class="mb-0 font-normal text-gray-700 text-sm dark:text-gray-400">Click to Pay your Premium Through Card/Nagad/Rocket Online Banking.</p>
                       <div class="justify-left mt-5 mb-4 lg:mb-0">
                                <Link to='/Payment-channel'>
                                    <Button variant="contained">PAYMENT NOW</Button>
                                </Link>
                    </div>
                        </div>
                    </a>
                </div>

                     <div>
                <a  class="flex flex-col items-center bg-white rounded bordered shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img class="object-cover w-full h-24  md:h-48 md:w-48 rounded lg:w-96 lg:h-48 " src={banner} alt=""/>
                        <div class="flex flex-col justify-between p-0 leading-normal">
                            <h5 class="mb-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">How to Pay Your Premium</h5>
                            <p class="mb-0 text-justify p-2 text-sm font-normal text-dark dark:text-dark" >Learn about the available online channels of Fareast Premium Payment and how to pay through each channel.</p>
                       
                              <div class="justify-left mt-0 mb-4 lg:mb-0">
                                <Link to='/payment_channel'>
                                    <Button variant="contained">LEARN MORE</Button>
                                </Link>

                            
                    </div>
                        </div>
                    </a>
                </div>

               </div>
 


        </div>
    );
};

export default Banner;