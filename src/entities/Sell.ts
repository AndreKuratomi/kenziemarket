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

  @Column()
  clientName: string;

  @Column()
  clientEmail: string;

  @Column({ default: 0 })
  totalPrice: number;

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => Cart)
  @JoinColumn()
  cart!: Cart;

  // @ManyToOne((type) => User, (user) => user.sells)
  // user!: User;

  constructor(clientName: string, clientEmail: string, totalPrice: number) {
    this.clientName = clientName;
    this.clientEmail = clientEmail;
    this.totalPrice = totalPrice;
  }
}

export default Sell;
