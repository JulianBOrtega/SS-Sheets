import { useEffect, useState } from "react";

export const UseSFX = (sfx: string) => {
    const [audio] = useState(new Audio(sfx));
    const [playingSFX, setPlayingSFX] = useState(false);
    const togglePlay: () => void = () => setPlayingSFX(!playingSFX);

    useEffect(() => {
        if(playingSFX) audio.play();
        else audio.pause();
    }, [playingSFX]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlayingSFX(false));
        return () => {
        audio.removeEventListener('ended', () => setPlayingSFX(false));
        };
    }, []);

    return {
        playingSFX: playingSFX,
        toggleSFX: togglePlay
    };
};