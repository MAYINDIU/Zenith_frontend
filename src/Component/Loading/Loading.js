import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center mt-20 mb-24'>
         <CircularProgress color="success" />
        </div>
    );
};

export default Loading;