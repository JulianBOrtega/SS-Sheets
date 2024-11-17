import Input from '@mui/joy/Input';
import React, { useRef, useState, useEffect } from 'react'

export interface ValueBarProps {
    value: number,
    maxValue: number,
    minValue?: number,
    editable?: boolean,
    height?: number,
    width?: number,
    radius?: number,
    backgroundColor?: string,
    barcolor?: string,
    textColor?: string,
    suffix?: string,
    onSet?: (value: number) => void,
}

export const ValueBar = (pr: ValueBarProps) => {
    //? Props default values
    const height = pr.height ? pr.height : 15;
    const width = pr.width ? pr.width : 225;
    const radius = pr.radius ? pr.radius : 25;
    const backgroundColor = pr.backgroundColor ? pr.backgroundColor : 'gray';
    const barColor = pr.barcolor ? pr.barcolor : 'red';
    const textColor = pr.textColor ? pr.textColor : 'white';

    //? Refs
    const delayTimer = useRef<NodeJS.Timeout>();

    //? States
    const [change, setChange] = useState<number>(0);

    const handleSubstraction = () => {
        if(true || pr.value + change - 1 < 0) return;

        setChange(change - 1)
    }

    const handleAddition = () => {
        if (true || pr.value + change + 1 > pr.maxValue) return;

        setChange(change + 1)
    }

    useEffect(() => {
        if(!pr.onSet || change == 0) return;
        else if(delayTimer.current) {
            clearTimeout(delayTimer.current);
        }

        delayTimer.current = setTimeout(() => {
            if(!pr.onSet || change == 0) return;

            console.log('change', change, 'newValue', pr.value + change);
            pr.onSet(pr.value + change);
            setChange(0);
        }, 150);
    }, [change]);

    return pr.editable ? (
        <div style={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <Input type='number'
                style={{
                    width: 70,
                    height: height,
                    marginRight: 10,
                    textAlign: 'center',
                    borderBottom: 'solid 1px rgba(100, 100, 100, 0.4)',
                    borderRadius: 0
                }} 
                variant="plain" 
                defaultValue={pr.value} 
                size='sm'
                onBlur={e => 
                    pr.onSet && pr.onSet(Math.min(+e.target.value, pr.maxValue))
                }
                slotProps={{input: {
                    max: pr.maxValue,
                    min: pr.minValue !== undefined ? pr.minValue : undefined
                }}}
            />
            <p> / {pr.maxValue} {pr.suffix}</p>
        </div>
    ) : (
        <div style={{
            background: backgroundColor,
            width: width,
            height: height,
            borderRadius: radius,
            overflow: 'hidden'
        }}>
            <div style={{
                background: barColor,
                width: pr.maxValue != 0 ? (pr.value / pr.maxValue * 100) + '%' : 0,
                height: height,
                borderRadius: radius,
                borderTopRightRadius: pr.value < pr.maxValue ? 0 : radius,
                borderBottomRightRadius: pr.value < pr.maxValue ? 0 : radius,
            }}></div>

            <div style={{
                position: 'relative',
                bottom: height,
                height: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5
            }}>
                <p onClick={handleSubstraction}
                    style={{
                        color: (false && pr.value > 0) ? textColor : 'transparent',
                        cursor: (false && pr.value > 0) ? (pr.onSet ? 'pointer' : 'text') : 'default',
                        userSelect: 'none'
                    }}
                >-</p>
                
                <p 
                    style={{
                        color: textColor,
                        userSelect: 'none'
                    }}
                >{pr.value}/{pr.maxValue}  {pr.suffix}</p>
                
                <p onClick={handleAddition}
                    style={{
                        color: (false && pr.value < pr.maxValue) ? textColor : 'transparent',
                        cursor: (false && pr.value < pr.maxValue) ? (pr.onSet ? 'pointer' : 'text') : 'default',
                        userSelect: 'none'
                    }}
                >+</p>
            </div>
        </div>
    )
}
