import styled from "styled-components"
import { useDisplayContext } from "../../providers/DisplayProvider"
import { calcOperation } from "../../utils/calc-operation"
import { displayLargeNumber, numberToDisplayString } from "../../utils/num-to-string"
import { useFlashDisplayContext } from "../../providers/FlashDisplayProvider"
import { largeNumberCheck } from "../../utils/large-number"

interface IOperation {
    operation: "sum" | "dif" | "prod" | "div" | "sqrt"
}

export function OperationButton({
    operation
}: IOperation) {

    const {
        slot1,
        slot2,
        operation: ctxOperation,
        isError,
        isLargeNumber,
        setOperation,
        setSlot1,
        setSlot2,
        setDigits,
        setIsNegative,
        setIsFloat,
        setIsError,
        setIsLargeNumber
    } = useDisplayContext()
    const { handleDisplayFlash } = useFlashDisplayContext();

    function handleClick() {
        handleDisplayFlash();

        if (!isError && !isLargeNumber) {
            if (slot1 !== null) {
                if (slot2 !== null) {

                    let result = calcOperation(slot1, slot2, ctxOperation)


                    if (isNaN(result) || !isFinite(result)) {
                        setIsError(true)
                        return
                    }

                    if (largeNumberCheck(result)) {
                        let answer = displayLargeNumber(result)
                        setDigits(answer)
                        setIsLargeNumber(true)
                        return
                    }

                    let negative = result < 0
                    let answer = numberToDisplayString(result)

                    setSlot1(Number(answer.join("")) * (negative ? -1 : 1))
                    setSlot2(null)
                    setDigits(answer.join(""))
                    setOperation(null)
                    setIsNegative(negative)
                }

                setOperation(operation)
                setIsFloat(false)
            }
        }
    }

    return <>
        <Button
            operation={operation}
            onMouseDown={() => handleClick()}
        />
    </>
}

const Button = styled.button <IOperation> `
    width: 44px;
    height: 40px;
    border: none;
    background-color: transparent;
    background-image: url("/assets/btn-${(props) => props.operation}.png");
    cursor: pointer;
    &:active {
        background-position: -44px 0;
    }
`
