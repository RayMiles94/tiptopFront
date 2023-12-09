export interface User {
  enabled: boolean;
  email: string;
  username: string;
  role: string;
  id : number;
}


export interface Ticket {
  id: string;
  ticketNumber: boolean;
  active: string;
  user : User
}
