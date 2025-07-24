import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
        <Image src="/next.svg" alt="Vercel Logo" width={130} height={130}/>
    </Link>
  )
}

export default Logo