import Divider from '@mui/joy/Divider'
import React from 'react'
import { ICharacter, IStats } from '../../interfaces/character'
import './Stats.css'
import { BigSheetDice } from '../shared/BigSheetDice'

export interface StatsProps {
  data: ICharacter,
  editable: boolean,
  notifyChange: () => void
}

export const Stats = ({data, editable, notifyChange}: StatsProps) => {
  const handleBlur = <K extends keyof IStats>(
    stat: K, newValue: IStats[K]
  ) => {
    if(data.stats[stat] == newValue) return;

    data.stats[stat] = newValue;
    notifyChange();
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
        />
        <BigSheetDice 
          editable={editable}
          label='Destreza'
          value={data.stats.dex}
          onChange={(value) => handleBlur('dex', value)}
        />
        <BigSheetDice 
          editable={editable}
          label='Constitución'
          value={data.stats.con}
          onChange={(value) => handleBlur('con', value)}
        />
        <BigSheetDice 
          editable={editable}
          label='Inteligencia'
          value={data.stats.int}
          onChange={(value) => handleBlur('int', value)}
        />
        <BigSheetDice 
          editable={editable}
          label='Sabiduría'
          value={data.stats.wis}
          onChange={(value) => handleBlur('wis', value)}
        />
        <BigSheetDice 
          editable={editable}
          label='Carisma'
          value={data.stats.cha}
          onChange={(value) => handleBlur('cha', value)}
        />
      </div>
    </div>
  )
}
