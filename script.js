import { initNumberCleaner } from './js/numberCleaner.js';
import { initNotes } from './js/notes.js';

// Espera o HTML ser completamente carregado para inicializar as ferramentas do escritório
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o limpador de números
  initNumberCleaner();

  // Inicializa o gerenciador de notas rápidas
  initNotes();
});
