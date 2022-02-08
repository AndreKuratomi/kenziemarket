import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Cart } from "./Cart";

@Entity("sells")
export class Sell {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column()
  products: object[];

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => Cart)
  @JoinColumn()
  cart: Cart;

  constructor(
    clientName: string,
    clientEmail: string,
    products: object[],
    totalPrice: number
  ) {
    this.clientName = clientName;
    this.clientEmail = clientEmail;
    this.products = products;
    this.totalPrice = totalPrice;
  }
}
