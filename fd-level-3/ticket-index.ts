import { Ticket } from "./tickt";

export class TicketIndex {
    private seqNoMap = new Map<number, Ticket>();

    getBySeqNo(seqNo: number): Ticket| null {
        return this.seqNoMap.get(seqNo) || null;
    }

    build(ticket: Ticket) {
        this.seqNoMap.set(ticket.seqNo, ticket);
    }
}
