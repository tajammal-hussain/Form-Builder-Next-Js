"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { formSchema, formSchemaType } from "@/schemas/form"

class UserNotFoundError extends Error{}

export async function GetFormStats(){
    const user = await currentUser();
    if(!user){
        throw new UserNotFoundError();
    }

    const forms = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })
    const visits = forms._sum.visits || 0;
    const submissions = forms._sum.submissions || 0;
    const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
    const bounceRate = visits > 0 ? 100 - submissionRate : 0;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate
    }
}

export async function createForm(data:formSchemaType){ 
    const validatedFields = formSchema.safeParse(data);
    if(!validatedFields.success){
        return {
            error: "Invalid form data",
            formErrors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const user = await currentUser();
    if(!user){
        throw new UserNotFoundError();
    }
    const {name, description} = validatedFields.data;

   const form = await prisma.form.create({
    data: {
        name,
        description,
        userId: user.id,
    },
   })

   if(!form){
    throw new Error("Failed to create form")
   }

   return form.id;
}

export async function GetForms(){
    const user = await currentUser();
    if(!user){
        throw new UserNotFoundError();
    }

    const forms = await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return forms;
}
export async function GetFormById(id: number){
    const user = await currentUser();
    if(!user){
        throw new UserNotFoundError();
    }
    const form = await prisma.form.findUnique({
        where: {
            id
        }
    })
    return form;
}