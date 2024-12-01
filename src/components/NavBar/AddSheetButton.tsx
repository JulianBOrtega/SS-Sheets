import { useContext, useRef } from "react";
import { DataContext, IDataContext } from "../../context/DataContext";
import { getDefaultCharacter } from "../../utility/objTemplates";
import Button from "@mui/joy/Button";
import add1Icon from '../../assets/img/add1-icon.png'
import add2Icon from '../../assets/img/add2-icon.png'
import './AddSheetButton.css';
import { useNavigate } from "react-router-dom";

export const AddSheetButton = () => {
    const { loading, dataManagement, broadcast } = useContext<IDataContext>(DataContext);
    const url = useRef<string>(import.meta.env.VITE_API_URL);
    const nav = useNavigate();
    
    const addSheet = () => {
        if(loading || !dataManagement || !dataManagement.user) return;

        const campaign = dataManagement.roomId;
        const userId = dataManagement.user.id;
        const character = getDefaultCharacter(userId);
        const fetchOps = {
            method: 'POST', body: JSON.stringify(character),
            headers: {
                'Content-type': 'application/json'
            }
        };
        
        fetch(`${url.current}characters/${campaign}`, fetchOps)
        .then(res => res.json()).then(data => {
            broadcast.update('characters');
            nav(`Sheets/${data.id}`);
        })
        .catch(err => console.log('ERROR at adding new sheet', err));
    }

    return (
        <img src={add2Icon} alt="add-icon" 
            className='addSheetButtonIcon'
            width={30} height={30} 
            onClick={addSheet}
        />
    )
}
