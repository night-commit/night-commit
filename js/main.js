// Applies the active language's text to every [data-i18n] element
// and flips the page direction (ltr/rtl) accordingly.
// Depends on lang/en.js and lang/ar.js being loaded first,
// which populate window.translations.

function setLang(lang) {
  const dict = window.translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) toggleBtn.textContent = lang === 'en' ? 'AR' : 'EN';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.lang === 'ar' ? 'ar' : 'en';
      setLang(current === 'en' ? 'ar' : 'en');
    });
  }

  setLang('en');
});
