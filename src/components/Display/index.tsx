import styled from "styled-components"
import { useDisplayContext } from "../../providers/DisplayProvider"

export function Display() {

    const { digits, isNegative, isError } = useDisplayContext()

    return <>
        <Container>
            <Sign
                negative={isNegative.toString()}
            />
            <Digits>
                {
                    isError
                        ? <>
                            <Digit digit="E" />
                            <Digit digit="R" />
                            <Digit digit="R" />
                            <Digit digit="0" />
                            <Digit digit="R" />
                        </>
                        :
                        digits.split("").map((digit, index: number) =>
                            digit !== "." &&
                            <DigitContainer key={index}>
                                <Digit
                                    digit={digit}
                                />
                                {digits[index + 1] === "." && <Dot />}
                            </DigitContainer>
                        )
                }
            </Digits>
        </Container>
    </>
}

const Container = styled.section`
    height: 52px;
    width: 192px;
    background-image: url("../src/assets/display.png");
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 4px;
`
const DigitContainer = styled.div`
    position: relative
`
const Digits = styled.ul`
    display: flex;
    justify-content: flex-end;
    gap: 4px;
`

const Digit = styled.li<{ digit: string }>`
    height: 36px;
    width: 16px;
    background-image: url("../src/assets/num-${props => props.digit}.png")
`
const Sign = styled.div<{ negative: string }>`
    height: 36px;
    width: 16px;
    background-image: url("../src/assets/minus-${props => props.negative === "true" ? "show" : "hide"}.png")
`

const Dot = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    width: 20px;
    background-image: url("../src/assets/num-dot.png")
`
