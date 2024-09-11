import { Customer } from "./customer.type";

export type User = {
  createdAt: Date;
  deletedAt: Date | null;
  email: string;
  id: string;
  password: string;
  roles: string;
  updatedAt: Date | null;
  username: string;
  customer: Customer;
};
