import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
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

  // @Column()
  // cart: object[];

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => Cart, (cart) => cart.user)
  cart!: Cart;

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
    // this.cart = cart;
    this.isAdm = isAdm;
  }
}
