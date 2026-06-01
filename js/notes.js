import { copiarTexto } from './utils.js';

/**
 * Inicializa o módulo de Notas Rápidas.
 */
export function initNotes() {
  const notesList = document.getElementById("notesList");
  const addNoteTitle = document.getElementById("addNoteTitle");
  const addNoteContent = document.getElementById("addNoteContent");
  const btnAddNote = document.getElementById("btnAddNote");

  if (!notesList || !addNoteTitle || !addNoteContent || !btnAddNote) {
    console.warn("Elementos do bloco de Notas Rápidas não foram encontrados no DOM.");
    return;
  }

  // Função para salvar a nova ordem das notas no localStorage após arrastar
  function saveNotesOrder() {
    const currentItems = [...notesList.querySelectorAll(".note-item")];
    const originalNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const reorderedNotes = currentItems.map(item => {
      const originalIndex = parseInt(item.getAttribute("data-index"), 10);
      return originalNotes[originalIndex];
    });
    localStorage.setItem("notes", JSON.stringify(reorderedNotes));
    loadNotes(); // Recarrega para atualizar os data-index e o layout
  }

  // Função para carregar as notas do localStorage
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const noteItem = document.createElement("div");
      noteItem.className = "note-item";
      noteItem.setAttribute("draggable", "false"); // Inicia como falso para permitir seleção de texto normal
      noteItem.setAttribute("data-index", index);
      
      noteItem.innerHTML = `
                <div class="note-header">
                    <div class="note-text-container">
                        <h3 class="note-title">
                            <span class="drag-handle" title="Arrastar para reordenar">
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="2" cy="3" r="1.5" fill="#aaa" />
                                    <circle cx="2" cy="9" r="1.5" fill="#aaa" />
                                    <circle cx="2" cy="15" r="1.5" fill="#aaa" />
                                    <circle cx="10" cy="3" r="1.5" fill="#aaa" />
                                    <circle cx="10" cy="9" r="1.5" fill="#aaa" />
                                    <circle cx="10" cy="15" r="1.5" fill="#aaa" />
                                </svg>
                            </span>
                            ${note.title}
                        </h3>
                        <p class="note-content"><strong>Conteúdo</strong>: ${note.content}</p>
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

      // Seletor da alça de arrasto
      const dragHandle = noteItem.querySelector(".drag-handle");

      // Permite o arrasto APENAS quando o usuário clica e segura na alça (drag-handle)
      dragHandle.addEventListener("mousedown", () => {
        noteItem.setAttribute("draggable", "true");
      });

      dragHandle.addEventListener("mouseup", () => {
        noteItem.setAttribute("draggable", "false");
      });

      // Eventos de arrastar
      noteItem.addEventListener("dragstart", () => {
        noteItem.classList.add("dragging");
      });

      noteItem.addEventListener("dragend", () => {
        noteItem.classList.remove("dragging");
        noteItem.setAttribute("draggable", "false"); // Restaura o estado para segurança
        saveNotesOrder();
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

  // Lógica de dragover do container para ordenar ao vivo
  notesList.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necessário para permitir o drop!
    const draggingElement = document.querySelector(".dragging");
    if (!draggingElement) return;

    const afterElement = getDragAfterElement(notesList, e.clientY);
    if (afterElement == null) {
      notesList.appendChild(draggingElement);
    } else {
      notesList.insertBefore(draggingElement, afterElement);
    }
  });

  // Função auxiliar para encontrar o elemento mais próximo abaixo do cursor do mouse
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".note-item:not(.dragging)")];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  // Carrega as notas salvas inicialmente
  loadNotes();
}
