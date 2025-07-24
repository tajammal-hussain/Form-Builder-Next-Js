import { SaveIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const SaveFormBtn = () => {
  return (
    <Button variant={'outline'} className='gap-2'>
        <SaveIcon className='h-4 w-4'/>
        <span>Save</span>
    </Button>
  )
}

export default SaveFormBtn