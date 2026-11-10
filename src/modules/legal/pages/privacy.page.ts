import { APP_NAME, escapeHtml, renderPage } from './layout';

export const PRIVACY_LAST_UPDATED = '10 Noyabr 2026';

export interface PrivacyPageOptions {
  supportEmail: string | null;
}

export function renderPrivacyPage(options: PrivacyPageOptions): string {
  const contact = options.supportEmail
    ? `<p>
          Məxfiliklə bağlı sualınız varsa bizə yazın:
          <a href="mailto:${escapeHtml(options.supportEmail)}">${escapeHtml(
            options.supportEmail,
          )}</a>
        </p>`
    : `<p>
          Məxfiliklə bağlı sualınız varsa tətbiqin mağaza səhifəsindəki əlaqə
          ünvanı vasitəsilə bizə yazın.
        </p>`;

  const body = `
      <p class="updated">Son yenilənmə: ${PRIVACY_LAST_UPDATED}</p>

      <section class="card">
        <h2>Qısaca</h2>
        <p>
          ${APP_NAME} vaqon alqı-satqısını, şəxslərlə borc hesabını və kassanı
          izləmək üçün şəxsi mühasibat tətbiqidir. Yalnız tətbiqin işləməsi üçün
          lazım olan məlumatları saxlayırıq.
        </p>
        <ul>
          <li>Reklam yoxdur, analitika yoxdur, izləyici yoxdur.</li>
          <li>Məlumatlarınızı heç kimə satmırıq və paylaşmırıq.</li>
          <li>Hesabınızı istədiyiniz vaxt özünüz tamamilə silə bilərsiniz.</li>
        </ul>
      </section>

      <section class="card">
        <h2>Hansı məlumatları saxlayırıq</h2>
        <p>
          Bütün məlumatlar tətbiqə <strong>sizin daxil etdiyiniz</strong>
          məlumatlardır. Cihazınızdan heç nə avtomatik toplanmır.
        </p>
        <ul>
          <li>
            <strong>Hesab:</strong> istifadəçi adı, ad-soyad, könüllü qeyd və
            şifrənizin kriptoqrafik hash-i. Şifrənin özü heç bir yerdə
            saxlanmır.
          </li>
          <li>
            <strong>Şəxslər:</strong> daxil etdiyiniz ad, könüllü telefon
            nömrəsi, qeyd və hesablanmış borc balansı.
          </li>
          <li>
            <strong>Vaqonlar:</strong> vaqon nömrəsi, alış və satış həcmi,
            qiymətlər, gömrük xərci, marşrut vəziyyəti və tarixləri, əlaqəli
            alıcı və satıcı.
          </li>
          <li>
            <strong>Əməliyyatlar:</strong> tarix, məbləğ, növ, təsvir, əlaqəli
            şəxs və vaqon, kassaya və balansa təsiri.
          </li>
          <li>
            <strong>Tənzimləmələr:</strong> tətbiq üzrə seçimləriniz.
          </li>
          <li>
            <strong>Texniki:</strong> sessiyanı davam etdirmək üçün yeniləmə
            tokenlərinin hash-i və serverin standart iş logları (sorğu vaxtı və
            xəta məlumatı).
          </li>
        </ul>
      </section>

      <section class="card">
        <h2>Nə toplamırıq</h2>
        <ul>
          <li>Məkan məlumatı.</li>
          <li>Cihazdakı kontakt siyahınız, şəkilləriniz və fayllarınız.</li>
          <li>Reklam identifikatoru və ya davranış izləmə məlumatı.</li>
          <li>Ödəniş və kart məlumatı — tətbiq ödəniş qəbul etmir.</li>
        </ul>
      </section>

      <section class="card">
        <h2>Məlumatlardan necə istifadə edirik</h2>
        <p>
          Məlumatlar yalnız sizə xidmət göstərmək üçün istifadə olunur: hesabınıza
          giriş, qeydlərinizin saxlanması və cihazlar arasında sinxronlaşdırılması,
          balans və kassa hesablamaları, ehtiyat nüsxənin hazırlanması.
        </p>
        <p>
          Məlumatlarınızı reklam üçün istifadə etmirik, profil qurmuruq və
          avtomatlaşdırılmış qərar vermə sistemində işlətmirik.
        </p>
      </section>

      <section class="card">
        <h2>Təhlükəsizlik</h2>
        <ul>
          <li>Şifrələr <strong>Argon2id</strong> alqoritmi ilə hash-lanır.</li>
          <li>
            Şəxslərin telefon nömrələri verilənlər bazasında
            <strong>AES-256</strong> ilə şifrələnmiş saxlanılır.
          </li>
          <li>Tətbiq ilə server arasındakı bütün əlaqə HTTPS/TLS üzərindən gedir.</li>
          <li>
            Hər sorğu müddəti məhdud giriş tokeni ilə təsdiqlənir və sorğu sayına
            limit tətbiq olunur.
          </li>
          <li>
            Məlumatlar bulud hostinq provayderimizin (Railway) idarə olunan
            serverində və verilənlər bazasında saxlanılır.
          </li>
        </ul>
        <p>
          Heç bir sistem tam qorunmuş deyil, lakin məlumatlarınızı qorumaq üçün
          ağlabatan texniki tədbirləri görürük.
        </p>
      </section>

      <section class="card">
        <h2>Nə qədər saxlanılır</h2>
        <p>
          Qeydləriniz hesabınız mövcud olduğu müddətdə saxlanılır. Hesabı
          sildiyiniz anda bütün şəxslər, vaqonlar, əməliyyatlar və
          tənzimləmələriniz verilənlər bazasından birlikdə silinir. Bu əməliyyat
          geri qaytarıla bilməz.
        </p>
      </section>

      <section class="card">
        <h2>Hüquqlarınız</h2>
        <ul>
          <li>
            <strong>Baxmaq və düzəltmək:</strong> bütün qeydləriniz tətbiqdə
            açıqdır və istənilən vaxt dəyişdirilə bilər.
          </li>
          <li>
            <strong>İxrac etmək:</strong> tətbiqin Tənzimləmələr bölməsindən
            məlumatlarınızın ehtiyat nüsxəsini götürə bilərsiniz.
          </li>
          <li>
            <strong>Silmək:</strong> hesabı və bütün məlumatları tətbiqdən və ya
            aşağıdakı səhifədən silə bilərsiniz.
          </li>
        </ul>
      </section>

      <section class="card">
        <h2>Hesabın silinməsi</h2>
        <p>
          Hesabınızı və ona bağlı bütün məlumatları silmək üçün
          <a href="/delete-account">Hesabı Sil</a> səhifəsinə daxil olun və
          istifadəçi adınızla şifrənizi təsdiqləyin.
        </p>
      </section>

      <section class="card">
        <h2>Uşaqlar</h2>
        <p>
          Tətbiq biznes qeydiyyatı üçün nəzərdə tutulub və 16 yaşdan kiçik
          şəxslərə ünvanlanmır. 16 yaşdan kiçik istifadəçinin məlumatını
          bilmədən saxladığımızı öyrənsək, həmin hesabı siləcəyik.
        </p>
      </section>

      <section class="card">
        <h2>Dəyişikliklər</h2>
        <p>
          Bu siyasət yenilənərsə, yuxarıdakı “Son yenilənmə” tarixi dəyişdiriləcək.
          Əhəmiyyətli dəyişikliklər barədə tətbiq vasitəsilə məlumat verəcəyik.
        </p>
      </section>

      <section class="card">
        <h2>Əlaqə</h2>
        ${contact}
      </section>`;

  const footer = `        <p><a href="/delete-account">Hesabı Sil</a></p>
        <p>© ${new Date().getFullYear()} ${APP_NAME}</p>`;

  return renderPage({
    title: 'Məxfilik Siyasəti',
    heading: 'Məxfilik Siyasəti',
    lede: `${APP_NAME} hansı məlumatları saxlayır, nə üçün saxlayır və siz onları necə idarə edirsiniz.`,
    body,
    footer,
  });
}
