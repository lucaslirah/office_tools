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

  // --- SEÇÃO 2: LISTA DE NOTAS ---

  const notesList = document.getElementById("notesList");
  const addNoteTitle = document.getElementById("addNoteTitle");
  const addNoteContent = document.getElementById("addNoteContent");
  const btnAddNote = document.getElementById("btnAddNote");

  // Função para carregar as notas do localStorage
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";
      noteItem.innerHTML = `
                <div>
                    <div>
                        <h3>${note.title}</h3>
                        <span><strong>Conteúdo</strong>: ${note.content}</span>
                    </div>
                    <button data-index="${index}" class="delete-note">X</button>
                </div>
                <button data-content="${note.content}" class="copy-note">Copiar Nota</button>
            `;

      // Adiciona o evento de copiar para o botão de cada nota
      const copyButton = noteItem.querySelector(".copy-note");
      copyButton.addEventListener("click", function () {
        const contentToCopy = this.getAttribute("data-content");
        // Reutilizamos nossa função de copiar!
        copiarTexto(contentToCopy, this, "Copiar Nota");
      });

      notesList.appendChild(noteItem);
    });
  }

  // Função para adicionar uma nota
  btnAddNote.addEventListener("click", function () {
    const title = addNoteTitle.value.trim();
    const content = addNoteContent.value.trim();
    if (title && content) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push({ title, content });
      localStorage.setItem("notes", JSON.stringify(notes));
      addNoteTitle.value = "";
      addNoteContent.value = "";
      loadNotes();
    }
  });

  // Função para excluir uma nota (usando delegação de evento)
  notesList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-note")) {
      if (!confirm("Tem certeza que deseja excluir esta nota?")) {
        return;
      }
      const index = e.target.getAttribute("data-index");
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
    }
  });

  // Adicionar nota com a tecla "Enter"
  addNoteContent.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      btnAddNote.click();
    }
  });

  // Carregar as notas ao iniciar a página
  loadNotes();
});
