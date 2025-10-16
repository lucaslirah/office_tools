// 1. Selecionar os elementos do HTML com os quais vamos interagir.
// Usamos 'const' porque essas referências não vão mudar.
const inputNumero = document.getElementById("inputNumero");
const outputNumero = document.getElementById("outputNumero");
const btnLimpar = document.getElementById("btnLimpar");
const btnLimparAut = document.getElementById("btnLimparAut");

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
  const buttonName = "btnLimpar";

  copyToClipboard(buttonName);
});

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

  const buttonName = "btnLimparAut";
  copyToClipboard(buttonName);
});

//criar uma função que possa ser reutilizada que copie o conteúdo do outputNumero para a área de transferência
function copyToClipboard(buttonName) {
  const outputNumero = document.getElementById("outputNumero");
  outputNumero.select();
  document.execCommand("copy");
  //identificar qual o botão de limpar foi clicado e trocar o seu texto para "Copiado!" por 2 segundos
  if (buttonName === "btnLimpar") {
    btnLimpar.textContent = "Copiado!";
    setTimeout(() => {
      btnLimpar.textContent = "Limpar número para consulta";
    }, 2000);
  } else if (buttonName === "btnLimparAut") {
    btnLimparAut.textContent = "Copiado!";
    setTimeout(() => {
      btnLimparAut.textContent = "Limpar Número para autorização";
    }, 2000);
  }
}

document.getElementById("btnCopy").addEventListener("click", function () {
  copyToClipboard();
});

document.addEventListener("DOMContentLoaded", function () {
  const bankList = document.getElementById("bankList");
  const addBankName = document.getElementById("addBankName");
  const addBankNumber = document.getElementById("addBankNumber");
  const btnAddBank = document.getElementById("btnAddBank");

  // Função para carregar os bancos do localStorage
  function loadBanks() {
    const banks = JSON.parse(localStorage.getItem("banks")) || [];
    bankList.innerHTML = "";
    banks.forEach((bank, index) => {
      const bankItem = document.createElement("div");
      bankItem.className = "bank-item";
      //adicionar um botão de copiar o número do banco para a área de transferência
      bankItem.innerHTML = `
              <div>
                <div>
                  <h3>${bank.name}</h3>
                  <span><strong>Número</strong>: ${bank.number}</span>
                </div>
                  <button data-index="${index}" class="delete-bank">X</button>
              </div>
              <button data-number="${bank.number}" class="copy-bank">Copiar Número</button>
            `;

      // Função para copiar o número do banco para a área de transferência
      const copyButton = bankItem.querySelector(".copy-bank");
      copyButton.addEventListener("click", function () {
        const numberToCopy = copyButton.getAttribute("data-number");
        navigator.clipboard.writeText(numberToCopy).then(
          /* um retorno visual de copiado*/
          function () {
            copyButton.textContent = "Copiado!";
            setTimeout(function () {
              copyButton.textContent = "Copiar Número";
            }, 2000);
          },
          function (err) {
            console.error("Erro ao copiar o número: ", err);
          }
        );
      });
      /*
       */
      bankList.appendChild(bankItem);
    });
  }

  // Função para adicionar um banco
  btnAddBank.addEventListener("click", function () {
    const name = addBankName.value.trim();
    const number = addBankNumber.value.trim();
    if (name && number) {
      const banks = JSON.parse(localStorage.getItem("banks")) || [];
      banks.push({ name, number });
      localStorage.setItem("banks", JSON.stringify(banks));
      addBankName.value = "";
      addBankNumber.value = "";
      loadBanks();
    }
  });

  // Função para excluir um banco
  bankList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-bank")) {
      //perguntar antes de excluir
      if (!confirm("Tem certeza que deseja excluir este banco?")) {
        return;
      }
      const index = e.target.getAttribute("data-index");
      const banks = JSON.parse(localStorage.getItem("banks")) || [];
      banks.splice(index, 1);
      localStorage.setItem("banks", JSON.stringify(banks));
      loadBanks();
    }
  });

  //usar tecla enter para adicionar banco
  addBankNumber.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      btnAddBank.click();
    }
  });

  // Carregar os bancos ao iniciar
  loadBanks();
});
