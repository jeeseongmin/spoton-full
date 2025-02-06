import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  buildingInfo: string;

  @Column({ length: 50, nullable: true })
  floorInfo: string;

  @OneToMany(() => Reservation, (reservation) => reservation.location)
  reservations: Reservation[];
}
