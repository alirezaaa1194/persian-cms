import React from 'react'

export default function Errorbox({msg}) {
  return (
    <div className='bg-[#ff4f4f] p-5 text-center'>
        <h3 className='text-2xl text-white'>{msg}</h3>
    </div>
  )
}
