import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { KakaoProfileDto } from './dto/kakao-profile.dto';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async handleKakaoLogin(kakaoProfile: KakaoProfileDto) {
    // 이메일로 사용자 조회
    let user = await this.userService.findByEmail(kakaoProfile.email);

    if (!user) {
      // 신규 회원가입 (승인 대기 상태로 등록)
      user = await this.userService.createUser({
        name: kakaoProfile.nickname,
        email: kakaoProfile.email,
        kakaoToken: kakaoProfile.token,
        phone: '',
        affiliation: '공동체', // 기본값 또는 추가 정보 활용
        isApproved: false, // 신규 가입은 승인 대기 상태
        role: UserRole.USER, // 기본 역할 설정
      });

      return { message: '회원가입이 완료되었습니다. 승인을 기다려주세요.' };
    } else {
      // 이미 가입된 사용자 처리
      if (!user.isApproved) {
        return {
          message: '아직 승인이 완료되지 않았습니다. 승인을 기다려주세요.',
        };
      } else {
        // 승인된 사용자 -> JWT 발급 후 로그인 처리
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { message: '로그인 성공', token };
      }
    }
  }
}
