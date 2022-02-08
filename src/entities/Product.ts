import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { User } from "./User";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdOn!: Date;

  constructor(name: string, type: string, price: number) {
    this.name = name;
    this.type = type;
    this.price = price;
  }
}
