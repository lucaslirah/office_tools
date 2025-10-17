// Espera o HTML ser completamente carregado para executar o script
document.addEventListener("DOMContentLoaded", function () {
  // --- SEÇÃO 1: LIMPADOR DE NÚMEROS ---

  // 1. Selecionar os elementos do HTML com os quais vamos interagir.
  const inputNumero = document.getElementById("inputNumero");
  const outputNumero = document.getElementById("outputNumero");
  const btnLimpar = document.getElementById("btnLimpar");
  const btnLimparAut = document.getElementById("btnLimparAut");

  // Função reutilizável e moderna para copiar texto para a área de transferência
  function copiarTexto(textoParaCopiar, botaoClicado, textoOriginalBotao) {
    // A API navigator.clipboard é mais segura e moderna, mas exige um contexto seguro (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textoParaCopiar).then(
        () => {
          // Sucesso! Muda o texto do botão para "Copiado!"
          botaoClicado.textContent = "Copiado!";
          // Volta ao texto original depois de 2 segundos
          setTimeout(() => {
            botaoClicado.textContent = textoOriginalBotao;
          }, 2000);
        },
        (err) => {
          console.error("Erro ao copiar o texto: ", err);
          alert("Não foi possível copiar o texto.");
        }
      );
    } else {
      // Fallback para ambientes não seguros (como arquivos locais abertos diretamente) ou navegadores antigos
      const textArea = document.createElement("textarea");
      textArea.value = textoParaCopiar;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        botaoClicado.textContent = "Copiado!";
        setTimeout(() => {
          botaoClicado.textContent = textoOriginalBotao;
        }, 2000);
      } catch (err) {
        console.error("Fallback: Erro ao copiar o texto", err);
        alert("Não foi possível copiar o texto.");
      }
      document.body.removeChild(textArea);
    }
  }

  // Evento para o botão "Limpar Número para autorização"
  btnLimpar.addEventListener("click", () => {
    const textoOriginal = inputNumero.value;
    // Expressão regular para encontrar sequências de exatamente 11 dígitos
    const contasDe11Digitos = textoOriginal.match(/\b\d{11}\b/g) || []; // Adicionado '|| []' para evitar erro se nada for encontrado
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

  // --- SEÇÃO 2: LISTA DE BANCOS ---

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

      // Adiciona o evento de copiar para o botão de cada banco
      const copyButton = bankItem.querySelector(".copy-bank");
      copyButton.addEventListener("click", function () {
        const numberToCopy = this.getAttribute("data-number");
        // Reutilizamos nossa função de copiar!
        copiarTexto(numberToCopy, this, "Copiar Número");
      });

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

  // Função para excluir um banco (usando delegação de evento)
  bankList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-bank")) {
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

  // Adicionar banco com a tecla "Enter"
  addBankNumber.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      btnAddBank.click();
    }
  });

  // Carregar os bancos ao iniciar a página
  loadBanks();
});
