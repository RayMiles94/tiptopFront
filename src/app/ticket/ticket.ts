export interface Ticket {
    id: number | null;
    ticketNumber: number;
    prize: string;
    status: string;
}

export interface Message {
    message: string;
    status: string;
}