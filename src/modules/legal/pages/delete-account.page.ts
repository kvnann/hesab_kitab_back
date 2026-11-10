import { APP_NAME, escapeHtml, renderPage } from './layout';

export interface DeleteAccountFormOptions {
  username: string;
  error: string | null;
  supportEmail: string | null;
}

const WHAT_GETS_DELETED = `
      <section class="notice">
        <h2>Diqqət: bu əməliyyat geri qaytarılmır</h2>
        <p>Hesabı sildiyiniz anda aşağıdakıların hamısı birlikdə silinir:</p>
        <ul>
          <li>hesab məlumatlarınız (istifadəçi adı, ad-soyad, qeyd);</li>
          <li>bütün şəxslər və onların borc balansları;</li>
          <li>bütün vaqonlar və onların alış-satış məlumatları;</li>
          <li>bütün əməliyyatlar və kassa qeydləri;</li>
          <li>tətbiq tənzimləmələriniz və aktiv sessiyalarınız.</li>
        </ul>
        <p>
          Silinmədən sonra bu məlumatları bərpa etmək mümkün deyil. Qeydlərinizi
          saxlamaq istəyirsinizsə, əvvəlcə tətbiqin Tənzimləmələr bölməsindən
          ehtiyat nüsxə götürün.
        </p>
      </section>`;

function footerLinks(supportEmail: string | null): string {
  const help = supportEmail
    ? `        <p>
          Giriş edə bilmirsinizsə bizə yazın:
          <a href="mailto:${escapeHtml(supportEmail)}">${escapeHtml(supportEmail)}</a>
        </p>`
    : `        <p>
          Giriş edə bilmirsinizsə tətbiqin mağaza səhifəsindəki əlaqə ünvanı
          vasitəsilə bizə yazın.
        </p>`;

  return `        <p><a href="/privacy">Məxfilik Siyasəti</a></p>
${help}
        <p>© ${new Date().getFullYear()} ${APP_NAME}</p>`;
}

export function renderDeleteAccountForm(options: DeleteAccountFormOptions): string {
  const error = options.error
    ? `      <p class="error">${escapeHtml(options.error)}</p>`
    : '';

  const body = `${error}
${WHAT_GETS_DELETED}

      <section class="card">
        <h2>Hesabı təsdiqləyin</h2>
        <p>
          Hesabın sahibi olduğunuzu təsdiqləmək üçün istifadəçi adınızı və
          şifrənizi daxil edin.
        </p>
        <form method="post" action="/delete-account">
          <div class="field">
            <label for="username">İstifadəçi adı</label>
            <input
              type="text"
              id="username"
              name="username"
              value="${escapeHtml(options.username)}"
              autocomplete="username"
              autocapitalize="none"
              spellcheck="false"
              maxlength="50"
              required
            />
          </div>
          <div class="field">
            <label for="password">Şifrə</label>
            <input
              type="password"
              id="password"
              name="password"
              autocomplete="current-password"
              maxlength="128"
              required
            />
          </div>
          <div class="check">
            <input type="checkbox" id="confirm" name="confirm" value="on" required />
            <label for="confirm">
              Hesabımın və bütün məlumatlarımın həmişəlik silinməsini
              təsdiqləyirəm.
            </label>
          </div>
          <button type="submit">Hesabı həmişəlik sil</button>
        </form>
      </section>`;

  return renderPage({
    title: 'Hesabı Sil',
    heading: 'Hesabı Sil',
    lede: `${APP_NAME} hesabınızı və ona bağlı bütün məlumatları bu səhifədən həmişəlik silə bilərsiniz.`,
    body,
    footer: footerLinks(options.supportEmail),
  });
}

export interface DeleteAccountDoneOptions {
  username: string;
  supportEmail: string | null;
}

export function renderDeleteAccountDone(options: DeleteAccountDoneOptions): string {
  const body = `      <p class="done">Hesab silindi.</p>

      <section class="card">
        <h2>Hər şey silindi</h2>
        <p>
          <strong>${escapeHtml(options.username)}</strong> hesabı və ona bağlı
          bütün şəxslər, vaqonlar, əməliyyatlar və tənzimləmələr verilənlər
          bazasından silindi. Aktiv sessiyalarınız da ləğv edildi.
        </p>
        <p>
          Tətbiqi cihazınızdan silə bilərsiniz. Yenidən istifadə etmək
          istəsəniz, tətbiqdən yeni hesab yarada bilərsiniz.
        </p>
      </section>`;

  return renderPage({
    title: 'Hesab Silindi',
    heading: 'Hesab silindi',
    lede: 'Məlumatlarınız verilənlər bazasından həmişəlik silindi.',
    body,
    footer: footerLinks(options.supportEmail),
  });
}
