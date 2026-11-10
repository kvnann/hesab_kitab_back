import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../common/decorators/public.decorator';
import { AppConfig } from '../../config/configuration';
import { LegalService } from './legal.service';
import {
  renderDeleteAccountDone,
  renderDeleteAccountForm,
} from './pages/delete-account.page';
import { renderPrivacyPage } from './pages/privacy.page';

const HTML = 'text/html; charset=utf-8';

const ERROR_MISSING_FIELDS = 'İstifadəçi adını və şifrəni daxil edin.';
const ERROR_NOT_CONFIRMED = 'Davam etmək üçün təsdiq qutusunu işarələyin.';
const ERROR_BAD_CREDENTIALS = 'İstifadəçi adı və ya şifrə yanlışdır.';

@Controller()
@Public()
@ApiExcludeController()
export class LegalController {
  constructor(
    private readonly legalService: LegalService,
    private readonly config: ConfigService<AppConfig, true>,
  ) {}

  @Get('privacy')
  @Header('Content-Type', HTML)
  @Header('Cache-Control', 'public, max-age=3600')
  privacy(): string {
    return renderPrivacyPage({ supportEmail: this.supportEmail });
  }

  @Get('delete-account')
  @Header('Content-Type', HTML)
  @Header('Cache-Control', 'no-store')
  deleteAccountForm(): string {
    return renderDeleteAccountForm({
      username: '',
      error: null,
      supportEmail: this.supportEmail,
    });
  }

  @Post('delete-account')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', HTML)
  @Header('Cache-Control', 'no-store')
  @Throttle({ auth: {} })
  async deleteAccount(@Body() body: Record<string, unknown>): Promise<string> {
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const confirmed = body.confirm === 'on';

    const error =
      !username || !password
        ? ERROR_MISSING_FIELDS
        : !confirmed
          ? ERROR_NOT_CONFIRMED
          : null;

    if (error) {
      return this.formWithError(username, error);
    }

    try {
      await this.legalService.deleteAccount(username, password);
    } catch (caught) {
      if (caught instanceof UnauthorizedException) {
        return this.formWithError(username, ERROR_BAD_CREDENTIALS);
      }
      throw caught;
    }

    return renderDeleteAccountDone({ username, supportEmail: this.supportEmail });
  }

  private formWithError(username: string, error: string): string {
    return renderDeleteAccountForm({
      username,
      error,
      supportEmail: this.supportEmail,
    });
  }

  private get supportEmail(): string | null {
    return this.config.get('supportEmail', { infer: true });
  }
}
