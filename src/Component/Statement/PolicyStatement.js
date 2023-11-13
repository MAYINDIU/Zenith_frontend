import { Button, Link, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pol_details from './Pol_details';
import Loading from '../Loading/Loading';
const PolicyStatement = () => {

    const [error, setError] = useState('');
    const [relode, setRelode] = useState(false);
    const [astatement, setaStatement] = useState([]);
  const [status, setstatus] = useState([]);
    console.log(astatement);

    // const navigate = useNavigate();

    // const handleStatement = event => {
    //     event.preventDefault();
    //     const pol_no = event.target.pol_no.value;
    //     // console.log(pol_no)
    //     const url = `http://202.164.213.67/payment/pol_statement.php?POLICY_NO=${pol_no}&&DOB=01-JAN-79`;
    //     fetch(url)
    //         .then(Response => Response.json())
    //         .then(data => setaStatement(data));

    // }
    // const handleStatement = event => {
    //     event.preventDefault();
    //     const pol_no = event.target.pol_no.value;
    //     console.log(pol_no)
    //     const url = `https://api.fareastislamilife.com/nagad/api/policy/policy-info/${pol_no}`;
    //     fetch(url)
    //         .then(Response => Response.json())
    //         .then(data => console.log(data));

    // }

    const handleAdded = event => {
        event.preventDefault();
        const policy_no = (event.target.pol_no.value);
        console.log(policy_no);
        if (policy_no < 10) {
            setError('Policy Number no longer than 10 character')
            return;
        }

        console.log(policy_no);
        const addItem = { policy_no };

        const url = 'https://fareastlife.com/api/policy/policy-info';
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addItem)

        })
            .then(Response => Response.json())
            .then(data => setaStatement(data['policy_info']));
           
    }


    return (
          <div className="div m-5">
            <h1 className=' text-center mt-5 uppercase font-bold text-info lg:text-xl  drop-shadow-sm'>Please Provide Policy Details  </h1>

            <div className="flex mb-6 justify-center ">

                <div class="w-full max-w-lg  py-4">
                    <form  onSubmit={handleAdded} class="bg-white shadow-xl card rounded bordered px-8 pt-2 pb-8 mb-1 p-5">
                        <div class="mb-4 mt-5">
                            <label class="block text-left text-gray-700 text-sm  mb-2" for="username">
                                *This  fields are mandatory
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='pol_no' id="pol_no" type="number" placeholder="Type Your Inforce Policy Number" required />
                        </div>

                        <button className='btn btn-success bg-[#087f23]  rounded btn-sm px-12 py-2 text-white font-bold' variant="contained">SUBMIT</button>
                                    {/* <Button className='w-32 rounded btn-sm px-12 text-white font-bold' variant="contained">SUBMIT</Button> */}

                     {/* <div class="justify-left mt-8 mb-4  lg:mb-0">
                                <Link to='/Policy-information'>
                                    <Button className='w-32 rounded btn-sm px-12 text-white font-bold' variant="contained">SUBMIT</Button>
                                </Link>
                    </div> */}
                    </form>

                </div>

            </div>
           
          
           {
                astatement.length === 0 ? <p className='text-center'><Loading /> </p> :
                astatement.map(product => <Pol_details key={product.id} product={product}></Pol_details>)

            }
       


        </div>
    );
};

export default PolicyStatement;