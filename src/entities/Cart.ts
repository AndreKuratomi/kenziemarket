import User from "./User";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";

@Entity("cart")
class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  cartOwner: string;

  @Column({ type: "text", array: true, default: [] })
  products: object[];

  @CreateDateColumn()
  createdOn!: Date;

  @OneToOne((type) => User)
  @JoinColumn()
  user!: User;

  // @OneToMany((type) => Product, (product) => product.user)
  // product!: Product[];

  constructor(cartOwner: string, products: object[]) {
    this.cartOwner = cartOwner;
    this.products = products;
  }
}

export default Cart;
