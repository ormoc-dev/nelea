// Simple interactivity for the teacher portfolio
(function () {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.getElementById('site-nav');
    const yearEl = document.getElementById('year');
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');

    // Year in footer
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
        // Close nav on link click (mobile)
        siteNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
            siteNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Header style on scroll
    let lastY = window.scrollY;
    const onScroll = () => {
        const y = window.scrollY;
        const shrink = y > 8;
        header && header.style.setProperty('box-shadow', shrink ? 'var(--shadow)' : 'none');
        lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Theme toggle (persists to localStorage)
    const THEME_KEY = 'teacher-portfolio-theme';
    const getSavedTheme = () => localStorage.getItem(THEME_KEY);
    const applyTheme = (theme) => {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
    };
    applyTheme(getSavedTheme());
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    }

    // Contact form: open mail client with prefilled message
    // Remove contact form handling (form removed on GitHub Pages build)
})();


