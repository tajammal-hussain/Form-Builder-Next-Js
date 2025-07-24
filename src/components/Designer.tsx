"use client"
import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar'
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { useDesigner } from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'
import { idGenerator } from '@/lib/idGenerator'
import { Button } from './ui/button'
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
    const {elements,addElements,selectedElement,setSelectedElement,removeElements, updateElement} = useDesigner();

    const droppable = useDroppable({
        id: 'designer-drop-area',
        data: {
            isDesignerDropArea: true
        }
    })
    useDndMonitor({
        onDragEnd: (event:DragEndEvent) => {
            const {active,over} = event;
            if(!active || !over) return;

            //check if the element is a designer btn element and the drop area is a designer drop area
           const isDesignerBtnElement  = active.data?.current?.isDesignerBtnElement;
           const isDesignerDropArea  = over.data?.current?.isDesignerDropArea;


           if(isDesignerBtnElement && isDesignerDropArea){
                const type = active.data?.current?.type;
                const newElmenet = FormElements[type as ElementsType].constructor(
                    idGenerator()
                )
                addElements(elements.length,newElmenet);
                return;
           }
           
           //check if the element is a designer element and the drop area is a designer drop area
           const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
           const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;
           const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;
           const isDraggingOverDesignerElement = active.data?.current?.isDesignerElement;

           if(isDroppingOverDesignerElement && !isDraggingOverDesignerElement){
                const type = active.data?.current?.type;
                const newElmenet = FormElements[type as ElementsType].constructor(
                    idGenerator()
                )
                const elementId = over.data?.current?.elementId;
                const overElmenetIndex = elements.findIndex((el) => el.id === elementId);
                if(overElmenetIndex === -1)
                {
                    throw new Error("Element not found");
                }

                let indexForNewElement = overElmenetIndex;
                if(isDroppingOverDesignerElementBottomHalf){
                    indexForNewElement = indexForNewElement + 1;
                }

                addElements(indexForNewElement,newElmenet);
                return;
           }

           //On Dragging the designer elements regarrange them accordingly
           
           if(isDraggingOverDesignerElement && isDroppingOverDesignerElement)
            {
                    const activeId = active.data?.current?.elemnentId;
                    const overId = over.data?.current?.elementId;

                    const activeElementIndex = elements.findIndex((el) => el.id === activeId);
                    const overElementIndex = elements.findIndex((el) => el.id === overId);

                    if(activeElementIndex === -1 || overElementIndex === -1)
                    {
                        throw new Error("Element not found");
                    }

                    const activeElement = {...elements[activeElementIndex]};

                    removeElements(activeId);
                    
                    let indexForNewElement = overElementIndex;
                    if(isDroppingOverDesignerElementBottomHalf){
                        indexForNewElement = indexForNewElement + 1;
                    }
                    
                    addElements(indexForNewElement,activeElement);
            }
        }
    })
  return (
    <div className='flex w-full h-full'>
        <div className='p-4 w-full h-full' onClick={() => {
            if(selectedElement){
                setSelectedElement(null);
            }
        }}>
            <div 
            ref={droppable.setNodeRef}
            className={cn("bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",droppable.isOver && "ring-2 ring-primary")}>
                {!droppable.isOver && elements.length === 0 ? <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>Drop Here</p> : null}
                {
                    droppable.isOver && elements.length === 0 && (
                        <div className='p-4 w-full'>
                            <div className='h-[120px] rounded-md bg-primary/20'>
                            </div>
                        </div>
                    )
                }
                {elements.length > 0 && (
                    <div className='flex flex-col  w-full gap-2 p-4'>
                        {elements.map((element,index) => (
                            <DesignerElementWrapper key={element.id} element={element} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
        <DesignerSidebar/>
    </div>
  )
}

function DesignerElementWrapper({element,index}:{element:FormElementInstance,index:number}){

    const [mouseIsOver,setMouseIsOver] = useState<boolean>(false);
    const {removeElements,setSelectedElement} = useDesigner();

    const topHalf = useDroppable({
        id : element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true
        }
    })
    const bottompHalf = useDroppable({
        id : element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true
        }
    })
    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: {
            type: element.type,
            isDesignerElement: true,
            elemnentId: element.id
        }
    })

    if(draggable.isDragging){
        return null;
    }
    const DesignerElement = FormElements[element.type].designerComponent;
    return (
        <>
        <div 
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        className='relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1
         ring-accent ring-inset'
         onMouseEnter={() => setMouseIsOver(true)}
         onMouseLeave={() => setMouseIsOver(false)}
         onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(element);
         }}
         >
            <div ref={topHalf.setNodeRef} className='absolute w-full h-1/2 rounded-t-md' />
            <div ref={bottompHalf.setNodeRef} className='absolute  w-full bottom-0 h-1/2 rounded-b-md' />

            {mouseIsOver && (
                <>
                <div className='absolute right-0 h-full'>
                    <Button variant={'ghost'} size={'icon'} className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500'
                    onClick={(e) => {
                        e.stopPropagation();
                        removeElements(element.id);
                    }}
                    >
                        <BiSolidTrash className='h-6 w-6'/>
                    </Button>
                </div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
                <p className='text-muted-foreground text-sm'>
                    Click for properties or drag to move
                </p>
                </div>
                </>
            )}
            
            {
                topHalf.isOver && (
                    <div  className={cn('absolute w-full h-1/2 rounded-t-md',topHalf.isOver && "ring-2 ring-primary")}></div>
                )
            }
          
            <div className=
            {cn('flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100', mouseIsOver && "opacity-30")}>
                <DesignerElement element={element} />
            </div>
            {
                bottompHalf.isOver && (
                    <div  className={cn('absolute  w-full bottom-0 h-1/2 rounded-b-md',bottompHalf.isOver && "ring-2 ring-primary")}></div>
                )
            }
        </div>
        </>
    )
}

export default Designer