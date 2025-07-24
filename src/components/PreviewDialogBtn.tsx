import React from 'react'
import { Button } from './ui/button'
import { BsEye } from 'react-icons/bs'
import { useDesigner } from './hooks/useDesigner';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const PreviewDialogBtn = () => {
  const {elements} = useDesigner();

  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='gap-2'>
            <BsEye className='h-4 w-4'/>
            <span>Preview</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-x-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-2 border-b'>
          <p className='text-sm text-muted-foreground'>
            Preview
          </p>
        </div>
      </DialogContent>
    </Dialog>

    </>
  )
}

export default PreviewDialogBtn