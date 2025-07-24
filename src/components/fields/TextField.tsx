"use client";
import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDesigner } from "../context/DesignerContext";
const type : ElementsType = "TextField";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

const extraAttributes = {
    label: "Text Field",
    helperText: "Enter text",
    required: false,
    placeholder: "Enter text",
}

export const TextFieldFormElement: FormElement = {
    type: "TextField",
    constructor: (id: string) => {
        return {
            id,
            type: "TextField",
            extraAttributes: extraAttributes,
        }
    },
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>TextField</div>,
    propertiesComponent: PropertiesForm,
}
type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}
type PropertiesFormSchema = z.infer<typeof propertiesFormSchema>;
const propertiesFormSchema = z.object({
    label: z.string().min(2).max(200),
    helperText: z.string().max(200),
    required: z.boolean(),
    placeholder: z.string().max(50),
})

function PropertiesForm(
    {
        element
    }
    : {
        element: FormElementInstance;
    }
){
    const {updateElement} = useDesigner();
    const elementInstance = element as CustomInstance;
    const form = useForm<z.infer<typeof propertiesFormSchema>>({
        resolver: zodResolver(propertiesFormSchema),
        mode: "onBlur",
        defaultValues: {
            label: elementInstance.extraAttributes.label,
            helperText: elementInstance.extraAttributes.helperText,
            required: elementInstance.extraAttributes.required,
            placeholder: elementInstance.extraAttributes.placeholder,
        }
    })
    useEffect(() => {
        form.reset(elementInstance.extraAttributes);
    }, [elementInstance.extraAttributes, form]);


    function applyChanges(changes: PropertiesFormSchema){
        updateElement(elementInstance.id,{
            ...elementInstance,
            extraAttributes: {
                ...elementInstance.extraAttributes,
                ...changes,
            }
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(applyChanges)} onBlur={form.handleSubmit(applyChanges)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="label"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input {...field} 
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter"){
                                            e.preventDefault();
                                            e.currentTarget.blur();
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The label of the field <br/> it will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="placeholder"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Placeholder</FormLabel>
                            <FormControl>
                                <Input {...field} 
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter"){
                                            e.preventDefault();
                                            e.currentTarget.blur();
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field <br/> it will be displayed above the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="helperText"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Helper Text</FormLabel>
                            <FormControl>
                                <Input {...field} 
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter"){
                                            e.preventDefault();
                                            e.currentTarget.blur();
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The helper text of the field <br/> it will be displayed below the field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               <FormField
                    control={form.control}
                    name="required"
                    render={({field}) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                            <FormLabel>Required</FormLabel>
                            <FormDescription>
                                Whether the field is required or not
                            </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    )
}

function DesignerComponent({element}:{element:FormElementInstance}){
    const elements = element as CustomInstance;
    const {label,helperText,required,placeholder} = elements.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
            <Label>{label}</Label>
            {required && <span className="text-red-500">*</span>}
            </div>
            <Input readOnly disabled  placeholder={placeholder} />
            {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
        </div>
    )
}