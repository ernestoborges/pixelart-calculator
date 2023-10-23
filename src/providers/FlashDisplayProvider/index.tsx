import { createContext, useContext, useState } from "react";
import { useAudioContext } from "../AudioProvider";

interface IFlashDisplayContext {
    isDisplayOff: boolean,
    timeoutId: number | null,
    setIsDisplayOff: React.Dispatch<React.SetStateAction<boolean>>
    setTimeoutId: React.Dispatch<React.SetStateAction<number | null>>
    handleDisplayFlash: () => void
}

const FlashDisplayContext = createContext<IFlashDisplayContext>({
    isDisplayOff: false,
    timeoutId: null,
    setIsDisplayOff: () => false,
    setTimeoutId: () => null,
    handleDisplayFlash: () => { }
});

export function FlashDisplayProvider({ children }: { children: React.ReactNode }) {

    const [isDisplayOff, setIsDisplayOff] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const { playBipSound } = useAudioContext()

    function handleDisplayFlash() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setIsDisplayOff(true);
        playBipSound()

        const newTimeoutId = setTimeout(() => {
            setIsDisplayOff(false);
        }, 100);

        setTimeoutId(newTimeoutId);
    }


    return <>
        <FlashDisplayContext.Provider
            value={{
                isDisplayOff,
                setIsDisplayOff,
                timeoutId,
                setTimeoutId,
                handleDisplayFlash
            }}>
            {children}
        </FlashDisplayContext.Provider>
    </>
}


export const useFlashDisplayContext = () => useContext(FlashDisplayContext)