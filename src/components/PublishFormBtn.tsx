import React from 'react'
import { MdPublish } from "react-icons/md";
import { Button } from './ui/button';

const PublishFormBtn = () => {
  return (
    <Button variant={'outline'} className='gap-2'>
        <MdPublish className='h-4 w-4'/>
        <span>Publish</span>
    </Button>
  )
}

export default PublishFormBtn