import { Ticket } from "./tickt";
export declare class TicketIndex {
    private seqNoMap;
    getBySeqNo(seqNo: number): Ticket | null;
    build(ticket: Ticket): void;
}
