import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { ReservationModule } from './reservation/reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

// nestjs와 mysql을 연결해주는 ORM
const ormModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // 본인의 MySQL 사용자명
  password: 'password', // 본인의 MySQL 비밀번호
  database: 'spoton_db', // 사용할 데이터베이스 이름
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 개발환경에서만 true로 설정 (프로덕션 환경에서는 false 권장)
});
const jwtModule = JwtModule.register({
  secret: 'secretKey', // 운영 환경에서는 환경 변수 사용 권장
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [
    ormModule,
    jwtModule,
    UserModule,
    LocationModule,
    ReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
