// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column()
  userId: string; // FK to User

  @Column()
  routeId: number; // FK to Route

  @Column()
  departureAt: string; // FK to Route

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
