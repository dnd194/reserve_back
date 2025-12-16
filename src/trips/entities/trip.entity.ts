// src/users/user.entity.ts
import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';


@Entity()
export class Trip {
  
  @PrimaryColumn()
  departureAt: string;
  
  @PrimaryColumn()
  routeId: number; // FK to Route

  @Column()
  maxSeats: number;

  @Column()
  bookedCount: number;

}
