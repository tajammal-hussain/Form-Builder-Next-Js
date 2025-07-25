import React, { useTransition } from 'react'
import { MdPublish } from "react-icons/md";
import { Button } from './ui/button';
import { PublishForm } from '../../actions/form';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogAction,
} from './ui/alert-dialog'
import { useState } from 'react'
import { useDesigner } from './context/DesignerContext'
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PublishFormBtn = ({formId}:{formId:number}) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const publishForm = async () => {
      try{
        await PublishForm(formId);
        toast.success('Form published successfully', {
          description: 'Your form has been published successfully',
        });
        router.refresh();
      }
      catch(error){
        toast.error("Failed to publish form", {
          duration: 5000,
          description: 'Failed to publish form',
      })
      }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant={'outline'} className='gap-2'>
          <MdPublish className='h-4 w-4'/>
          <span>Publish</span>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to publish this form?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
        disabled={loading}
        onClick={() => {
          startTransition(publishForm);
        }}
        >Publish {loading && <ImSpinner2 className='animate-spin'/>}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormBtn