import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 이메일을 기준으로 사용자를 조회합니다.
   * @param email - 검색할 사용자 이메일
   * @returns 사용자 객체 또는 undefined
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * 새로운 사용자를 생성하고 데이터베이스에 저장합니다.
   * @param userData - 생성할 사용자 데이터 (Partial<User> 타입)
   * @returns 생성된 사용자 객체
   */
  async createUser(userData: Partial<User>): Promise<User> {
    // create() 메서드로 엔터티 인스턴스를 생성합니다.
    const newUser = this.userRepository.create(userData);
    // save() 메서드를 통해 DB에 저장 후, 저장된 객체를 반환합니다.
    return await this.userRepository.save(newUser);
  }
}
