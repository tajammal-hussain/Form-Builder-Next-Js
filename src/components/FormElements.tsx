import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType  = "TextField";

export type FormElement = {
    type: ElementsType;
    constructor: (id: string)=> FormElementInstance;
    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    }
    designerComponent: React.FC<{element:FormElementInstance}>;
    formComponent: React.FC;
    propertiesComponent: React.FC<{element:FormElementInstance}>;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type FormElmentsType = {
    [key in ElementsType]: FormElement;
}
export const FormElements: FormElmentsType = {
    TextField: TextFieldFormElement,
}
