import styled from "styled-components"
import { useDisplayContext } from "../../providers/DisplayProvider"
import { calcOperation } from "../../utils/calc-operation"
import { numberToDisplayString } from "../../utils/num-to-string"

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

    function handleClick() {

        switch (func) {
            case "c": {
                if (setSlot1 && setSlot2 && setDigits && setOperation && setIsNegative && setIsFloat && setIsError) {
                    setSlot1(null)
                    setSlot2(null)
                    setOperation(null)
                    setIsNegative(false)
                    setIsNegative(false)
                    setIsFloat(false)
                    setDigits("0")
                    setIsError(false)
                }
                break;
            }
            case "ce": {
                if (setDigits && setSlot1 && setSlot2 && setIsFloat && !isError) {
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

                if (setIsNegative && setSlot1 && setSlot2 && !isError) {
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
                if (setDigits && setSlot1 && setSlot2 && setIsNegative && setOperation && setIsFloat && setIsError && !isError) {
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
                if (slot1 !== null && setDigits && setSlot1 && setSlot2 && setIsNegative && setOperation && setIsFloat && setIsError && !isError) {

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
                if (setDigits && setSlot1 && setSlot2 && setIsFloat && !isFloat && !isError) {
                    if (slot1 === null && slot2 === null) {
                        setSlot1(0)
                        setDigits("0.")
                    } else if (slot1 !== null && slot2 === null) {
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