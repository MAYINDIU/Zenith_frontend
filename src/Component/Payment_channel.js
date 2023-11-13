import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Payment_channel = () => {
    return (
        <div className='mb-64 p-2 lg:p-0'>
            <h3 className='mt-5 font-bold'>Please Select Payment Channel</h3>
    <div class="flex justify-center  ">
  <div class="block shadow-xl bordered rounded p-10 rounded bordered shadow-lg bg-white max-w-lg">
 <div class="flex ">
  <div>
    <div class="form-check font-sm lg:font-md mt-8">
      <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-right ml-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
      <label class="form-check-label drop-shadow-sm  font-bold inline-block text-gray-800" for="flexRadioDefault1">
       Online Payment through BKash/Rocket/Nagad 
      </label>
                            </div>

    <div class="form-check text-left mt-3">
      <input class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-right ml-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
      <label class="form-check-label drop-shadow-sm font-bold inline-block text-center text-gray-800 mr-5" for="flexRadioDefault2">
     Online Payment through Cards
      </label>
        </div>

  </div>
                    </div>
                     <div class="justify-left mt-8 mb-4  lg:mb-0">
                                <Link to='/Policy-information'>
                                    <Button className='w-32' variant="contained">NEXT</Button>
                                </Link>
                    </div>
  </div>
</div>
        </div>
    );
};

export default Payment_channel;