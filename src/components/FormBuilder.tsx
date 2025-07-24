"use client"
import React from 'react'
import { GetFormById } from '../../actions/form'
import PreviewDialogBtn from './PreviewDialogBtn'
import SaveFormBtn from './SaveFormBtn'
import PublishFormBtn from './PublishFormBtn'
import Designer from './Designer'
import { DndContext, MouseSensor, TouchSensor, useSensors, useSensor } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'

type props = {
    form: Awaited<ReturnType<typeof GetFormById>>
}
const FormBuilder = ({form} : props) => {

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 300,
                tolerance: 10
            }
        })
    );
    return (
    <DndContext sensors={sensors}>
    <main className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
            <h2 className='truncate font-medium'>
                <span className='text-muted-foreground mr-2'>Form:</span>
                {form?.name}
            </h2>
            <div className='flex items-center gap-2'>
                <PreviewDialogBtn />
                {
                    !form?.published && (
                        <>
                        <SaveFormBtn />
                        <PublishFormBtn />
                        </>
                    )
                }
            </div>
        </nav>
        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent'>
            <Designer/>
        </div>
    </main>
    <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder