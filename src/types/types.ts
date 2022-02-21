import originalBcrypt from "bcrypt";

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IProductRegister {
  name: string;
  type: string;
  price: number;
}

export namespace bcrypt {
  export const hash = originalBcrypt.hash;
}
