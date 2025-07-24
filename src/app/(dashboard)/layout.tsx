import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
        <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
            <Logo/>
            <div className='flex gap-4 items-center'>
                <ThemeSwitcher/>
                <UserButton afterSwitchSessionUrl='/sing-in'/>
            </div>
        </nav>

        <main className='flex w-full flex-grow justify-center'>
            <div className='container pt-4'>
                {children}
            </div>
        </main>
    </div>
  )
}

export default Layout