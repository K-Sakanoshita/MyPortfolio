const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
  menuButton.querySelector('.sr-only').textContent = isOpen ? 'メニューを開く' : 'メニューを閉じる';
});

navigation?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = 'メニューを開く';
  navigation.classList.remove('is-open');
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !navigation?.classList.contains('is-open')) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = 'メニューを開く';
  navigation.classList.remove('is-open');
  menuButton.focus();
});

const yearTabs = Array.from(document.querySelectorAll('.year-tabs [role="tab"]'));
const yearTabList = document.querySelector('.year-tabs');

if (yearTabList && yearTabs.length) {
  const selectYear = (selectedTab) => {
    yearTabs.forEach((tab) => {
      const selected = tab === selectedTab;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (panel) panel.hidden = !selected;
    });
  };

  selectYear(yearTabs[0]);
  yearTabList.classList.add('is-ready');

  yearTabList.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && yearTabList.contains(tab)) selectYear(tab);
  });

  yearTabList.addEventListener('keydown', (event) => {
    const currentIndex = yearTabs.indexOf(event.target);
    if (currentIndex < 0) return;
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % yearTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + yearTabs.length) % yearTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = yearTabs.length - 1;
    else return;
    event.preventDefault();
    selectYear(yearTabs[nextIndex]);
    yearTabs[nextIndex].focus();
  });
}
