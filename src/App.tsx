
import { useState } from 'react';
import Display from './components/Display';
import CalculatorButton from './components/calculatorbutton';

function App() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const buttons = [
    'AC', 'DEL', '÷', '×',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.',
  ];

  function handleButtonClick(label: string) {

    // Limpar a calculadora
    if (label === 'AC') {
      setDisplay('0');
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
      return;
    }

    // Apagar o último algarismo
    if (label === 'DEL') {
      setDisplay((current) =>
        current.length > 1 ? current.slice(0, -1) : '0'
      );
      return;
    }

    // Selecionar a operação matemática
    if (['+', '-', '×', '÷'].includes(label)) {
      setFirstNumber(Number(display));
      setOperator(label);
      setWaitingForSecondNumber(true);
      return;
    }

    // Calcular o resultado
    if (label === '=') {
      if (firstNumber === null || operator === null) return;

      const secondNumber = Number(display);
      let result: number;

      switch (operator) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        case '×':
          result = firstNumber * secondNumber;
          break;
        case '÷':
          if (secondNumber === 0) {
            setDisplay('Erro');
            setFirstNumber(null);
            setOperator(null);
            return;
          }
          result = firstNumber / secondNumber;
          break;
        default:
          return;
      }

      setDisplay(String(Number(result.toFixed(10))));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(true);
      return;
    }

    // Inserir números decimais
    if (label === '.') {
      if (waitingForSecondNumber) {
        setDisplay('0.');
        setWaitingForSecondNumber(false);
        return;
      }

      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
      return;
    }

    // Inserir números no ecrã
    if (waitingForSecondNumber || display === '0' || display === 'Erro') {
      setDisplay(label);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display + label);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6">

      <h1 className="text-4xl font-bold text-white mb-8">
        Minha Calculadora
      </h1>

      <div className="w-full max-w-sm space-y-4">

        <Display value={display} />

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <CalculatorButton
              key={`${button}-${index}`}
              label={button}
              onClick={() => handleButtonClick(button)}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

export default App;
