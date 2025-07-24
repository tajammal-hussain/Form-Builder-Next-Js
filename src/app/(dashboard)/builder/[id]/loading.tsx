import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const loading = () => {
  return (
    <div className='flex flex-grow  mx-auto items-center justify-center h-full w-full'>
        <ImSpinner2 className='animate-spin text-primary' size={24}/>
    </div>

  )
}

export default loading