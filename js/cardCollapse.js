/**
 * Inicializa a funcionalidade de minimizar (colapsar) os cartões das ferramentas.
 * Lê o estado salvo no localStorage e configura os event listeners.
 */
export function initCardCollapse() {
  const cards = document.querySelectorAll(".tool-card");

  cards.forEach(card => {
    const cardId = card.id;
    if (!cardId) return; // Só gerencia colapso se o card tiver um ID único

    const header = card.querySelector(".tool-header");
    if (!header) return;

    const storageKey = `card-collapsed-${cardId}`;

    // 1. Carrega o estado de colapso inicial do localStorage
    const isCollapsed = localStorage.getItem(storageKey) === "true";
    if (isCollapsed) {
      card.classList.add("collapsed");
    }

    // 2. Registra o evento de clique no cabeçalho
    header.addEventListener("click", (e) => {
      // Evita colapsar se o clique originou de um elemento interativo interno diferente (como input ou link hipotético)
      const targetTag = e.target.tagName.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || targetTag === "a") {
        return;
      }

      // Alterna o estado de colapso do card
      const willCollapse = card.classList.toggle("collapsed");

      // Grava no localStorage para persistência
      localStorage.setItem(storageKey, willCollapse ? "true" : "false");
    });
  });
}
