import React, { useRef, useState, useEffect } from 'react';
import noImg from '../../assets/img/no-chara-img.png';
import './CharaHeader.css'
import { ICharacter } from '../../interfaces/character';
import { SheetField } from '../shared/SheetField';
import { ValueBar } from '../shared/ValueBar';
import sword from '../../assets/img/sword-icon.png';
import shield from '../../assets/img/shield-icon.png';
import Button from '@mui/joy/Button';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { getMaxExp, getMaxHp } from '../../utility/sheetCalc';
import { SheetFieldSelector } from '../shared/SheetFieldSelector';
import { getClass, getClassOptions } from '../../utility/hardcoded';

export interface CharaHeaderProps {
  data: ICharacter,
  editable: boolean,
  notifyChange: () => void,
  setEditable: (value: boolean) => void,
  sendStatRoll: (msg: string, roll: string ) => void,
}

export const CharaHeader = ({data, notifyChange, editable, setEditable, sendStatRoll}: CharaHeaderProps) => {
  const handleEdit = () => {
    setEditable(!editable);
  }
  
  const handleBlur = <K extends keyof ICharacter>(
    field: K, newValue: ICharacter[K]
  ) => {
    if(data[field] == newValue) return;

    data[field] = newValue;
    notifyChange();
  }


  const sendDamageRoll = () => {
    if(!data.damageDice || !data.damageDice.includes('d') || data.damageDice[data.damageDice.length - 1] == 'd') return;

    const roll = new DiceRoll(data.damageDice);
    sendStatRoll(`${data.name} causa daño!`, roll.toString());
  }
  return (
    <div className="charaHeader">
      {/* Character Image */}
      <img src={noImg} alt="test" width={120} height={120} />

      <div className="charaHeaderColumn">
        {/* Name */}
        <SheetField
          editable={editable}
          textClass='charaHeaderBigSheetField'
          inputClass='charaHeaderBigSheetFieldEditable'
          onChange={(value) => handleBlur('name', value)}
          placeholder={'Nombre'}
          inputType='text'
        >
          {data.name}
        </SheetField>

        {/* RaceName / ClassName / Level */}
        <div className='charaHeaderSmallFields'>
          <SheetField
            editable={editable}
            textClass={'charaHeaderSmallSheetField'}
            inputClass={'charaHeaderSmallSheetFieldEditable'}
            onChange={(value) => handleBlur('race', value)}
            placeholder={'Raza'}
            inputType='text'
          >
            {data.race}
          </SheetField>
          
          {/* <SheetField
            editable={editable}
            textClass={'charaHeaderSmallSheetField'}
            inputClass={'charaHeaderSmallSheetFieldEditable'}
            onChange={(value) => handleBlur('classId', value)}
            placeholder={'Clase'}
            inputType='text'
          >
            {data.classId}
          </SheetField> */}
          
          <SheetFieldSelector
            defaultValue={data.classId}
            options={getClassOptions()}
            editable={editable}
            textClass={'charaHeaderSmallSheetField'}
            inputClass={'charaHeaderClassFieldEditable'}
            onChange={(value) => handleBlur('classId', value)}
            placeholder={'Clase'}
          >
            {getClass(data.classId)?.name || 'class not found'}
          </SheetFieldSelector>
          
          <p style={{cursor: 'default'}}>Lv. </p>

          <SheetField
            editable={editable}
            textClass={'charaHeaderSmallSheetField'}
            inputClass={'charaHeaderSmallSheetFieldEditable'}
            onChange={(value) => handleBlur('level', +value)}
            placeholder={'Nivel'}
            inputType='number'
          >
            {data.level}
          </SheetField>
        </div>

        {/* Bars & Circles */}
        <div className="charaHeaderColumnBottom">
          {/* Bars */}
          <div className="charaHeaderBars">
            <ValueBar 
              value={data.hp}
              maxValue={getMaxHp(data)}
              suffix='HP'
              barcolor='#730A0A'
              backgroundColor='rgba(125,125,125)'
              onSet={(value) => handleBlur('hp', +value)}
              editable={editable}
            />
            <ValueBar 
              value={data.exp}
              maxValue={getMaxExp(data.level)}
              suffix='EXP'
              barcolor='#78631F'
              backgroundColor='rgba(125,125,125)'
              onSet={(value) => handleBlur('exp', +value)}
              editable={editable}
            />
          </div>

          {/* Circles */}
          <SheetField
            editable={editable}
            onChange={(value) => handleBlur('tempArmor', +value)}
            defaultValue={data.tempArmor.toString()}
            inputClass='charaHeaderShieldSword'
            placeholder='Armadura'
            inputType='number'
          >
            <div className="charaHeaderShieldSwordContainer">
              <img src={shield} 
                alt="shield-armor" 
                width={50}
                height={50}
              />
              <p className="charaHeaderShieldSwordValue">{data.tempArmor}</p>
            </div>
          </SheetField>
          <SheetField
            editable={editable}
            onChange={(value) => handleBlur('damageDice', value)}
            defaultValue={data.damageDice}
            inputClass='charaHeaderShieldSword'
            placeholder='Daño'
            inputType='text'
          >
            <div 
              className="charaHeaderShieldSwordContainer"
              onClick={sendDamageRoll}
            >
              <img src={sword} 
                alt="sword-dmgdice" 
                width={50}
                height={50}
              />
              <p className="charaHeaderShieldSwordValue">{data.damageDice}</p>
            </div>
          </SheetField>
        </div>
      </div>

      {
        editable ? (
          <Button className="charaHeaderSaveButton" 
            onClick={handleEdit} 
            size={'sm'} 
          >
            Guardar
          </Button>
        ) : (
          <p className="charaHeaderEditButton" onClick={handleEdit}>
            Editar
          </p>
        )
      }
      
    </div>
  )
}
