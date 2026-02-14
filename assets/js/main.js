const announcer = document.getElementById('sr-announcer');

function announce(message) {
  if (!announcer) return;
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

async function writeClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function toggleChecklistItem(item) {
  item.classList.toggle('checked');
  const checked = item.classList.contains('checked');
  item.setAttribute('aria-pressed', String(checked));

  const label = item.querySelector('.q')?.textContent?.trim();
  announce(`${label || 'チェック項目'}を${checked ? '完了' : '未完了'}にしました`);
}

document.querySelectorAll('.checklist li').forEach((listItem) => {
  listItem.setAttribute('role', 'button');
  listItem.setAttribute('tabindex', '0');
  listItem.setAttribute('aria-pressed', String(listItem.classList.contains('checked')));

  listItem.addEventListener('click', () => toggleChecklistItem(listItem));
  listItem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleChecklistItem(listItem);
    }
  });
});

async function copyPrompt(element) {
  try {
    const text = element.textContent
      .replace('📋 クリックでコピー', '')
      .replace('✓ コピーしました', '')
      .trim();
    await writeClipboard(text);

    element.classList.add('copied');
    setTimeout(() => element.classList.remove('copied'), 1500);
    announce('プロンプトをコピーしました');
  } catch {
    announce('コピーに失敗しました');
  }
}

window.copyPrompt = copyPrompt;

const sections = document.querySelectorAll('.section[id]');
const links = document.querySelectorAll('.toc-link');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-80px 0px -60% 0px' }
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll('.kw-item').forEach((item) => {
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');

  const copyKeywordPrompt = async () => {
    try {
      const term = item.childNodes[0].textContent.trim();
      const prompt = `以下の用語について、Claude Codeを使ったAIコーディングの文脈で、プログラミング初学者向けに教えてください。\n\n用語：${term}\n\n1. 一言での定義\n2. なぜAIコーディングで重要か\n3. Claude Codeでの具体的な使用場面\n4. 関連概念`;
      await writeClipboard(prompt);

      const originalMarkup = item.innerHTML;
      item.style.borderColor = 'var(--accent)';
      item.innerHTML = '<span style="color:var(--accent);font-size:12px;">✓ プロンプトをコピーしました</span>';
      setTimeout(() => {
        item.innerHTML = originalMarkup;
        item.style.borderColor = '';
      }, 1500);
      announce(`「${term}」のプロンプトをコピーしました`);
    } catch {
      announce('コピーに失敗しました');
    }
  };

  item.addEventListener('click', copyKeywordPrompt);
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      copyKeywordPrompt();
    }
  });
});

document.querySelectorAll('.deepdive code').forEach((codeElement) => {
  codeElement.setAttribute('role', 'button');
  codeElement.setAttribute('tabindex', '0');
  codeElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      copyPrompt(codeElement);
    }
  });
});
