import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import SidebarBtnElement from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';
import { useDesigner } from './context/DesignerContext';

const DragOverlayWrapper = () => {
    const [draggedItem, setDraggedItem] = useState<Active | null> (null);
    const {elements} = useDesigner();

    useDndMonitor({
        onDragStart: (event) => {
           setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        }
    })

    if(!draggedItem) return null;
    let node = <div>No drag overlay</div>
    const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
    if(isSidebarBtnElement){
        const type = draggedItem?.data?.current?.type as ElementsType;
        node = <SidebarBtnElement formElement={FormElements[type] } />
    }

    const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
    if(isDesignerElement){
        const elementId = draggedItem?.data?.current?.elemnentId;
        const element = elements.find((el) => el.id === elementId);
        if(!element){
            node = <div>Element not found</div>
        }else{
            const DesignerElementComponent = FormElements[element.type].designerComponent;
            node = <div
            className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none'
            ><DesignerElementComponent element={element} /></div>
        }
        
    }

  return (
    <DragOverlay>
        {node}
    </DragOverlay>
  )
}

export default DragOverlayWrapper