import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

const SidebarBtnElement = (
    {
        formElement
    }
    : {
        formElement: FormElement
    }
) => {
    const {label,icon : Icon} = formElement.designerBtnElement;
    const draggable = useDraggable({
        id : `designer-btn-${formElement.type}`,
        data:{
            type : formElement.type,
            isDesignerBtnElement: true,
        }
    })
  return (  
    <Button 
    ref={draggable.setNodeRef}
    {...draggable.listeners}
    {...draggable.attributes}
    variant="outline" className={cn('flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',draggable.isDragging && 'ring-2 ring-primary')}>
        <Icon className='w-8 h-8 text-primary cursor-grab'/>
        <p className='text-sm'>{label}</p>
    </Button>
  )
}

export default SidebarBtnElement


const SidebarBtnElementDragOverlay = (
    {
        formElement
    }
    : {
        formElement: FormElement
    }
) => {
    const {label,icon : Icon} = formElement.designerBtnElement;
    
  return (  
    <Button 
    variant="outline" className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'>
        <Icon className='w-8 h-8 text-primary cursor-grab'/>
        <p className='text-sm'>{label}</p>
    </Button>
  )
}

export {SidebarBtnElementDragOverlay};