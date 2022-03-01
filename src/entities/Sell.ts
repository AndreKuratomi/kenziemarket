import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import Cart from "./Cart";
import User from "./User";

@Entity("sells")
class Sell {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdOn!: Date;

  @Column({ default: 0 })
  totalPrice!: number;

  @OneToOne((type) => Cart)
  @JoinColumn()
  cart!: Cart;

  @ManyToOne((type) => User, (user) => user.sells)
  user!: User;

  // constructor(totalPrice: number) {
  //   this.totalPrice = totalPrice;
  // }
}

export default Sell;
