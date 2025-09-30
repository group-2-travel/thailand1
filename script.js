(function () {
  // ===== 1) Highlight active nav link =====
  function highlightNav() {
    // اسم الملف الحالي (بدون الهاش)
    const path = (window.location.pathname.split('/').pop() || 'index.html');
    const links = document.querySelectorAll('nav ul li a, nav .menu a');

    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      // نتجاهل أي #anchor و نقارن فقط اسم الصفحة
      const target = href.split('#')[0] || href;
      if (target === path) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // ===== 2) Dark mode toggling =====
  function initDarkMode() {
    const toggleButton = document.getElementById('theme-toggle');
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') document.body.classList.add('dark');

    toggleButton?.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
    });
  }

  // ===== 3) Mobile menu (burger) =====
  function initMobileMenu() {
    const menuToggleBtn = document.getElementById('menu-toggle'); // زر ☰
    const mainMenu = document.getElementById('main-menu');        // <ul> الرئيسية

    if (!menuToggleBtn || !mainMenu) return;

    const closeMenu = () => {
      mainMenu.classList.remove('open');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
    };

    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mainMenu.classList.toggle('open');
      menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // إغلاق القائمة بعد اختيار رابط
    mainMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // إغلاق بالضغط خارج القائمة
    document.addEventListener('click', (e) => {
      if (!mainMenu.contains(e.target) && e.target !== menuToggleBtn) {
        closeMenu();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    highlightNav();
    initDarkMode();
    initMobileMenu();
  });
})();