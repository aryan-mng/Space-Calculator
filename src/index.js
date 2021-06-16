import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./App.css";
import { Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const CalculatorContext = React.createContext();

function ContextProvider(props) {
  return (
    <CalculatorContext.Provider value={props.value}>
      {props.children}
    </CalculatorContext.Provider>
  );
}

function Header() {
  return <Heading>Taschenrechner</Heading>;
}

function NumberButton(props) {
  const context = useContext(CalculatorContext);
  return (
    <Button onClick={() => context.setCalculationPart(props.label)}>
      {props.label}
    </Button>
  );
}

function OperatorButton(props) {
  const context = useContext(CalculatorContext);
  return (
    <Button onClick={() => context.setCalculationPart(props.label)}>
      {props.label}
    </Button>
  );
}

function Result(props) {
  const context = useContext(CalculatorContext);

  return (
    <ResultLayout>
      <div>Expression: {context.calculationExpression}</div>
      <div>Result: {context.calculationResult}</div>
    </ResultLayout>
  );
}

function InputArea() {
  const context = useContext(CalculatorContext);

  return (
    <InputAreaLayout>
      <NumberAreaLayout>
        <NumberButton label={7} />
        <NumberButton label={8} />
        <NumberButton label={9} />
        <NumberButton label={4} />
        <NumberButton label={5} />
        <NumberButton label={6} />
        <NumberButton label={1} />
        <NumberButton label={2} />
        <NumberButton label={3} />
        <Button>{"<"}</Button>
        <NumberButton label={0} />
        <NumberButton label={"."} />
      </NumberAreaLayout>
      <OperatorAreaLayout>
        <OperatorButton label={"/"} />
        <OperatorButton label={"*"} />
        <OperatorButton label={"+"} />
        <OperatorButton label={"-"} />
      </OperatorAreaLayout>
      <CalculateAreaLayout>
        <Button
          onClick={() => {
            context.setCalculationResult(
              eval(context.calculationExpression.toString())
            );
          }}
        >
          =
        </Button>
      </CalculateAreaLayout>
    </InputAreaLayout>
  );
}

function ConsoleOutput(parameter1) {
  let variable1 = "456";

  console.log("123" + variable1 + parameter1);
}

function Layout() {
  ConsoleOutput("789");

  const [calculationExpression, setCalculationExpression] = useState("");
  const [calculationResult, setCalculationResult] = useState("");
  const [calculationPart, setCalculationPart] = useState(null);

  useEffect(() => {
    if (calculationPart != null) {
      setCalculationExpression(calculationExpression + calculationPart);
    }
  }, [calculationPart]);

  return (
    <ContextProvider
      value={{
        calculationExpression,
        setCalculationExpression,
        calculationPart,
        setCalculationPart,
        calculationResult,
        setCalculationResult,
      }}
    >
      <ChakraProvider>
        <CalculatorLayout>
          <Header />
          <Result />
          <InputArea />
        </CalculatorLayout>
      </ChakraProvider>
    </ContextProvider>
  );
}

// ------------------- STYLES -------------------

const CalculatorLayout = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const NumberAreaLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const OperatorAreaLayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const CalculateAreaLayout = styled.div`
  display: grid;
  grid-template-columns: auto;
`;

const ResultLayout = styled.div`
  border: 2px solid black;
  border-collapse: collapse;
`;

const InputAreaLayout = styled.div`
  border: 2px solid black;
`;

// const

ReactDOM.render(<Layout />, document.getElementById("root"));
