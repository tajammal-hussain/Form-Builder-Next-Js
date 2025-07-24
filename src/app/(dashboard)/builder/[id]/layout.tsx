import React from 'react'

type props = {
    children : React.ReactNode
}
const Layout = ({children}: props) => {
  return (
    <div className='flex flex-grow w-full mx-auto h-full'>
        {children}
    </div>
  )
}

export default Layout