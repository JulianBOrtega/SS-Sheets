import React from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export interface SheetFieldSelectorProps {
    editable: boolean,
    options: {value: number, display: string}[],
    children?: any,
    textClass?: string,
    inputClass?: string,
    defaultValue?: number,
    placeholder?: string,
    onChange: (value: any) => void;
}

export const SheetFieldSelector = ({ children, editable, options, textClass, defaultValue, inputClass, placeholder, onChange }: SheetFieldSelectorProps) => {
    return editable ? (
        <Select
            className={inputClass}
            variant="plain"
            defaultValue={defaultValue ? defaultValue : children}
            size='sm'
            onChange={(event, value) => onChange(value)}
            placeholder={placeholder}
        >
            { options.map((op, i) => 
                <Option key={i + '-' + op.display + '-' + op.value}
                    value={op.value}
                >
                    {op.display}
                </Option>
            )}
        </Select>
    ) : (
        <div className={textClass}>
            {children}
        </div>
    )
}
