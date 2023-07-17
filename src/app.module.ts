import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TreeModule } from './tree/tree.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    CarModule,
    TreeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/AngularExample'),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: '12345',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, JwtService],
})
export class AppModule {}
