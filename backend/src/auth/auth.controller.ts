import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoProfileDto } from './dto/kakao-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao/callback')
  async kakaoCallback(@Body() kakaoProfileDto: KakaoProfileDto) {
    try {
      const result = await this.authService.handleKakaoLogin(kakaoProfileDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
