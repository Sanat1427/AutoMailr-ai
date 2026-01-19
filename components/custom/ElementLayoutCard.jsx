import React from 'react'

function ElementLayoutCard({ layout, index }) {
  return (
    <div
      key={index}
      className='flex flex-col items-center justify-center
                border border-gray-200 bg-white rounded-xl p-4
                group hover:shadow-lg hover:border-purple-500 hover:scale-105 transition-all duration-200 cursor-grab active:cursor-grabbing'
    >
      <div className='p-3 bg-gray-50 group-hover:bg-purple-100 rounded-full transition-colors duration-200 mb-2'>
        {<layout.icon className='h-6 w-6 text-gray-600 group-hover:text-purple-600' />}
      </div>
      <h2 className='text-xs font-medium text-gray-700 group-hover:text-purple-700'>{layout.label}</h2>
    </div>
  )
}

export default ElementLayoutCard
