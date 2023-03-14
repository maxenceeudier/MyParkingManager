import { Module } from '@nestjs/common';
import { ServeStaticModule, serveStaticProviders } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Ticket } from './tickets/tickets.entity';
import { TicketsModule } from './tickets/tickets.module';
import { PlaceModule } from './places/places.module';
import { ParkingModule } from './parking/parking.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: 5432,
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, Ticket],
        autoLoadEntities: true,
        // TODO check NODE_ENV
        //
        // From NestJS docs:
        // Setting `synchronize: true` shouldn't be used in production - otherwise you can lose production data.
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    TicketsModule,
    PlaceModule,
    ParkingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
