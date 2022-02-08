import { getRepository } from "typeorm";

import { User } from "./User";
import { Product } from "./Product";
import { Cart } from "./Cart";
import { Sell } from "./Sell";

// Relação 1:1 User - Cart
const asyncFunctionUser = async () => {
  const userRepository = getRepository(User);
  const data = {
    id: "asdasdfasdffasfasf",
    name: "André",
    email: "mail@mail.com",
    password: "1234",
    isAdm: true,
    createdOn: "zxcv",
  };
  const user = userRepository.create(data);
  await userRepository.save(user);
};

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
