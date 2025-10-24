import React from 'react'
import { Button } from '../ui/button'
import Image from "next/image";
import SignButton from './SignButton';

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center mt-24'>
        <h2 className='font-extrabold text-5xl text-center'>
            AI-Powered 
            <span className='text-primary'> Email Templates</span>
             </h2>
             <p className='text-center mt-4'>From subject lines to sleek layouts — our AI builds ready-to-send email templates that match your tone, style, and goals. Whether you’re launching a new product, nurturing leads, or sending a weekly newsletter, our intelligent design engine crafts emails that look beautiful, read naturally, and convert effortlessly. 
                No design skills or copywriting experience required — just describe your intent, and watch your next campaign come to life in seconds.
                </p>
                <div className='text-center mt-4'>
                    <Button variant='outline'>Try Demo</Button>
                    <SignButton/>
                </div>
                <Image src ={'/landing.png'} alt='landing' width={1000} height={800} className='mt-10 rounded-xl '/>
    </div>
  )
}

export default Hero