import React from 'react'

function DividerComponent({ style, outerStyle }) {
  return (
    <div style={outerStyle} className='w-full'>
      <hr style={style} />
    </div>
  )
}

export default DividerComponent