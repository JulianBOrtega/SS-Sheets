import React from 'react'
import { getStatModifier } from '../../utility/sheetCalc'
import Input from '@mui/joy/Input'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import './BigSheetDice.css'
export interface BigSheetDiceProps {
    editable: boolean,
    value: number,
    label: string,
    onChange: (value: number) => void,
    sendRoll: (roll: DiceRoll) => void
}

export const BigSheetDice = ({ editable, value, label, onChange, sendRoll }: BigSheetDiceProps) => {

    const rollStat = () => {
        const dice = '2d10+' + getStatModifier(value);
        sendRoll(new DiceRoll(dice));
    }

    return (
        <div className="bigDice" onClick={() => !editable && rollStat()} 
            style={{
                width: 75,
                height: 75,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                background: 'rgba(35, 35, 35, 1)',
                borderRadius: 8,
                cursor: editable ? undefined : 'pointer'
            }}
        >
            {editable ? (
                <p style={{ fontSize: 10, fontWeight: 600 }}>{label}</p>
            ) : (
                <p style={{ fontSize: 18, fontWeight: 600, textTransform: 'uppercase' }}>{label.slice(0, 3)}</p>
            )}

            {editable ? (
                <Input
                    type={'number'}
                    variant="plain"
                    defaultValue={value}
                    style={{
                        fontSize: 16,
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
                    slotProps={{ input: {
                        min: 3,
                        max: 22
                    }}}
                />
            ) : (
                <p style={{ fontSize: 18, fontWeight: 600 }}>{getStatModifier(value) > 0 && '+'}{getStatModifier(value)}</p>

            )}
        </div>
    )
}
