import React from 'react'
import { SettingRow } from './SettingRow';
import { ICharacter } from '../../interfaces/character'
import CircularProgress from '@mui/joy/CircularProgress'
import charactersIcon from '../../assets/img/characters-icon.png'
import clearChatIcon from '../../assets/img/clearChat.png'
import { UseBackup } from '../../hooks/UseBackup';
import { IBackupInfo } from '../../interfaces/backupInfo';

export interface BaseDeDatosProps {
    loading: boolean,
    info?: IBackupInfo | null,
    restoreBackup: () => void,
    clearChat: () => void
}

export const BaseDeDatos = ({loading, info, restoreBackup, clearChat} : BaseDeDatosProps) => {
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

            <div style={{ borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)' }}/>

            <SettingRow
                label='Restaurar personajes'
                icon={charactersIcon}
                buttonLabel='Restaurar'
                buttonColor='primary'
                buttonAction={restoreBackup}
                loading={loading}
                disabled={!info}
            />
        </div>
    )
}
