# 🛠️ Ferramentas de Escritório (Office Tools)

Uma aplicação web moderna, elegante e de alta performance projetada para otimizar e automatizar tarefas repetitivas do dia a dia no escritório. Desenvolvida inteiramente com tecnologias web nativas (**HTML5**, **CSS3** e **JavaScript ES6**), a ferramenta oferece uma experiência fluida, responsiva e sem dependências externas.

---

## 🚀 Funcionalidades Principais

### 1. 🧹 Limpador de Números (Consulta vs Autorização)
Uma ferramenta essencial para higienização e formatação de dados numéricos (como números de contas, convênios ou telefones) copiados de relatórios ou conversas informais.
*   **Limpar Número para Autorização:** Filtra e exibe instantaneamente apenas blocos sequenciais de exatamente 11 dígitos numéricos presentes no texto original.
*   **Limpar Número para Consulta:** Remove absolutamente qualquer caractere não numérico (letras, espaços, traços, parênteses), extraindo todos os algarismos em uma sequência pura.
*   **Cópia Rápida Integrada:** Ambos os botões copiam automaticamente o resultado gerado para a sua área de transferência com um feedback visual instantâneo e elegante (`Copiado!`).

### 2. 📝 Notas Rápidas à Mão
Um bloco de notas ágil e interativo para armazenar informações recorrentes, scripts de atendimento ou lembretes instantâneos.
*   **Persistência Local (Local Storage):** Suas notas permanecem salvas com segurança diretamente no seu navegador, mesmo após fechar a janela ou reiniciar o computador.
*   **Reordenação por Arrasto (Drag & Drop Premium):**
    *   **Alça de Arrasto Dedicada:** Um ícone premium de 6 pontos (`⋮⋮`) que serve como alça exclusiva para o arrasto.
    *   **Foco em Usabilidade:** O arrasto só é ativado pela alça, permitindo que você **selecione texto normalmente** no conteúdo da nota sem iniciar um arrasto acidental.
    *   **Interface Dinâmica (Estilo Trello):** Enquanto você move uma nota, os outros cartões se deslocam suavemente abrindo espaço, fornecendo feedback visual de onde a nota será solta.
    *   **Design 3D Flutuante:** A nota arrastada ganha profundidade (escala levemente menor, opacidade de `45%`, fundo azulado e borda tracejada elegante).
*   **Ações Instantâneas:**
    *   **Copiar Nota:** Botão verde dedicado que copia todo o conteúdo da nota de forma assíncrona.
    *   **Excluir Nota:** Botão vermelho minimalista para deletar a nota com confirmação de segurança.
*   **Formatação Inteligente:** Suporte completo a quebras de linha reais (`white-space: pre-wrap`) para que as notas fiquem organizadas exatamente como você as escreveu.

---

## 🎨 Design System e Visual Premium

O design foi construído seguindo as melhores diretrizes de interfaces modernas corporativas:
*   **Paleta de Cores Curada:** Tons neutros, azul corporativo (`#3498db` / `#2980b9`), verde sucesso (`#2ecc71`) e vermelho alerta (`#e74c3c`).
*   **Responsividade Robusta:** Utilização de Flexbox dinâmico com regras de dimensionamento adaptativo (`flex: 1 1 300px` com `max-width`). A interface se ajusta perfeitamente desde telas gigantes até smartphones.
*   **Tipografia Limpa:** Fontes de sistema nativas de alta legibilidade (San Francisco, Segoe UI, Roboto) que garantem carregamento instantâneo.
*   **Micro-animações:** Transições suaves de 0.2s em todos os botões, estados de hover e no arrasto de notas, fornecendo uma excelente experiência tátil e visual ao usuário.

---

## 💻 Como Rodar o Projeto

Como o projeto é construído em cima de tecnologias puras da Web, **não é necessário instalar nenhuma dependência ou rodar servidores complexos!**

1.  Faça o clone ou baixe este repositório no seu computador.
2.  Dê um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador de preferência.
3.  *Opcional (Desenvolvimento):* Se preferir rodar localmente com live-reload, você pode usar extensões como o **Live Server** (no VS Code) ou qualquer servidor local estático simples (ex: `npx serve .` ou `python -m http.server`).

---

## 🛠️ Detalhes de Implementação Técnica

### Algoritmo de Proximidade (Arrasto ao Vivo)
A ordenação em tempo real durante o arrasto utiliza física de colisão de caixas delimitadoras (`DOMRect`). A função calcula qual elemento está mais próximo da coordenada vertical do mouse (`e.clientY`) e insere o item arrastado de maneira cirúrgica:

```javascript
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".note-item:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
```

### Isolamento de Drag por Mousedown
Para permitir a seleção de textos dentro de uma nota draggable, o evento `draggable` é chaveado dinamicamente no ciclo de clique da alça:
```javascript
dragHandle.addEventListener("mousedown", () => {
  noteItem.setAttribute("draggable", "true");
});
dragHandle.addEventListener("mouseup", () => {
  noteItem.setAttribute("draggable", "false");
});
```

---

## 📝 Licença

Desenvolvido por Lucas Lira para otimização de rotinas de escritório. Livre para modificação e uso pessoal ou profissional.
