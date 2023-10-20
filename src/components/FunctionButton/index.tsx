import styled from "styled-components"
import { useDisplayContext } from "../../providers/DisplayProvider"
import { calcOperation } from "../../utils/calc-operation"
import { numberToDisplayString } from "../../utils/num-to-string"
import { useFlashDisplayContext } from "../../providers/FlashDisplayProvider"

interface IFunction {
    func: "c" | "ce" | "sign" | "equal" | "dot" | "sqrt"
}

export function FunctionButton({
    func
}: IFunction) {

    const {
        slot1,
        slot2,
        setSlot1,
        setSlot2,
        setDigits,
        setIsNegative,
        operation,
        setOperation,
        isFloat,
        setIsFloat,
        isError,
        setIsError
    } = useDisplayContext()
    const { handleDisplayFlash } = useFlashDisplayContext();

    function handleClick() {
        handleDisplayFlash();
        switch (func) {
            case "c": {
                setSlot1(null)
                setSlot2(null)
                setOperation(null)
                setIsNegative(false)
                setIsFloat(false)
                setDigits("0")
                setIsError(false)
                break;
            }
            case "ce": {
                if (!isError) {
                    if (slot2 === null) {
                        setSlot1(null)
                    } else {
                        setSlot2(null)
                    }
                    setDigits("0")
                    setIsFloat(false)
                }
                break;
            }
            case "sign": {

                if (!isError) {
                    setIsNegative(prev => !prev)

                    if (slot1 !== null) {
                        if (operation === null) {
                            setSlot1(slot1 * -1)
                        } else if (slot2 !== null) {
                            setSlot2(slot2 * -1)
                        }
                    }
                }

                break;
            }
            case "equal": {
                if (!isError) {
                    if (slot1 !== null && slot2 !== null && operation !== null) {

                        let result = calcOperation(slot1, slot2, operation)
                        if (isNaN(result)) {
                            setIsError(true)
                            break
                        }
                        let negative = result < 0

                        let answer = numberToDisplayString(result)

                        setSlot1(Number(answer.join("")) * (negative ? -1 : 1))
                        setSlot2(null)
                        setDigits(answer.join(""))
                        setIsNegative(negative)
                        setOperation(null)
                        setIsFloat(false)
                    }
                }
                break
            }
            case "sqrt": {
                if (slot1 !== null && !isError) {

                    let result
                    let sqrt
                    let negative
                    let answer

                    if (slot2 !== null) {
                        result = calcOperation(slot1, slot2, operation)
                        if (isNaN(result)) {
                            setIsError(true)
                            break
                        }
                    } else {
                        result = slot1
                    }

                    sqrt = Math.sqrt(result)
                    if (isNaN(sqrt)) {
                        setIsError(true)
                        break
                    }
                    negative = sqrt < 0
                    answer = numberToDisplayString(sqrt)
                    setSlot1(Number(answer.join("")) * (negative ? -1 : 1))
                    setSlot2(null)
                    setDigits(answer.join(""))
                    setIsNegative(negative)
                    setOperation(null)
                    setIsFloat(false)
                }
                break
            }
            case "dot": {
                if (!isFloat && !isError) {
                    if (slot1 === null && slot2 === null) {
                        setSlot1(0)
                        setDigits("0.")
                    } else if (slot1 !== null && operation !== null && slot2 === null) {
                        setSlot2(0)
                        setDigits("0.")
                    } else {
                        setDigits(prev => prev + ".")
                    }
                    setIsFloat(true)
                }
            }
        }
    }

    return <>
        <Button
            func={func}
            onClick={() => handleClick()}
        />
    </>
}

const Button = styled.button <IFunction> `
    width: 44px;
    height: 40px;
    border: none;
    background-color: transparent;
    background-image: url("/assets/btn-${(props) => props.func}.png");
    cursor: pointer;
    &:active {
        background-image: url("/assets/btn-${(props) => props.func}-click.png");     
    }
`