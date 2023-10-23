import { createContext, useContext, useState } from "react";

interface IDisplayContext {
    operation: string | null
    slot1: number | null
    slot2: number | null
    digits: string
    isNegative: boolean
    isFloat: boolean
    isError: boolean
    isLargeNumber: boolean
    setSlot1: React.Dispatch<React.SetStateAction<number | null>>;
    setSlot2: React.Dispatch<React.SetStateAction<number | null>>;
    setDigits: React.Dispatch<React.SetStateAction<string>>;
    setOperation: React.Dispatch<React.SetStateAction<string | null>>;
    setIsNegative: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFloat: React.Dispatch<React.SetStateAction<boolean>>;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLargeNumber: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayContext = createContext<IDisplayContext>({
    operation: null,
    slot1: null,
    slot2: null,
    digits: "0",
    isNegative: false,
    isFloat: false,
    isError: false,
    isLargeNumber: false,
    setSlot1: () => null,
    setSlot2: () => null,
    setDigits: () => "0",
    setOperation: () => null,
    setIsNegative: () => false,
    setIsFloat: () => false,
    setIsError: () => false,
    setIsLargeNumber: () => false
});

export function DisplayProvider({ children }: { children: React.ReactNode }) {

    const [operation, setOperation] = useState<string | null>(null)
    const [slot1, setSlot1] = useState<number | null>(null)
    const [slot2, setSlot2] = useState<number | null>(null)
    const [digits, setDigits] = useState<string>("0")
    const [isNegative, setIsNegative] = useState<boolean>(false)
    const [isFloat, setIsFloat] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isLargeNumber, setIsLargeNumber] = useState<boolean>(false)



    return <>
        <DisplayContext.Provider
            value={{
                slot1,
                setSlot1,
                slot2,
                setSlot2,
                operation,
                setOperation,
                digits,
                setDigits,
                isNegative,
                setIsNegative,
                isFloat,
                setIsFloat,
                isError,
                setIsError,
                isLargeNumber,
                setIsLargeNumber
            }}>
            {children}
        </DisplayContext.Provider>
    </>
}


export const useDisplayContext = () => useContext(DisplayContext)