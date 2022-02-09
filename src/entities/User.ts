import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Sell } from "./Sell";

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
  cart: object[];

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  // @OneToMany((type) => Product, (product) => product.user) products!: Product[];

  @OneToMany((type) => Sell, (sell) => sell.user)
  sells!: Sell[];

  constructor(
    name: string,
    email: string,
    password: string,
    cart: object[],
    isAdm: boolean
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cart = cart;
    this.isAdm = isAdm;
  }
}
