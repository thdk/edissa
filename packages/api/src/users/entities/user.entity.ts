import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  userName: string;

  @Column()
  email: string;
}
