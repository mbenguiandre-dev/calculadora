
// Define as propriedades que o componente vai receber
type DisplayProps = {
  value: string;
};

    function Display({ value }: DisplayProps) {
  return (
    <div className="w-full rounded-xl bg-slate-800 p-5 text-right">
      {/* Apresenta o valor no ecrã */}
      <span className="text-4xl font-bold text-white">
        {value}
      </span>
    </div>
  );
}
export default Display

 