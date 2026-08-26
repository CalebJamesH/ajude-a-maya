const copyBtn = document.getElementById('copy-btn');
const pixKey = document.getElementById('pix-key');
const toast = document.getElementById('toast');
const shareBtn = document.getElementById('share-btn');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

copyBtn.addEventListener('click', async () => {
  const key = pixKey.textContent.trim();

  try {
    await navigator.clipboard.writeText(key);
    copyBtn.classList.add('copied');
    copyBtn.querySelector('.btn-text').textContent = 'Copiado!';
    showToast('Chave Pix copiada!');

    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('.btn-text').textContent = 'Copiar';
    }, 2500);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = key;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    copyBtn.classList.add('copied');
    copyBtn.querySelector('.btn-text').textContent = 'Copiado!';
    showToast('Chave Pix copiada!');

    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('.btn-text').textContent = 'Copiar';
    }, 2500);
  }
});

shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: 'Ajude a Maya a vencer essa batalha! ❤️',
    text: 'A pequena Maya tem 3 anos e nasceu com Síndrome do Coração Esquerdo Hipoplásico. Doe via Pix e ajude essa causa!',
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copiado! Compartilhe com seus amigos.');
    } catch {
      showToast('Copie o link desta página para compartilhar.');
    }
  }
});
