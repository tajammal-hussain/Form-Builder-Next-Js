"use client"
import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import {BsFileEarmarkPlus} from "react-icons/bs"
import {ImSpinner2} from "react-icons/im"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { formSchema, formSchemaType } from "@/schemas/form"
import { createForm } from "../../actions/form"
import { useRouter } from "next/navigation"


export const CreateFormBtn = () => {
    const router = useRouter();
    
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })
    async function onSubmit(values: formSchemaType){
       try {
        const formId = await createForm(values)
        if(formId){
            toast.success("Form created successfully")
            router.push(`/builder/${formId}`)
        }
        
        }catch(error){
         toast.error("Failed to create form", {
             duration: 5000,
             action: {
                 label: "Retry",
                 onClick: () => {
                     redirect("/")
                 }
             }
         })
        }
    }

    return (
       <>
       <Dialog>
        <DialogTrigger asChild>
            <Button className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
                <BsFileEarmarkPlus className="w-15 h-15 text-primary group-hover:text-primary-foreground transition-colors" />
                <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
                    Create New Form
                </p>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Form</DialogTitle>
                <DialogDescription>
                    Create a new form to collect data from your users.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                            {form.formState.isSubmitting ? (
                                <ImSpinner2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Create Form"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
       
       </Dialog>
       </>
    )
}