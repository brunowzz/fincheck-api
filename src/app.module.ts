import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
