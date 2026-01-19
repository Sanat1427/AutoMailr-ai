import React from 'react'

function TextComponent({style,content,outerStyle}) {
  return (
    <div style={outerStyle} className='w-full'>
        <h2 style={style}>{content}</h2>
    </div>
  )
}

export default TextComponent