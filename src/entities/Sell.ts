import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
