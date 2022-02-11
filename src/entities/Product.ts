import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";

import Cart from "./Cart";
import User from "./User";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdOn!: Date;

  // @ManyToOne((type) => User, (user) => user.products) user!: User;
  @ManyToOne((type) => Cart, (cart) => cart.products) cart!: Cart;

  constructor(name: string, type: string, price: number) {
    this.name = name;
    this.type = type;
    this.price = price;
  }
}

export default Product;
