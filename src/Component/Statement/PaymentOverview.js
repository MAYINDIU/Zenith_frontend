import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import nagad from '../../assets/icon/nagad.jpg';
const PaymentOverview = () => {
    const { id, name, amount } = useParams();
    const [details, setDetails] = useState([]);
    console.log(details);
    console.log(id, name, amount);

    const charge = amount * 0.01;
    const total = amount;
    console.log(charge);

    //     var nf = new Intl.NumberFormat();
    // const amt = nf.format(amount);
    // const charge = amt * 0.01;
    // const total = nf.format(amt+charge);
    // const total = nf.format(TOTAL);

    // let a = 10;
    // let b = 30;
    // let c = a + b;
    // console.log(object);

    return (
          <div>
            <h4 className='mb-2 sm:text-sm lg:text-xl font-bold text-dark mt-3  uppercase  drop-shadow-sm'>Confirm Your Payment Selection</h4>

            <div className='flex justify-center mb-52'>
                <div class="card w-full max-w-4xl p-5  shadow-lg rounded ">
                    <div class="card-body">
                        <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                            <div class="">
                                <h2 className='text-dark font-bold text-md text-left '>Payment Gateway :
                                </h2>
                                <img className=' w-24 h-12' src={nagad} alt="Bkash" />
                            </div>
                            <div class="mt-1">
                                <h4 className='text-dark text-sm mt-2  p-0 font-bold  rounded font-bold  text-left'>PROPOSER             : <span c>{name}</span>   </h4>
                                <h4 className='text-dark text-sm  mt-2 p-0 font-bold rounded font-bold  text-left'>POLICY NUMBER       : <span>{id}</span>  </h4>
                            </div>
                        </div>



                        <h3 className='text-white text-center p-2 font-bold drop-shadow rounded bg-[#087f23]'>PAYMENT SUMMARY </h3>

                        {/* 
                        <h3 className='text-dark text-sm  p-2 font-bold drop-shadow rounded bg-[#e0f2f1] text-left'>NAME       :{name} <span className='ml-20'>POLICY NUMBER: {id}</span> </h3>

 */}
                        <h3 className='text-dark text-sm mt-2  p-2 font-bold drop-shadow rounded bg-[#e0f2f1] text-left'>PREMIUM AMOUNT DUE : <span className='lg:ml-20'>{amount}</span> </h3>

                        <h3 className='text-dark text-sm  mt-2 p-2 font-bold drop-shadow rounded  text-left'>PAYMENT GATEWAY USAGE FEE : <span className='lg:ml-9'>{ charge}</span> </h3>

                        <h3 className='text-dark text-sm mt-2 p-2 font-bold drop-shadow rounded bg-[#e0f2f1] text-left'>TOTAL        : <span className='lg:ml-52'>{total}</span> </h3>
                        {/* <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='tk' type="number" placeholder='' value={amount} required /> */}

                        <div className=''>
                            <button onClick={() => { window.location.href = "https://api.fareastislamilife.com/nagadPG/index.php" }} className='btn btn-success bg-[#087f23]  rounded btn-md px-24 mt-5 py-2 text-white font-bold'>SUBMIT</button>

                        </div>

                    </div>
                </div>

            </div>

            {/* <div class="w-full max-w-lg  py-4  ">
                <form onSubmit={handleAdded} class="bg-white shadow-xl card rounded bordered px-8 pt-2 pb-8 mb-1 p-5">
                    <div class="mb-4">
                        <label class="block text-left text-gray-700 text-sm  mb-2" for="username">
                            *This  fields are mandatory
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='tk' type="number" placeholder='' value={amount} required />
                    </div>

                    <button onClick={() => { window.location.href = "https://api.fareastislamilife.com/nagadPG/index.php" }} className='btn btn-success bg-[#087f23]  rounded btn-sm px-12 text-white font-bold'> Submit</button>
                </form>

            </div> */}



            {/* 
            <a href="#" onClick={handleSend}>
                Click me
            </a> */}
            {/* <a href="https://api.fareastislamilife.com/nagadPG"><button className='btn btn-success btn-sm lg:btn-md mt-5 text-white px-8  rounded bg-[#087f23]'> PROCESS TO PAY </button></a> */}
        </div>
    );
};

export default PaymentOverview;