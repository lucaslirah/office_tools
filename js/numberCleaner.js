import { copiarTexto } from './utils.js';

/**
 * Inicializa o módulo Limpador de Números, configurando seletores e adicionando event listeners.
 */
export function initNumberCleaner() {
  const inputNumero = document.getElementById("inputNumero");
  const outputNumero = document.getElementById("outputNumero");
  const btnLimpar = document.getElementById("btnLimpar");
  const btnLimparAut = document.getElementById("btnLimparAut");

  if (!inputNumero || !outputNumero || !btnLimpar || !btnLimparAut) {
    console.warn("Elementos do Limpador de Números não foram encontrados no DOM.");
    return;
  }

  // Evento para o botão "Limpar Número para autorização"
  btnLimpar.addEventListener("click", () => {
    const textoOriginal = inputNumero.value;
    // Expressão regular para encontrar sequências de exatamente 11 dígitos
    const contasDe11Digitos = textoOriginal.match(/\b\d{11}\b/g) || [];
    const resultadoFinal = contasDe11Digitos.join("\n");
    outputNumero.value = resultadoFinal;

    // Chama a nova função de copiar
    if (resultadoFinal) {
      copiarTexto(resultadoFinal, btnLimpar, "Limpar Número para autorização");
    }
  });

  // Evento para o botão "Limpar número para consulta"
  btnLimparAut.addEventListener("click", () => {
    const originalText = inputNumero.value;
    // Expressão regular para remover tudo que NÃO é dígito
    const regexLimpeza = /\D/g;
    const extratedCounts = originalText.replace(regexLimpeza, "");
    outputNumero.value = extratedCounts;

    // Chama a nova função de copiar
    if (extratedCounts) {
      copiarTexto(extratedCounts, btnLimparAut, "Limpar número para consulta");
    }
  });
}
