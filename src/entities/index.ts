import { getRepository } from "typeorm";

import { User } from "./User";
import { Product } from "./Product";
import { Cart } from "./Cart";
import { Sell } from "./Sell";

// ISSO TUDO VAI PARA OS CONTROLLERS!

// Relação 1:1 User - Cart


const asyncFunctionCart = async () => {
  const cartRepository = getRepository(Cart);
  const data = {
    id: "asdasdfasdffasfasf",
    cartOwner: "André",
    products: [
      { name: "traquinas", type: "porcaria", price: 10 },
      { name: "tortuguitas", type: "porcaria", price: 5 },
    ],
    totalPrice: 15,
    createdOn: "zxcv",
  };
  const cart = cartRepository.create(data);
  await cartRepository.save(cart);
};

// Relação 1:1 Cart - Sell
const asyncFunctionCart = async () => {
  const cartRepository = getRepository(Cart);
  const data = {
    id: "asdasdfasdffasfasf",
    cartOwner: "André",
    products: [
      { name: "traquinas", type: "porcaria", price: 10 },
      { name: "tortuguitas", type: "porcaria", price: 5 },
    ],
    totalPrice: 15,
    createdOn: "zxcv",
  };
  const cart = cartRepository.create(data);
  await cartRepository.save(cart);
};

const asyncFunctionSell = async () => {
  const sellRepository = getRepository(Sell);
  const data = {
    id: "asdasdfasdffasfasf",
    clientName: "André",
    clientEmail: "mail@mail.com",
    password: "1234",
    products: [
      { name: "traquinas", type: "porcaria", price: 10 },
      { name: "tortuguitas", type: "porcaria", price: 5 },
    ],
    totalPrice: 15,
    createdOn: "zxcv",
  };
  const sell = sellRepository.create(data);
  await sellRepository.save(sell);
};


// Relação 1:N User - Product
const prod1Repository = getRepository(Product)
const data = {id: "144214", name: "string", type: "string", price: 10, createdOn: "zxcvxzcvzx"}
const prod1 = await prod1Repository.save(data)

const prod2Repository = getRepository(Product)
const data = {id: "144214", name: "string", type: "string", price: 10, createdOn: "zxcvxzcvzx"}
const prod2 = await prod2Repository.save(data)

const useRepository = getRepository(User);
const use = {
  id: "asdasdfasdffasfasf",
  name: "André",
  email: "mail@mail.com",
  password: "1234",
  isAdm: true,
  products: [prod1, prod2]
  createdOn: "zxcv",
};
await useRepository.save(use);

// Relação 1:N Product - Cart
const prod1Repository = getRepository(Product)
const data = {id: "144214", name: "traquinas", type: "porcaria", price: 10, createdOn: "zxcvxzcvzx"}
const prod1 = await prod1Repository.save(data)

const prod2Repository = getRepository(Product)
const data = {id: "144214", name: "tortuguitas", type: "porcaria", price: 5, createdOn: "zxcvxzcvzx"}
const prod2 = await prod2Repository.save(data)

const carRepository = getRepository(Cart);
const car = {
    id: "asdasdfasdffasfasf",
    cartOwner: "André",
    products: [prod1, prod2],
    totalPrice: 15,
    createdOn: "zxcv",
};
await carRepository.save(car);

// Relação 1:N User - Sell
const sell1Repository = getRepository(Sell)
const data = {    
    id: "asdasdfasdffasfasf",
    clientName: "André",
    clientEmail: "mail@mail.com",
    password: "1234",
    products: [
        { name: "traquinas", type: "porcaria", price: 10 },
        { name: "tortuguitas", type: "porcaria", price: 5 },
    ],
    totalPrice: 15,
    createdOn: "zxcv",
}
const sell1 = await sell1Repository.save(data)

const sell2Repository = getRepository(Sell)
const data = {
    id: "asdasdfasdffasfasf",
    clientName: "André",
    clientEmail: "mail@mail.com",
    password: "1234",
    products: [
        { name: "traquinas", type: "porcaria", price: 10 },
        { name: "tortuguitas", type: "porcaria", price: 5 },
    ],
    totalPrice: 15,
    createdOn: "zxcv",}
const sell2 = await sell2Repository.save(data)

const useRepository = getRepository(User);
const use = {
    id: "asdasdfasdffasfasf",
    name: "André",
    email: "mail@mail.com",
    password: "1234",
    isAdm: true,
    products: [prod1, prod2],
    sells: [sell1, sell2],
    createdOn: "zxcv",
};
await useRepository.save(use);