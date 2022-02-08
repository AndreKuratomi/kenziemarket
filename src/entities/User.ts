import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  constructor(name: string, email: string, password: string, isAdm: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdm = isAdm;
  }
}
