import React from 'react'
import { useDesigner } from './context/DesignerContext';
import { FormElements } from './FormElements';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { Separator } from './ui/separator';

const PropertiesFormSidebar = () => {
    const {selectedElement,setSelectedElement} = useDesigner();
    const PropertiesForm = selectedElement?.type ? FormElements[selectedElement.type].propertiesComponent : null;
    if(!PropertiesForm || !selectedElement) return null;
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex justify-between items-center w-full'>
                <p className='text-sm text-foreground/70'>Element Properties</p>
                
                <Button variant='outline' size='icon' onClick={() => setSelectedElement(null)}>
                    <AiOutlineClose />
                </Button>
            </div>
            <Separator className='col-span-1 md:col-span-2 my-2'/>
            <PropertiesForm element={selectedElement}/>
        </div>
    )
}

export default PropertiesFormSidebar