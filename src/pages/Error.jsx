import Lottie from 'lottie-react';
import groovyWalkAnimation from "../assets/animation_lo2t8hlx.json";
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='w-11/12 max-w-[700px] mx-auto min-h-[80vh] flex items-center justify-center flex-col'>
            <Lottie animationData={groovyWalkAnimation} loop={true} />
           <div className='mt-[-20px] z-[999]'>
           <Link to="/" className='shadow-md cursor-pointer hover:shadow-xl py-[8px] px-6 text-white rounded-full bg-primary text-base  bg-gradient-main font-poppins font-semibold duration-150'>Go Home</Link>
           </div>
        </div>
    );
};

export default Error;