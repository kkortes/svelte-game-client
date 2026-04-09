const routes = [
  { path: '/', page: '/pages/home.html' },
  { path: '/brawlers', page: '/pages/brawlers.html' },
  { path: '/brawlers/:characterIndex', page: '/pages/brawler-detail.html' },
  { path: '/the-arena', page: '/pages/the-arena.html' },
  { path: '/the-arena/:fightId', page: '/pages/fight-detail.html' },
  { path: '/random-duel', page: '/pages/random-duel.html' },
  { path: '/vendor', page: '/pages/vendor.html' },
  { path: '/ability-scaling', page: '/pages/ability-scaling.html' },
  { path: '/character-scaling', page: '/pages/character-scaling.html' },
  { path: '/equipment-scaling', page: '/pages/equipment-scaling.html' },
  { path: '/debug', page: '/pages/debug.html' },
  { path: '/reset-password/:secret', page: '/pages/reset-password.html' },
];

const cache = {};

const match = (path) => {
  for (const route of routes) {
    const paramNames = [];
    const pattern = route.path.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    const m = path.match(new RegExp(`^${pattern}$`));
    if (m) {
      const params = paramNames.reduce((a, name, i) => ({ ...a, [name]: m[i + 1] }), {});
      return { route, params };
    }
  }
  return null;
};

// Inject HTML into page-content and execute any <script type="module"> blocks
const loadPage = (html) => {
  const el = document.querySelector('page-content');
  if (!el) return false;

  // Parse in a temp container to separate scripts from content
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Extract and remove scripts (innerHTML doesn't execute them)
  const scripts = temp.querySelectorAll('script[type="module"]');
  scripts.forEach(s => s.remove());

  // Extract and remove styles (will re-append after content)
  const styles = temp.querySelectorAll('style');
  styles.forEach(s => s.remove());

  // Set content (without scripts/styles — Vibe's MutationObserver will hydrate)
  el.innerHTML = temp.innerHTML;

  // Re-append styles inside page-content
  styles.forEach(s => el.appendChild(s.cloneNode(true)));

  // Execute scripts as real modules
  scripts.forEach(s => {
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = s.textContent;
    el.appendChild(script);
  });
};

export const navigate = async (path) => {
  const result = match(path);
  if (!result) return;

  history.pushState(null, '', path);

  const r = result.route.path;
  if (!r.includes(':characterIndex') && !r.includes(':fightId') && r !== '/random-duel') {
    $.selectedBrawlers = [];
    $.maxBrawlers = 0;
  }

  $.route = result.route.path;
  $.routeParams = result.params;

  const page = result.route.page;
  if (!cache[page]) cache[page] = await fetch(page).then(r => r.text());
  loadPage(cache[page]);
};

export const init = () => {
  document.querySelector('[vibe]').addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href?.startsWith('/') && !href.startsWith('/static/')) {
      e.preventDefault();
      navigate(href);
    }
  });

  window.addEventListener('popstate', () => {
    const result = match(window.location.pathname);
    if (!result) return;

    const r = result.route.path;
    if (!r.includes(':characterIndex') && !r.includes(':fightId') && r !== '/random-duel') {
      $.selectedBrawlers = [];
      $.maxBrawlers = 0;
    }

    $.route = result.route.path;
    $.routeParams = result.params;
    const page = result.route.page;
    if (cache[page]) {
      loadPage(cache[page]);
    } else {
      fetch(page).then(r => r.text()).then(html => {
        cache[page] = html;
        loadPage(html);
      });
    }
  });

  // Try initial navigation — may fail if page-content isn't mounted yet
  // (e.g. inside a conditional). Caller should retry after state changes.
  navigate(window.location.pathname);
};

// Re-attempt navigation if a previous attempt failed (page-content wasn't in DOM)
export const retryNavigation = () => {
  if (document.querySelector('page-content')?.innerHTML?.includes('Loading')) {
    navigate(window.location.pathname);
  }
};
