import React from 'react'
import { Button } from './ui/button'
import { BsEye } from 'react-icons/bs'

const PreviewDialogBtn = () => {
  return (
    <Button variant={'outline'} className='gap-2'>
        <BsEye className='h-4 w-4'/>
        <span>Preview</span>
    </Button>
  )
}

export default PreviewDialogBtn