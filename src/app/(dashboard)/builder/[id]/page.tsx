import React from 'react'
import { GetFormById } from '../../../../../actions/form'
import FormBuilder from '@/components/FormBuilder'

const BuilderPage = async ({params}: {params: {id: string}}) => {
    const {id} = params
    const form = await GetFormById(Number(id))
    if(!form){
        throw new Error('Form not found')
    }
    
    return (
        <FormBuilder form={form}/>
    )
}

export default BuilderPage