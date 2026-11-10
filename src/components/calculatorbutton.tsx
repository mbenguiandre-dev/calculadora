// Define as propriedades do botão
type CalculatorButtonProps = {
  label: string;
  onClick: () => void;
};

// Componente responsável pelos botões da calculadora
function CalculatorButton({ label, onClick }: CalculatorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-16 w-16 rounded-xl bg-slate-700 text-2xl font-bold text-white transition hover:bg-slate-600 active:scale-95"
    >
      {label}
    </button>
  );
}

// Exporta o componente
export default CalculatorButton;