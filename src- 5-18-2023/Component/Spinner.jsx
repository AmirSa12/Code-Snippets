import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin h-5 w-5 text-gray-500" style={{color: 'black'}} />
    </div>
  );
};

export default Spinner;
