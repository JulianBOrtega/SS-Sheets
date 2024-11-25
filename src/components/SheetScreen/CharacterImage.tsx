import React, { useRef, useState } from 'react'
import noImg from '../../assets/img/no-chara-img.png';
import { ICharacter } from '../../interfaces/character';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button, Modal, ModalClose, ModalDialog, Slider, Typography } from '@mui/joy';
import { UseFileUploader } from '../../hooks/UseFileUploader';



type Props = {
    character: ICharacter
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

export const CharacterImage = ({ character }: Props) => {
    const [imgSrc, setImgSrc] = useState('')
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState<number>();
    const imgRef = useRef<HTMLImageElement>(null);
    const { setFile } = UseFileUploader();

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
        /* const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, 1)) */
    }

    const onAccept = () => {
        /* setFile() */
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
                    {/* <ModalClose /> */}
                    <Typography>Recortar</Typography>
                    <ReactCrop
                        crop={crop}
                        onChange={(c, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={undefined}
                        minHeight={0}
                        maxHeight={200}

                        style={{
                            height: 250, /* maxHeight: 250, */
                            width: 250, /* maxWidth: 250, */
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${scale}) rotate(${0}deg)` }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Slider 
                            value={scale} 
                            max={1} 
                            min={0}
                            step={0.01}
                            onChange={(e, value) => typeof value == 'number' && setScale(value)} 
                            style={{width: 100}}
                        />
                        <Button size={'sm'} color={'primary'}>Aceptar</Button>
                    </div>
                </ModalDialog>
                </Modal>
            </label>
        </div>
    )
}