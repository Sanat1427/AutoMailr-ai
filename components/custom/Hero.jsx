"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from "next/image";
import SignButton from './SignButton';
import { ArrowRight, PlayCircle } from 'lucide-react';

function Hero() {
  return (
    <div className='relative overflow-hidden'>
      {/* Background Gradients */}
      <div aria-hidden="true" className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform -z-10">
        <div className="bg-gradient-to-r from-purple-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl from-blue-100 via-blue-100 to-blue-200 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]" />
      </div>

      <div className='px-6 lg:px-28 xl:px-44 flex flex-col items-center mt-24 pb-20'>
        <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-800 mb-6">
          ✨ AI-Powered Email Builder
        </div>

        <h2 className='font-extrabold text-5xl md:text-6xl text-center leading-tight text-gray-900 tracking-tight'>
          Build Beautiful Emails <br />
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'> in Seconds, Not Hours</span>
        </h2>

        <p className='text-center mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed'>
          Describe your goal, and our AI drafts the perfect email with a sleek layout.
          Drag, drop, and customize to match your brand without writing a single line of code.
        </p>

        <div className='flex gap-4 mt-8'>
          <SignButton className="h-11 px-8 text-base" />
          <Button
            variant='outline'
            className="gap-2 px-6 h-11 text-base hover:bg-gray-50"
          >
            <ArrowRight className='w-4 h-4' /> Get Demo
          </Button>
        </div>

        <div className='mt-16 p-2 bg-white/50 rounded-2xl border border-gray-200/50 backdrop-blur-sm shadow-2xl'>
          <Image
            src={'/landing.png'}
            alt='landing dashboard'
            width={1000}
            height={800}
            className='rounded-xl shadow-sm border border-gray-100'
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Hero