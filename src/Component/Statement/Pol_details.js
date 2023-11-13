import React from 'react';
import { Link } from 'react-router-dom';
import bkash from '../../assets/icon/bkash.jpg';
import nagad from '../../assets/icon/nagad.jpg';
import Rocket from '../../assets/icon/rocket.jpg';
const Pol_details = ({product}) => {

 const { policy_no, policy_status, proposer, amount } = product;
    // const { policy_status } = product[1];
    
    console.log(policy_status);



    return (
             <div>
            <h4 className='mb-2 text-xl font-bold text-dark  uppercase  drop-shadow-sm'>Your Policy Details</h4>

            <div class="flex justify-center">
                    <div class="block p-6 rounded-lg shadow-lg w-full max-w-lg bg-[#087f23]">
                        <h2 className='text-white font-bold text-md text-left '>PROPOSER : {
                          proposer ? proposer : 'Please Type Valid Policy Number'
                        }</h2>

                        <h3 className='text-white text-left'>POLICY_NO : {
                            policy_no ? policy_no : 'Please Type Valid Policy Number'
                        }</h3>


                        <h3 className='text-white text-left'>POLICY STATUS : Inforce </h3>
                        {/* <h3 className='text-white text-left'>PAYMENT DUE TYPE : {NEXTPREM}</h3> */}
                        <h3 className='text-white font-bold text-left'>*PAYABLE AMOUNT : {amount}</h3>
                    </div>
            </div>

                     <div class="flex justify-center mt-3">
                    <div class="block p-6 rounded-lg shadow-lg w-full max-w-lg bg-[#087f23]">
                          <div class="form-control">
                            <label class="label cursor-pointer">
                                <span class="label-text text-white  drop-shadow-sm text-lg font-bold">*Select Payable Amount : {amount}</span>
                                <input type="radio" name="radio-6" class="radio checked:bg-blue-500" checked />
                            </label>
                        </div>
                    </div>
            </div>
                <h4 className='mb-2 text-xl font-bold text-dark mt-2  drop-shadow-sm uppercase'>Please Select Payment Gateway</h4>

                      <div class="flex justify-center">
                        <div class="block p-6 rounded-lg shadow-lg w-full max-w-lg ">
                               <div className='justify-center lg:flex'>
                         <div class="flex justify-center p-3 m-1 card w-38  bg-base-100 shadow-lg rounded bordered">
                                    <img className=' w-28 h-20' src={bkash} alt="Bkash" />
                                </div>
                                <div class="flex justify-center p-3 m-1  card w-38  bg-base-100 shadow-lg rounded bordered">
                                    <Link to={`/payment_overview=${policy_no}=${proposer}=${amount}`}> <img className=' lg:w-28 h-20' src={nagad} alt="Nagad" /></Link>
                                </div>
                                <div class="flex justify-center p-3 m-1 card w-38  bg-base-100 shadow-lg rounded bordered">
                                    <img className=' lg:w-28 h-20' src={Rocket} alt="Rocket" />
                                </div>
                            </div>

                        </div>
            </div>
           
        </div >
    );
};

export default Pol_details;