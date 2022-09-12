/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true, // not used in production it is used only for dev
      synchronize: true // use migration for production, it is used only for dev
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
