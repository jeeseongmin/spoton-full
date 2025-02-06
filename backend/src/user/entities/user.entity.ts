import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

export enum UserRole {
  USER = 'user',
  LEADER = 'leader',
  MINISTRY = 'ministry',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  kakaoToken: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  // 소속은 '공동체', '다락방', '순' 등의 값을 가질 수 있습니다.
  @Column({ length: 50 })
  affiliation: string;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
