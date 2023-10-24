import { createContext, useContext, useState } from "react";

interface IAudioContext {
    audioEnabled: boolean
    audioVolume: string
    playBipSound: () => void
    audioToggle: () => void
    handleAudioVolume: (volume: string) => void
}

const AudioContext = createContext<IAudioContext>({
    audioEnabled: false,
    audioVolume: "0",
    playBipSound: () => {},
    audioToggle: () => { },
    handleAudioVolume: () => { }
});

export function AudioProvider({ children }: { children: React.ReactNode }) {

    const [audioEnabled, setAudioEnabled] = useState(true)
    const [audioVolume, setAudioVolume] = useState("40")

    var beepSound = new Audio("/assets/audio/beep.wav");  

    function audioToggle() {
        setAudioEnabled(prev => !prev)
    }

    function handleAudioVolume(volume: string) {
        setAudioVolume(volume)
        beepSound.volume = parseInt(volume) / 100
        playBipSound()
    }

    function playBipSound() {
        if(beepSound && audioEnabled){
            beepSound.volume = parseInt(audioVolume) / 100
            beepSound.play()
        }
    }

    return <>
        <AudioContext.Provider
            value={{
                audioEnabled,
                audioVolume,
                playBipSound,
                audioToggle,
                handleAudioVolume
            }}>
            {children}
        </AudioContext.Provider>
    </>
}


export const useAudioContext = () => useContext(AudioContext)