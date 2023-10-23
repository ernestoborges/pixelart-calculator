import styled from "styled-components"
import { useDisplayContext } from "../../providers/DisplayProvider"
import { useFlashDisplayContext } from "../../providers/FlashDisplayProvider";

export function Display() {

    const { digits, isNegative, isError } = useDisplayContext()
    const { isDisplayOff } = useFlashDisplayContext();

    function handleNumberSpritePosition(digit: string | undefined) {
        let response = 0;
        let digitWidth = 16;

        switch (digit) {
            case "0": response = 1; break;
            case "1": response = 2; break;
            case "2": response = 3; break;
            case "3": response = 4; break;
            case "4": response = 5; break;
            case "5": response = 6; break;
            case "6": response = 7; break;
            case "7": response = 8; break;
            case "8": response = 9; break;
            case "9": response = 10; break;
            case "e": response = 11; break;
            case "R": response = 12; break;
            case "-": response = 13; break;
            default: break;
        }
        return response * digitWidth
    }

    return <>
        <Container>
            <DisplayWrapper
                style={{ zIndex: isDisplayOff ? "-1" : "1" }}
            >
                <Sign
                    negative={isNegative.toString()}
                />
                <Digits>
                    {
                        isError
                            ? <>
                                <Digit style={{ backgroundPosition: `-${handleNumberSpritePosition("e")}px 0` }} />
                                <Digit style={{ backgroundPosition: `-${handleNumberSpritePosition("R")}px 0` }} />
                                <Digit style={{ backgroundPosition: `-${handleNumberSpritePosition("R")}px 0` }} />
                                <Digit style={{ backgroundPosition: `-${handleNumberSpritePosition("0")}px 0` }} />
                                <Digit style={{ backgroundPosition: `-${handleNumberSpritePosition("R")}px 0` }} />
                            </>
                            :
                            digits.split("").map((digit: string, index: number) =>
                                digit !== "." &&
                                <DigitContainer key={index}>
                                    <Digit
                                        style={{
                                            backgroundPosition: `-${handleNumberSpritePosition(digit)}px 0`
                                        }}
                                    />
                                    {digits[index + 1] === "." && <Dot />}
                                </DigitContainer>
                            )
                    }
                </Digits>
            </DisplayWrapper>
        </Container >
    </>
}

const Container = styled.section`
    height: 52px;
    width: 192px;
    background-image: url("/assets/display.png");
    
`

const DisplayWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 4px;
    position: relative;
`

const DigitContainer = styled.div`
    position: relative
`
const Digits = styled.ul`
    display: flex;
    justify-content: flex-end;
    gap: 4px;
`

const Digit = styled.li`
    height: 36px;
    width: 16px;
    background-image: url("/assets/numbers-sprite.png")
`
const Sign = styled.div<{ negative: string }>`
    height: 36px;
    width: 16px;
    background-image: url("/assets/minus-${props => props.negative === "true" ? "show" : "hide"}.png")
`

const Dot = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    width: 20px;
    background-image: url("/assets/num-dot.png")
`
