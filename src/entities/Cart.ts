import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Product } from "./Product";
import { User } from "./User";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  cartOwner: string;

  @Column()
  products: object[];

  @Column({ default: 0 })
  totalPrice: number;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => User)
  @JoinColumn()
  user!: User;

  // @OneToMany((type) => Product, (product) => product.user)
  // product!: Product[];

  constructor(cartOwner: string, products: object[], totalPrice: number) {
    this.cartOwner = cartOwner;
    this.products = products;
    this.totalPrice = totalPrice;
  }
}
