import React, { useRef, useState } from 'react'
import noImg from '../../assets/img/no-chara-img.png';
import { ICharacter } from '../../interfaces/character';
import { Button, Modal, ModalClose, ModalDialog, Slider, Typography } from '@mui/joy';
import { UseFileUploader } from '../../hooks/UseFileUploader';
import getCroppedImg from '../../utility/imageCropping';
import getCroppedImgCanvas from '../../utility/imageCropping';
import Cropper from 'react-easy-crop';

export interface ICrop {
    x: number,
    y: number
}

export interface ICroppedAreaPixels {
    x: number, 
    y: number,
    width: number, 
    height: number, 
}

type Props = {
    character: ICharacter,
    saveChanges: () => void
}

export const SheetImage = ({ character, saveChanges }: Props) => {
    const { setFile } = UseFileUploader(true, onCropSuccess);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<ICrop>({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const inputRef = useRef<HTMLInputElement>(null);
    const publicKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_KEY);
    const secretKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_SECRET_KEY);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImgSrc('');
        if(e.target.files && e.target.files.length == 1) {
            setCrop({ x: 0, y: 0 });
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onModalClose = () => {
        setImgSrc(''); 

        if(inputRef.current) {
            inputRef.current.files = null  
            inputRef.current.value = '';
        }
    }

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onAccept = async () => {
        try {
          const canvas = await getCroppedImgCanvas(
            imgSrc,
            croppedAreaPixels,
            rotation
          );

          if(!canvas) {
            console.error('showCroppedImage didnt return any image canvas')
            return;
          }

          canvas.toBlob(blob => {
            if(!blob) {
                console.error('showCroppedImage.toBlob() didnt return any blob');
                return;
            }

            const fileName = `${character.name}-pfp-${character.userId.slice(0, 3)}-${character.userId.slice(-3)}.png`;
            const file = new File([blob], fileName, { type: "image/png" });

            console.log('setting file')
            setFile(file);
            setImgSrc('');

            if(inputRef.current) {
                inputRef.current.files = null  
                inputRef.current.value = '';
            }
          })
        } catch (e) {
          console.error(e);
        }
    }

    function onCropSuccess(fileId: string) {
        const url = character.imgPath;
        const match = url?.match(/ucarecdn\.com\/([a-zA-Z0-9\-]+)/);
        const imgId = match ? match[1] : null;
        if(imgId) {
            //? Deleting previous image if existed
            const deleteUrl = `https://api.uploadcare.com/files/${imgId}/storage/`;
            const deleteHeaders = {
                Accept: 'application/vnd.uploadcare-v0.7+json',
                Authorization: `Uploadcare.Simple ${publicKey.current}:${secretKey.current}`,
            }
    
            fetch(deleteUrl, {
                method: 'DELETE',
                headers: deleteHeaders,
            }).then(res => res.json())
            .then(result => {
                console.log('Removal of previous image done', result);
            }).catch(err => console.log('ERROR at deleting image', err))
        } else if(character.imgPath) {
            console.error("Imgpath doesn't have the correct format to be deleted", character.imgPath);
        }

        //? Saving changes
        character.imgPath = `https://ucarecdn.com/${fileId}/`;
        saveChanges();
    }

    return (
        <div>
            <label htmlFor="charaImg" style={{ cursor: 'pointer' }}>
                {character.imgPath ? (
                    <img src={character.imgPath} alt={'character-img'} width={120} height={120} />
                ) : (
                    <img src={noImg} alt={'character-img'} width={120} height={120} />
                )}
                <input
                    type="file"
                    name="charaImg"
                    id="charaImg"
                    style={{ display: 'none' }}
                    accept=".png, .jpeg, .jpg"
                    onChange={onSelectFile}
                    ref={inputRef}
                />

                <Modal open={!!imgSrc}>
                <ModalDialog style={{
                    height: '90%', width: '90%',
                }}>

                    <ModalClose onClick={onModalClose} style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            borderRadius: 100,
                        }}
                    />
                    <div style={{
                        width: 75,
                        position: 'relative',
                        bottom: 12,
                        padding: 2,
                        borderRadius: 100,
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        zIndex: 10
                    }}>Recortar</div>
                    <div style={{display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', height: '95%'}}>
                        <div style={{

                        }}>
                            <Cropper
                                image={imgSrc}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            position: 'relative',
                            top: 15

                        }}
                        >
                            <Button size={'sm'} color={'primary'} onClick={onAccept}>Aceptar</Button>
                        </div>
                    </div>
                </ModalDialog>
                </Modal>
            </label>
        </div>
    )
}