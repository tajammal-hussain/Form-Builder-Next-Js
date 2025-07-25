import React from 'react'
import { Button } from './ui/button'
import { BsEye } from 'react-icons/bs'
import { useDesigner } from './hooks/useDesigner';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { FormElements } from './FormElements';

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
          <p>

          </p>
        </div>
        <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto'>
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>
            {
              elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                return <FormComponent key={element.id} element={element} />
              })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>

    </>
  )
}

export default PreviewDialogBtn