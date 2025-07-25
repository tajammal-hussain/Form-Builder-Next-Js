import { SaveIcon } from 'lucide-react'
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useDesigner } from './hooks/useDesigner'
import { UpdateFormContent } from '../../actions/form'
import { toast } from 'sonner'
import { ImSpinner2 } from 'react-icons/im'

const SaveFormBtn = ({formId}:{formId:number}) => {
  const {elements} = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try{
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(formId, JsonElements);
      toast.success('Form saved successfully', {
        description: 'Your form has been saved successfully',
      });
    }
    catch(error){
      toast.error("Failed to create form", {
          duration: 5000,
          description: 'Failed to save form',
      })
    }
  }
  return (
    <Button variant={'outline'} className='gap-2' disabled={loading} onClick={
      () => {
        startTransition(updateFormContent);
      }
    }>
        <SaveIcon className='h-4 w-4'/>
        <span>Save</span>
        {loading && <ImSpinner2 className='animate-spin'/>}
    </Button>
  )
}

export default SaveFormBtn