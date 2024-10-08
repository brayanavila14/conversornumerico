import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const sistemas = ["Decimal", "Binario", "Octal", "Hexadecimal"];

const sistemasInfo = {
  Decimal: "Base 10, usa dígitos 0-9",
  Binario: "Base 2, usa dígitos 0-1",
  Octal: "Base 8, usa dígitos 0-7",
  Hexadecimal: "Base 16, usa dígitos 0-9 y A-F"
};

function validarValor(valor, sistema) {
  switch (sistema) {
    case "Decimal":
      return /^\d+$/.test(valor);
    case "Binario":
      return /^[01]+$/.test(valor);
    case "Octal":
      return /^[0-7]+$/.test(valor);
    case "Hexadecimal":
      return /^0x[0-9a-fA-F]+$/.test(valor) || /^[0-9a-fA-F]+$/.test(valor);
    default:
      return true;
  }
}

function convertirNumero(valor, desde, hasta) {
  let decimal;

  // Convertir a decimal
  switch (desde) {
    case "Decimal":
      decimal = parseInt(valor, 10);
      break;
    case "Binario":
      decimal = parseInt(valor, 2);
      break;
    case "Octal":
      decimal = parseInt(valor, 8);
      break;
    case "Hexadecimal":
      decimal = parseInt(valor.replace(/^0x/, ""), 16);
      break;
    default:
      return "Error";
  }

  // Convertir de decimal al sistema destino
  switch (hasta) {
    case "Decimal":
      return decimal.toString(10);
    case "Binario":
      return decimal.toString(2);
    case "Octal":
      return decimal.toString(8);
    case "Hexadecimal":
      return "0x" + decimal.toString(16).toUpperCase();
    default:
      return "Error";
  }
}

export default function App() {
  const [valor, setValor] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [resultado, setResultado] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (valor && desde) {
      if (!validarValor(valor, desde)) {
        setError("Número inválido para el sistema seleccionado");
        setResultado("");
      } else {
        setError(null);
        if (hasta) {
          const nuevoResultado = convertirNumero(valor, desde, hasta);
          setResultado(nuevoResultado);
        }
      }
    } else {
      setResultado("");
      setError(null);
    }
  }, [valor, desde, hasta]);

  const handleValorChange = (e) => {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);
    if (desde && !validarValor(nuevoValor, desde)) {
      setError("Número inválido para el sistema seleccionado");
    } else {
      setError(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Conversor de Sistemas Numéricos
      </h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input
            id="valor"
            type="text"
            placeholder={desde ? `Ingresa un número ${desde.toLowerCase()}` : "Ingresa un número"}
            value={valor}
            onChange={handleValorChange}
            className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="desde" className="block text-sm font-medium text-gray-700">
              Desde
            </label>
            <select
              id="desde"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Origen
              </option>
              {sistemas.map((sistema) => (
                <option key={sistema} value={sistema}>
                  {sistema}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500">{sistemasInfo[desde] || "Selecciona un sistema"}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="hasta" className="block text-sm font-medium text-gray-700">
              Hasta
            </label>
            <select
              id="hasta"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Destino
              </option>
              {sistemas.map((sistema) => (
                <option key={sistema} value={sistema}>
                  {sistema}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500">{sistemasInfo[hasta] || "Selecciona un sistema"}</p>
          </div>
        </div>
        {!error && resultado && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Resultado:</span>
              <div className="flex items-center">
                <AiOutlineArrowRight className="w-4 h-4 mr-2 text-gray-600" />
                <span className="font-mono">{resultado}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
