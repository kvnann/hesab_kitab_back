import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { authed, closeTestApp, createTestApp, registerUser } from './utils/test-app';

describe('Legal pages (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await closeTestApp(app);
  });

  it('serves the privacy policy as HTML outside the api prefix', async () => {
    const response = await request(app.getHttpServer()).get('/privacy').expect(200);

    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('<title>Məxfilik Siyasəti · Hesab Kitab App</title>');
    expect(response.text).toContain('Məxfilik Siyasəti');
    expect(response.text).toContain('href="/delete-account"');
  });

  it('does not serve the privacy policy under the api prefix', async () => {
    await request(app.getHttpServer()).get('/api/v1/privacy').expect(404);
  });

  it('serves the account deletion form without authentication', async () => {
    const response = await request(app.getHttpServer())
      .get('/delete-account')
      .expect(200);

    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('<title>Hesabı Sil · Hesab Kitab App</title>');
    expect(response.text).toContain('action="/delete-account"');
    expect(response.text).toContain('name="username"');
    expect(response.text).toContain('name="password"');
    expect(response.text).toContain('name="confirm"');
  });

  it('asks for both fields when the form is empty', async () => {
    const response = await request(app.getHttpServer())
      .post('/delete-account')
      .type('form')
      .send({ username: '', password: '', confirm: 'on' })
      .expect(200);

    expect(response.text).toContain('İstifadəçi adını və şifrəni daxil edin.');
    expect(response.text).toContain('name="password"');
  });

  it('requires the confirmation checkbox', async () => {
    const user = await registerUser(app);
    const response = await request(app.getHttpServer())
      .post('/delete-account')
      .type('form')
      .send({ username: user.username, password: user.password })
      .expect(200);

    expect(response.text).toContain('Davam etmək üçün təsdiq qutusunu işarələyin.');

    await authed(app, user).get('/api/v1/users/me').expect(200);
  });

  it('rejects a wrong password and keeps the account', async () => {
    const user = await registerUser(app);
    const response = await request(app.getHttpServer())
      .post('/delete-account')
      .type('form')
      .send({ username: user.username, password: 'not-the-password', confirm: 'on' })
      .expect(200);

    expect(response.text).toContain('İstifadəçi adı və ya şifrə yanlışdır.');
    expect(response.text).toContain(`value="${user.username}"`);

    await authed(app, user).get('/api/v1/users/me').expect(200);
  });

  it('rejects an unknown username', async () => {
    const response = await request(app.getHttpServer())
      .post('/delete-account')
      .type('form')
      .send({ username: 'nobody_at_all_12345', password: 'whatever-123', confirm: 'on' })
      .expect(200);

    expect(response.text).toContain('İstifadəçi adı və ya şifrə yanlışdır.');
  });

  it('deletes the account and every record that belongs to it', async () => {
    const user = await registerUser(app);

    const contact = await authed(app, user)
      .post('/api/v1/contacts')
      .send({ name: 'Silinəcək şəxs' })
      .expect(201);

    await authed(app, user)
      .post('/api/v1/transactions')
      .send({
        type: 'expense',
        amount: 120,
        date: '2026-01-15',
        contactId: contact.body.id,
        description: 'Silinəcək əməliyyat',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/delete-account')
      .type('form')
      .send({ username: user.username, password: user.password, confirm: 'on' })
      .expect(200);

    expect(response.text).toContain('Hesab silindi');
    expect(response.text).toContain(user.username);

    await authed(app, user).get('/api/v1/users/me').expect(401);

    await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: user.username, password: user.password })
      .expect(401);
  });

  it('escapes the username it echoes back into the form', async () => {
    const response = await request(app.getHttpServer())
      .post('/delete-account')
      .type('form')
      .send({ username: '<script>x</script>', password: 'whatever-123', confirm: 'on' })
      .expect(200);

    expect(response.text).not.toContain('<script>x</script>');
    expect(response.text).toContain('&lt;script&gt;x&lt;/script&gt;');
  });
});
