import Button from '@mui/joy/Button'
import clearChat from '../../assets/img/clearChat.png'

export interface SettingRowProps {
    icon: string,
    label: string,
    buttonLabel: string,
    buttonColor?: 'primary' | 'neutral' | 'danger' | 'warning' | 'success',
    loading?: boolean,
    disabled?: boolean,
    buttonAction?: () => void
}

export const SettingRow = ({icon, label, buttonLabel, buttonColor, buttonAction, loading, disabled}: SettingRowProps) => {
  return (
    <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5
        }}>
            <img src={icon} alt={label} width={20} height={20} />
            <p>{label}</p>
        </div>

        <Button size={'sm'} onClick={buttonAction}
            color={buttonColor ? buttonColor : 'primary'}
            loading={loading}
            disabled={disabled}
        >
            {buttonLabel}
        </Button>
    </div>
  )
}
