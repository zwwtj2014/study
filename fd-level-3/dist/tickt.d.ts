export declare class Ticket {
    seqNo: number;
    seat: number;
    from: number;
    to: number;
    status: string;
    constructor(seqNo: number, seat: number, from: number, to: number, status?: string);
    toJSON(): TICKET_JSON;
}
export declare type TICKET_JSON = {
    seqNo: number;
    seat: number;
    from: number;
    to: number;
    status: string;
};
