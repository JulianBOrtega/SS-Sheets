import React from 'react'
import { SettingRow } from './SettingRow';
import { UseBackup } from '../../hooks/UseBackup'
import CircularProgress from '@mui/joy/CircularProgress'
import { ICharacter } from '../../interfaces/character'
import charactersIcon from '../../assets/img/characters-icon.png'
import { IBackupInfo } from '../../interfaces/backupInfo';

export interface BackupProps {
  loading: boolean,
  info?: IBackupInfo | null,
  triggerBackup: () => Promise<void>
}

export const Backup = ({loading, triggerBackup, info}: BackupProps) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 5
  }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <SettingRow
          buttonLabel='Respaldar'
          label='Respaldar personajes'
          buttonAction={triggerBackup}
          buttonColor='primary'
          icon={charactersIcon}
          loading={loading}
        />
        { info &&
          <p style={{ color: 'gray', fontSize: 12}}>
              Último backup: {info.timestamp}
          </p>
        }
      </div>

      {/* <div style={{ borderBottom: 'solid 1px rgba(100, 100, 100, 0.3)' }}/> */}
  </div>
  )
}
