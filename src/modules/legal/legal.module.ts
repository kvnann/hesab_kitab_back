import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { LegalController } from './legal.controller';
import { LegalService } from './legal.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [LegalController],
  providers: [LegalService],
})
export class LegalModule {}
