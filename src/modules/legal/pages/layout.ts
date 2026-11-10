export const APP_NAME = 'Hesab Kitab App';

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const STYLES = `
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  color-scheme: light dark;
  --bg-base: #f4f6f1;
  --bg-top: #dcebd9;
  --surface: rgba(255, 255, 255, 0.78);
  --surface-strong: rgba(255, 255, 255, 0.96);
  --border: rgba(16, 28, 22, 0.1);
  --text: #121a16;
  --text-secondary: rgba(18, 26, 22, 0.62);
  --text-tertiary: rgba(18, 26, 22, 0.42);
  --accent: #9fd95c;
  --accent-soft: rgba(90, 150, 60, 0.14);
  --on-accent: #0b1410;
  --positive: #008837;
  --negative: #a11203;
  --negative-soft: rgba(192, 86, 74, 0.14);
  --hero-from: #5fbf72;
  --hero-via: #97de78;
  --hero-to: #cfee91;
  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --radius-pill: 999px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-base: #0b1410;
    --bg-top: #1f3a2a;
    --surface: rgba(255, 255, 255, 0.06);
    --surface-strong: rgba(255, 255, 255, 0.1);
    --border: rgba(255, 255, 255, 0.08);
    --text: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.6);
    --text-tertiary: rgba(255, 255, 255, 0.38);
    --accent: #c6f57e;
    --accent-soft: rgba(198, 245, 126, 0.15);
    --negative-soft: rgba(255, 138, 122, 0.15);
    --hero-from: #6fcf7f;
    --hero-via: #a9e886;
    --hero-to: #d9f59b;
  }
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--bg-base);
  background-image: linear-gradient(180deg, var(--bg-top) 0%, var(--bg-base) 420px);
  color: var(--text);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.shell {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px 72px;
}

.brand {
  display: inline-block;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  background: var(--accent-soft);
  color: var(--positive);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

h1 {
  margin: 20px 0 8px;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.15;
}

.lede {
  margin: 0;
  color: var(--text-secondary);
  font-size: 15px;
}

.updated {
  margin: 10px 0 0;
  color: var(--text-tertiary);
  font-size: 12px;
}

.card {
  margin-top: 26px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}

.card h2 {
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 600;
}

.card h2 + p,
.card h2 + ul {
  margin-top: 0;
}

.card p {
  margin: 0 0 12px;
  color: var(--text-secondary);
}

.card p:last-child,
.card ul:last-child {
  margin-bottom: 0;
}

.card ul {
  margin: 0 0 12px;
  padding-left: 20px;
  color: var(--text-secondary);
}

.card li {
  margin-bottom: 6px;
}

.card li:last-child {
  margin-bottom: 0;
}

.card strong {
  color: var(--text);
  font-weight: 600;
}

.notice {
  margin-top: 26px;
  padding: 20px 24px;
  border-radius: var(--radius-lg);
  background: var(--negative-soft);
  border: 1px solid var(--border);
}

.notice h2 {
  margin: 0 0 8px;
  color: var(--negative);
  font-size: 17px;
  font-weight: 700;
}

.notice p,
.notice ul {
  margin: 0 0 10px;
  color: var(--text);
}

.notice p:last-child,
.notice ul:last-child {
  margin-bottom: 0;
}

.notice ul {
  padding-left: 20px;
}

.hero {
  margin-top: 26px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background-image: linear-gradient(
    135deg,
    var(--hero-from) 0%,
    var(--hero-via) 55%,
    var(--hero-to) 100%
  );
  color: var(--on-accent);
}

.hero h2 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.hero p {
  margin: 0;
  color: rgba(11, 20, 16, 0.75);
}

.field {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 7px;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface-strong);
  color: var(--text);
  font-family: inherit;
  font-size: 16px;
}

input[type='text']:focus,
input[type='password']:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.check {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 20px 0 24px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--surface-strong);
  border: 1px solid var(--border);
}

.check input {
  width: 22px;
  height: 22px;
  margin: 0;
  flex: none;
  accent-color: var(--negative);
}

.check label {
  margin: 0;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
}

button {
  width: 100%;
  height: 54px;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--negative);
  color: #ffffff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  filter: brightness(1.08);
}

.error {
  margin-top: 26px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--negative-soft);
  border: 1px solid var(--border);
  color: var(--negative);
  font-size: 14px;
  font-weight: 600;
}

.done {
  margin-top: 26px;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  background: var(--accent-soft);
  border: 1px solid var(--border);
  color: var(--positive);
  font-size: 14px;
  font-weight: 600;
}

footer {
  margin-top: 34px;
  color: var(--text-tertiary);
  font-size: 13px;
}

footer p {
  margin: 0 0 6px;
}

a {
  color: var(--positive);
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .shell {
    padding: 28px 16px 56px;
  }

  h1 {
    font-size: 28px;
  }

  .card,
  .notice,
  .hero {
    padding: 20px;
  }
}
`;

export interface PageOptions {
  title: string;
  heading: string;
  lede: string;
  body: string;
  footer: string;
}

export function renderPage(options: PageOptions): string {
  return `<!doctype html>
<html lang="az">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow" />
    <title>${escapeHtml(options.title)} · ${APP_NAME}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
    />
    <style>${STYLES}</style>
  </head>
  <body>
    <main class="shell">
      <span class="brand">${APP_NAME}</span>
      <h1>${escapeHtml(options.heading)}</h1>
      <p class="lede">${escapeHtml(options.lede)}</p>
${options.body}
      <footer>
${options.footer}
      </footer>
    </main>
  </body>
</html>
`;
}
