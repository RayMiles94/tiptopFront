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


export interface TicketPrize {
  id: string;
  ticketNumber: number;
  prize: string;
  prizeNumber : number;
  isUsed : boolean;
}
