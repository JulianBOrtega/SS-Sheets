import React from 'react'
import { SettingRow } from './SettingRow';
import clearChatIcon from '../../assets/img/clearChat.png'

export interface BaseDeDatosProps {
    clearChat: () => void
}

export const BaseDeDatos = ({clearChat} : BaseDeDatosProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 5
        }}>
            <SettingRow
                label='Chat de Campaña'
                icon={clearChatIcon}
                buttonLabel='Eliminar'
                buttonColor='danger'
                buttonAction={clearChat}
            />

            {/* <div style={{ borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)' }}/> */}
        </div>
    )
}
