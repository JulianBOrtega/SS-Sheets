import { useContext  } from 'react';
import { Link } from "react-router-dom";
import { DataContext, IDataContext } from "../../context/DataContext";
import { AddSheetButton } from "./AddSheetButton";
import Avatar from '@mui/joy/Avatar';
import defaultImg from '../../assets/img/no-chara-img.png'
import chatIcon from '../../assets/img/chat-icon.png'
import settingsIcon from '../../assets/img/settings-icon.png'
import logsIcon from '../../assets/img/logs-icon.png'
import './Navbar.css';


export const Navbar = () => {
  const { dataManagement } = useContext<IDataContext>(DataContext);

  return (
    <nav className="navContainer">
      <div className="navList">
        <Link className="navLink" to="/">
          <img src={chatIcon} alt="chat-icon" 
            className='navbarChatIcon'
            width={32} height={32} 
          />
        </Link>
        
        {/* Visible Characters */}
        {
          dataManagement?.characters?.map((c, i) => 
            <Link to={"/sheets/" + c.id}
              className="navLink" 
              key={'chara'+ i}
              style={{
                display: c.userId != dataManagement.user?.id && dataManagement.user?.role != 'GM' ? 'none' : undefined
              }}
            > 
              <Avatar 
                src={c.imgPath ? c.imgPath : defaultImg} 
                alt='character-img' 
                className='navbarAvatar'
              />
            </Link>
          )
        }
        <AddSheetButton></AddSheetButton>
      </div>

      <div className="navList">
        <Link className="navLink" to="/Settings">
          <img src={settingsIcon} alt="settings-icon" 
            className='navbarSettingsIcon'
            width={25} height={25} 
          />
        </Link>
        <Link className="navLink" to="/Logs">
          <img src={logsIcon} alt="logs-icon" 
            className='navbarLogsIcon'
            width={25} height={25} 
          />
        </Link>
      </div>
    </nav>
  )
}
