/* Small, dependency-free enhancements for the portfolio. */
(() => {
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => loader.classList.add('loaded'));

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('nav');
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));

  const roles = ['B.Tech CSE Student', 'Aspiring Software Developer', 'Problem Solver', 'Python Learner', 'DSA Enthusiast', 'C++ Programmer', 'Always Learning'];
  const typed = document.querySelector('#typed-role');
  let index = 0, char = 0, deleting = false;
  function typeRole() {
    const word = roles[index];
    typed.textContent = word.slice(0, char);
    if (!deleting && char < word.length) { char++; setTimeout(typeRole, 55); }
    else if (!deleting) { deleting = true; setTimeout(typeRole, 1550); }
    else if (char > 0) { char--; setTimeout(typeRole, 30); }
    else { deleting = false; index = (index + 1) % roles.length; setTimeout(typeRole, 250); }
  }
  typeRole();

  const progress = document.querySelector('.progress span');
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${height ? (window.scrollY / height) * 100 : 0}%`;
  }, { passive: true });
  window.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch') { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }
  }, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  reveals.forEach(item => observer.observe(item));

  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const node = entry.target, target = Number(node.dataset.count), decimals = target % 1 ? 1 : 0;
    const started = performance.now();
    const tick = now => { const value = Math.min((now - started) / 900, 1) * target; node.textContent = value.toFixed(decimals); if (value < target) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); countObserver.unobserve(node);
  }), { threshold: .8 });
  counters.forEach(counter => countObserver.observe(counter));
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
