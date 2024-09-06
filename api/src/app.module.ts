import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SneakerModule } from './sneaker/sneaker.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';
import { StockModule } from './stock/stock.module';
import { PaymentService } from './stripe/stripe-price/payment/payment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_DATABASE_HOST,
      port: parseInt(process.env.POSTGRESQL_DATABASE_PORT),
      username: process.env.POSTGRESQL_DATABASE_USERNAME,
      password: process.env.POSTGRESQL_DATABASE_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SneakerModule,
    UserModule,
    AuthModule,
    MailModule,
    PaymentModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaymentService],
})
export class AppModule {}
