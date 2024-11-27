import React, { useRef, useState } from 'react'
import noImg from '../../assets/img/no-chara-img.png';
import { ICharacter } from '../../interfaces/character';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button, Modal, ModalClose, ModalDialog, Slider, Typography } from '@mui/joy';
import { UseFileUploader } from '../../hooks/UseFileUploader';



type Props = {
    character: ICharacter,
    saveChanges: () => void
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
}

export const CharacterImage = ({ character, saveChanges }: Props) => {
    const [imgSrc, setImgSrc] = useState('')
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState<number>();
    const { setFile } = UseFileUploader(true, onCropSuccess);
    const imgRef = useRef<HTMLImageElement>(null);
    const publicKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_KEY);
    const secretKey = useRef<string>(import.meta.env.VITE_UPLOADCARE_SECRET_KEY);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length == 1) {
            setCrop(undefined);
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        const { width, height } = img;
    
        const size = Math.min(width, height); 
        const x = (width - size) / 2; 
        const y = (height - size) / 2; 
    
        setCrop({
            unit: 'px', 
            width: size,
            height: size,
            x,
            y,
        });
    };    

    const onAccept = () => {
        if (!completedCrop || !imgRef.current) {
            console.error("Crop data or image reference is missing!");
            return;
        }
    
        const canvas = document.createElement("canvas");
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
        const cropWidth = completedCrop.width;
        const cropHeight = completedCrop.height;
    
        canvas.width = cropWidth;
        canvas.height = cropHeight;
    
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get 2D context from canvas!");
            return;
        }
        ctx.drawImage(
            imgRef.current,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            cropWidth * scaleX,
            cropHeight * scaleY,
            0,
            0,
            cropWidth,
            cropHeight
        );

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error("Canvas is empty or failed to create a Blob");
                    return;
                }
    
                const fileName = `${character.name}-pfp-${character.userId.slice(0, 3)}-${character.userId.slice(-3)}.png`;
                const file = new File([blob], fileName, { type: "image/png" });
    
                console.log('setting file')
                setFile(file);
                setImgSrc('');
            },
            "image/png", 1
        );
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
                />

                <Modal open={!!imgSrc}>
                <ModalDialog>
                    <ModalClose onClick={() => setImgSrc('')} />
                    <Typography>Recortar</Typography>
                    <ReactCrop
                        crop={crop}
                        onChange={(c, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={1}
                        minHeight={0}
                        maxHeight={200}
                        style={{
                            height: 250, /* maxHeight: 250, */
                            width: 250, /* maxWidth: 250, */
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            onLoad={onImageLoad}
                            style={{ transform: `scale(${scale}) rotate(${0}deg)` }}
                        />
                    </ReactCrop>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Slider 
                            value={scale} 
                            max={2} 
                            min={0}
                            step={0.01}
                            onChange={(e, value) => typeof value == 'number' && setScale(value)} 
                            style={{width: 100}}
                        />
                        <Button size={'sm'} color={'primary'} onClick={onAccept}>Aceptar</Button>
                    </div>
                </ModalDialog>
                </Modal>
            </label>
        </div>
    )
}