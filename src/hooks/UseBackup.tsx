import React, { useContext, useEffect, useRef, useState } from 'react'
import { UseFileUploader } from './UseFileUploader';
import { IBackupInfo } from '../interfaces/backupInfo';
import { deleteFile, UploadcareSimpleAuthSchema } from '@uploadcare/rest-client';
import { formatDate } from '../utility/stringUtilities';
import { timeStamp } from 'console';
import {DataContext, IDataContext} from '../context/DataContext';

type backupType = 'characters';

export const UseBackup = (type: backupType, campaignId?: string, backupData?: any) => {
    const { broadcast } = useContext<IDataContext>(DataContext);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<undefined | null | IBackupInfo>();
    const url = useRef<string>(import.meta.env.VITE_API_URL);
    const publicKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_KEY);
    const secretKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_SECRET_KEY);

    useEffect(() => {
        if(!campaignId) return;
        else if (!publicKey.current || !secretKey.current) {
            console.error('No public or secret key set for uploading files');
            return;
        }
        
        const fetchOps = {
            method: 'GET'
        };

        fetch(`${url.current}backup/${type}/${campaignId}`, fetchOps)
        .then(res => {console.log('received backup res', res); return res.json()}).then(data => {console.log('backup data', data); setInfo(data[0])})
        .catch(err => console.log('ERROR at fetching backupData for ' + type, err));
        setLoading(false);
    }, [campaignId]);
    

    const onUpload = async (fileId: string) => {
        setLoading(true);

        try { //! Bad practice - This should be done from the backend
            if(info && info.id) {
                const deleteUrl = `https://api.uploadcare.com/files/${info.id}/storage/`;
                const deleteHeaders = {
                    Accept: 'application/vnd.uploadcare-v0.7+json',
                    Authorization: `Uploadcare.Simple ${publicKey.current}:${secretKey.current}`,
                }

                const res = await fetch(deleteUrl, {
                    method: 'DELETE',
                    headers: deleteHeaders,
                });

                if(!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const result = await res.json();
                console.log('Removal of previous backup done', result);
            }
            
            const date = formatDate(new Date());
            const backupInfo = {
                id: fileId,
                timestamp: date
            };

            const fetchOps = {
                method: 'POST', body: JSON.stringify(backupInfo),
                headers: {
                    'Content-type': 'application/json'
                }
            };
    
            const res = await fetch(`${url.current}backup/${type}/${campaignId}`, fetchOps);
            const data = await res.json();
            console.log('Backup upload done', data);

            setInfo(data);
            setLoading(false);
        } catch (error) {
            console.log('ERROR at setting backupInfo for ' + type, error)
        }
    }

    const { handleFileChange, setFile } = UseFileUploader(true, onUpload);
    
    const onBackupFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;
        handleFileChange(event);
    }

    const triggerBackup = async () => {
        if(loading) return;
        else if (!backupData) {
            console.error('No backup data set for UseBackup');
            return;
        }

        const fileName = `${type}-${campaignId?.slice(0, 4)}-${campaignId?.slice(-4)}.json`;
        const json = JSON.stringify(backupData);
        const blob = new Blob([json], { type: "application/json" });
        const file = new File([blob], fileName, { type: "application/json"});
        
        setFile(file);
    }

    const restoreBackup = async() => {
        if(!campaignId || loading) return;
        else if (!info || !info.id) {
            console.error('No backup available');
            return;
        }

        setLoading(true);
                
        try {
            const backupOps = { method: 'GET' };
            const backupRes = await fetch(
                `https://ucarecdn.com/${info.id}/`, backupOps
            );
            const backup = await backupRes.json();

            console.log('backup downloaded', backup);

            const updateOps = { 
                method: 'POST',
                body: JSON.stringify(backup),
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const updateRes = await fetch(
                `${url.current}backup/characters/${campaignId}/restore`, updateOps
            );
            const updateState = await updateRes.json();

            console.log('Data restoration done', updateState);
            broadcast.update(type)

        } catch (error) {
            console.log('ERROR at downloading and restoring backup for', type, 'from cloud', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        info,
        handleFileChange: onBackupFileChange,
        triggerBackup,
        restoreBackup
    }
}

// https://ucarecdn.com/fb99e582-a8fc-43bf-a6cd-f4f0003cf562
// https://ucarecdn.com/fb99e582-a8fc-43bf-a6cd-f4f0003cf562/