import Divider from '@mui/joy/Divider'
import React from 'react'
import { ICharacter, IStats } from '../../interfaces/character'
import { BigSheetDice } from '../shared/BigSheetDice'
import './Stats.css'
import { getSuccessLevel, SuccessLevel } from '../../utility/dice'
import { DiceRoll } from '@dice-roller/rpg-dice-roller'

export interface StatsProps {
  data: ICharacter,
  editable: boolean,
  notifyChange: () => void,
  sendStatRoll: (msg: string, roll: string, successLevel: SuccessLevel) => void
}

export const Stats = ({data, editable, notifyChange, sendStatRoll}: StatsProps) => {
  const handleBlur = <K extends keyof IStats>(
    stat: K, newValue: IStats[K]
  ) => {
    if(data.stats[stat] == newValue) return;

    data.stats[stat] = newValue;
    notifyChange();
  }

  const handleRoll = (roll: DiceRoll, stat: string) => {
    const msg = `Usa ${stat}`;
    const successLevel = getSuccessLevel(roll);

    sendStatRoll(msg, roll.output, successLevel)
  }

  return (
    <div>
      <hr className="fichaDivider"/>

      <div className='statsDices'>
        <BigSheetDice 
          editable={editable}
          label='Fuerza'
          value={data.stats.str}
          onChange={(value) => handleBlur('str', value)}
          sendRoll={roll => handleRoll(roll, 'Fuerza')}
        />
        <BigSheetDice 
          editable={editable}
          label='Destreza'
          value={data.stats.dex}
          onChange={(value) => handleBlur('dex', value)}
          sendRoll={roll => handleRoll(roll, 'Destreza')}
        />
        <BigSheetDice 
          editable={editable}
          label='Constitución'
          value={data.stats.con}
          onChange={(value) => handleBlur('con', value)}
          sendRoll={roll => handleRoll(roll, 'Constitución')}
        />
        <BigSheetDice 
          editable={editable}
          label='Inteligencia'
          value={data.stats.int}
          onChange={(value) => handleBlur('int', value)}
          sendRoll={roll => handleRoll(roll, 'Inteligencia')}
        />
        <BigSheetDice 
          editable={editable}
          label='Sabiduría'
          value={data.stats.wis}
          onChange={(value) => handleBlur('wis', value)}
          sendRoll={roll => handleRoll(roll, 'Sabiduría')}
        />
        <BigSheetDice 
          editable={editable}
          label='Carisma'
          value={data.stats.cha}
          onChange={(value) => handleBlur('cha', value)}
          sendRoll={roll => handleRoll(roll, 'Carisma')}
        />
      </div>
    </div>
  )
}
