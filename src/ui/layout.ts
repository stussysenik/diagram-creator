export function createLayout(): { sidebar: HTMLElement; preview: HTMLElement } {
  const app = document.getElementById('app')!;
  app.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'app-layout';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = '<h2 class="sidebar-title">Parameters</h2>';

  const preview = document.createElement('main');
  preview.className = 'preview';

  // Hamburger toggle for mobile
  const toggle = document.createElement('button');
  toggle.className = 'sidebar-toggle';
  toggle.setAttribute('aria-label', 'Toggle sidebar');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  wrapper.appendChild(toggle);
  wrapper.appendChild(sidebar);
  wrapper.appendChild(preview);
  app.appendChild(wrapper);

  return { sidebar, preview };
}
