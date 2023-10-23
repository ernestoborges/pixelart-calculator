import styled from "styled-components"
import { NumberButton } from "./components/NumberButton"
import { OperationButton } from "./components/OperatorButton"
import { FunctionButton } from "./components/FunctionButton"
import { Display } from "./components/Display"
import { Header } from "./components/Header"

export default function App() {

  return (
    <>

      <Header />
      <Main>
        <CalculatorWrapper>
          <Calculator>
            <Display />
            <Buttons>
              <FunctionButton func="c" />
              <FunctionButton func="ce" />
              <FunctionButton func="sign" />
              <FunctionButton func="sqrt" />
              <NumberButton number="7" />
              <NumberButton number="8" />
              <NumberButton number="9" />
              <OperationButton operation="div" />
              <NumberButton number="4" />
              <NumberButton number="5" />
              <NumberButton number="6" />
              <OperationButton operation="prod" />
              <NumberButton number="1" />
              <NumberButton number="2" />
              <NumberButton number="3" />
              <OperationButton operation="dif" />
              <NumberButton number="0" />
              <FunctionButton func="dot" />
              <OperationButton operation="sum" />
              <FunctionButton func="equal" />
            </Buttons>
          </Calculator>
        </CalculatorWrapper>
      </Main>
    </>
  )
}


const Main = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
`

const CalculatorWrapper = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 4px 7px;
  border-radius: 20px;
`
const Calculator = styled.section`
  width: 248px;
  height: 328px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  background-image: url(/assets/body.png);
  
`

const Buttons = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  column-gap: 8px;
  row-gap: 4px;
`