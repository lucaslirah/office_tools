// 1. Selecionar os elementos do HTML com os quais vamos interagir.
// Usamos 'const' porque essas referências não vão mudar.
const inputNumero = document.getElementById("inputNumero");
const outputNumero = document.getElementById("outputNumero");
const btnLimpar = document.getElementById("btnLimpar");

// 2. Adicionar um "ouvinte de evento" ao botão.
// A função dentro do addEventListener só será executada QUANDO o botão for clicado.
btnLimpar.addEventListener("click", () => {
  // 3. Obter o valor (o texto) que está dentro do campo de entrada.
  const textoOriginal = inputNumero.value;

  // 2. A mágica acontece aqui, com o método .match() e uma nova expressão regular.
  //    A expressão /\d+/g significa:
  //      \d   -> Procure por qualquer dígito numérico (de 0 a 9).
  //      +    -> Combine os dígitos que aparecerem em sequência (um ou mais).
  //      /g   -> Procure em todo o texto (g = global), não pare no primeiro resultado.
  // O .match() retorna um array (uma lista) com todos os textos que correspondem à regra.
  const contasDe11Digitos = textoOriginal.match(/\b\d{11}\b/g);
  // O resultado de contasExtraidas será: ['00150022326', '00100184468', '00100145285', '00150027294']

  // 3. Agora, juntamos os itens da lista, separando cada um com uma quebra de linha ('\n').
  const resultadoFinal = contasDe11Digitos.join("\n");

  // 5. Colocar o texto já limpo dentro do campo de saída.
  outputNumero.value = resultadoFinal;
});

const btnLimparAut = document.getElementById("btnLimparAut");

btnLimparAut.addEventListener("click", () => {
  const originalText = inputNumero.value;
  // outputNumero.value = originalText
  const regexLimpeza = /\D/g;

  // 2. A mágica acontece aqui, com o método .match() e uma nova expressão regular.
  //    A expressão /\d+/g significa:
  //      \d   -> Procure por qualquer dígito numérico (de 0 a 9).
  //      +    -> Combine os dígitos que aparecerem em sequência (um ou mais).
  //      /g   -> Procure em todo o texto (g = global), não pare no primeiro resultado.
  // O .match() retorna um array (uma lista) com todos os textos que correspondem à regra.
  const extratedCounts = originalText.replace(regexLimpeza, "");

  outputNumero.value = extratedCounts;
});
