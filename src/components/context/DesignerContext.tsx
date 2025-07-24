"use client"
import React, { createContext, Dispatch, useContext, useState } from 'react'
import { FormElementInstance } from '../FormElements';

type DesignerContextType = {
    elements: FormElementInstance[];
    addElements: (index:number, elements: FormElementInstance) => void;
    removeElements: (id:string) => void;
    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<React.SetStateAction<FormElementInstance | null>>;
    updateElement: (id:string, element: FormElementInstance) => void;
}


export const DesignerContext = createContext<DesignerContextType>({
    elements: [],
    addElements: () => {},
    removeElements: () => {},
    selectedElement: null,
    setSelectedElement: () => {},
    updateElement: () => {},
})

export const DesignerContextProvider = ({children}: {children: React.ReactNode}) => {
    const [elements,setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement,setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElements = (index: number ,elements: FormElementInstance) => {
        setElements((prev) =>{
            const newElements = [...prev];
            newElements.splice(index,0,elements);
            return newElements;
        });
    }

    const removeElements = (id: string) => {
        setElements((prev) => prev.filter((elements) => elements.id !== id));
    }
    const updateElement = (id:string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex((e) => e.id === id);
            if(index !== -1){
                newElements[index] = element;
            }
            return newElements;
        });
    }
    return (
        <DesignerContext.Provider value={{elements,addElements,removeElements,selectedElement,setSelectedElement,updateElement}}>
            {children}
        </DesignerContext.Provider>
    )
}

export const useDesigner = () => {
    return useContext(DesignerContext);
}