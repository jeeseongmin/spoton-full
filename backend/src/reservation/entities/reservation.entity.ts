import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';

export enum ReservationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  // 예약한 사용자를 연결 (Many-to-One 관계)
  @ManyToOne(() => User, (user) => user.reservations, { nullable: false })
  user: User;

  // 예약 날짜 (예: 예약한 날짜만 관리할 경우 date 타입 사용)
  @Column({ type: 'date' })
  reservationDate: Date;

  // 예약한 장소를 연결 (Many-to-One 관계)
  @ManyToOne(() => Location, (location) => location.reservations, {
    nullable: false,
  })
  location: Location;

  // 예약 상태 (예: pending, approved, cancelled)
  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  // 필요에 따라 추가적인 컬럼(예: 예약 시간, 비고 등)을 작성할 수 있습니다.
}
