import React from 'react'
import { getStatModifier } from '../../utility/sheetCalc'
import Input from '@mui/joy/Input'

export interface BigSheetDiceProps {
    editable: boolean,
    value: number,
    label: string,
    onChange: (value: number) => void
}

export const BigSheetDice = ({editable, value, label, onChange}: BigSheetDiceProps) => {
  return (
    <div style={{
        width: 75,
        height: 75,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        background: 'rgba(50, 50, 50, 1)',
        borderRadius: 8,
        cursor: editable ? undefined : 'pointer'
    }}>
        { editable ? (
            <p style={{fontSize: 10, fontWeight: 600}}>{label}</p>
        ) : (
            <p style={{fontSize: 18, fontWeight: 600, textTransform: 'uppercase'}}>{label.slice(0, 3)}</p>
        )}

        { editable ? (
            <Input 
                type={'number'} 
                variant="plain" 
                defaultValue={value} 
                style={{
                    fontSize:16, 
                    width: 60,
                    background: 'transparent',
                    position: 'relative',
                    left: 10,
                }}
                sx={{
                    '--Input-focusedThickness': '0px',
                    '--Input-focusedHighlight': 'transparent',
                }}
                onBlur={e => onChange(+e.target.value)}
            />
        ) : (
            <p style={{fontSize: 18, fontWeight: 600}}>{getStatModifier(value) > 0 && '+'}{getStatModifier(value)}</p>

        )}
    </div>
  )
}