import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  constructor(cartOwner: string, products: object[], totalPrice: number) {
    this.cartOwner = cartOwner;
    this.products = products;
    this.totalPrice = totalPrice;
  }
}
