import {Ticket, User} from "../user-manager/User";

export interface Person {
  id: number;
  username: string;
  password: string;
  email:string;
  role: string;
  prize: string;
  tickets:Ticket[]
  ticketNumber: number;
  status: string;
}

export interface Prize {
  id: number;
  name: string;
  description: string;
  probability: number;
  user : User
}
