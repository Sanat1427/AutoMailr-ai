import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({ label, value, onHandleInputChange }) {
  return (
    <div className='mb-2'>
      <label className='text-xs font-medium text-gray-500 mb-1 block uppercase tracking-wide'>{label}</label>
      <Input
        className="border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        value={value}
        onChange={(event) => onHandleInputChange(event.target.value)}
      />
    </div>
  )
}

export default InputField