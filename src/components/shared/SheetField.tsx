import Input from '@mui/joy/Input'
import React, { useEffect, useRef } from 'react'

export interface SheetFieldProps {
    editable: boolean,
    children?: any,
    textClass?: string,
    inputClass?: string,
    defaultValue?: string | number,
    placeholder?: string,
    inputType?: React.HTMLInputTypeAttribute,
    onChange: (value: any) => void;
}

export const SheetField = ({ children, editable, textClass, defaultValue, inputClass, placeholder, inputType, onChange }: SheetFieldProps) => {
    return editable ? (
        <Input 
            type={inputType}
            className={inputClass} 
            variant="plain" 
            defaultValue={defaultValue ? defaultValue : children} 
            size='sm'
            onBlur={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    ) : (
        <div className={textClass}>
            {children}
        </div>
    )
}
