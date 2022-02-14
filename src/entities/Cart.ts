import User from "./User";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";

import Product from "./Product";
import Sell from "./Sell";

@Entity("cart")
class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => User, (user) => user.cart)
  @JoinColumn()
  user!: User;

  @OneToMany((type) => Product, (product) => product.cart)
  product!: Product[];

  // @OneToOne((type) => Sell, (sell) => sell.cart)
  // sell!: Sell;
}

export default Cart;
