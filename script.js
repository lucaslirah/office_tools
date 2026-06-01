import { initCardCollapse } from './js/cardCollapse.js';
import { initNumberCleaner } from './js/numberCleaner.js';
import { initNotes } from './js/notes.js';

// Espera o HTML ser completamente carregado para inicializar as ferramentas do escritório
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa a funcionalidade de minimizar/expandir os quadros das ferramentas (executa primeiro para carregar estado)
  initCardCollapse();

  // Inicializa o limpador de números
  initNumberCleaner();

  // Inicializa o gerenciador de notas rápidas
  initNotes();
});
