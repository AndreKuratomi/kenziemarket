import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  cartOwner: string;

  @Column()
  products: object[];

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  constructor(cartOwner: string, products: object[], totalPrice: number) {
    this.cartOwner = cartOwner;
    this.products = products;
    this.totalPrice = totalPrice;
  }
}
