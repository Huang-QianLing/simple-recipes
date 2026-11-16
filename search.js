(() => {
  const input = document.getElementById('recipe-search');
  const cards = Array.from(document.querySelectorAll('[data-search]'));
  const status = document.getElementById('search-status');
  const empty = document.getElementById('empty-search');
  const normalize = value => value.normalize('NFKC').toLocaleLowerCase().trim();
  function update() {
    const words = normalize(input.value).split(/[\s,，]+/u).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const matches = words.every(word => normalize(card.dataset.search).includes(word));
      card.hidden = !matches;
      if (matches) count += 1;
    });
    status.textContent = words.length ? `找到 ${count} 道食譜（共 ${cards.length} 道）` : `顯示全部 ${cards.length} 道食譜`;
    empty.hidden = count !== 0;
  }
  input.addEventListener('input', update);
  document.getElementById('clear-search').addEventListener('click', () => {
    input.value = '';
    update();
    input.focus();
  });
  document.getElementById('search-box').hidden = false;
  update();
})();
