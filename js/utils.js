/**
 * Copia o texto fornecido para a área de transferência e atualiza o estado do botão temporariamente.
 * @param {string} textoParaCopiar - O conteúdo a ser copiado.
 * @param {HTMLElement} botaoClicado - O elemento do botão que foi clicado.
 * @param {string} textoOriginalBotao - O texto original do botão para restauração após o feedback.
 */
export function copiarTexto(textoParaCopiar, botaoClicado, textoOriginalBotao) {
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
