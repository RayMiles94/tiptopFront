export interface Ticket {
    id: number | null;
    ticketNumber: number;
    prize: string;
    active: string;
}

export interface Message {
    message: string;
    status: string;
}


export interface TicketCreateRequest {
  userId : number;
}
