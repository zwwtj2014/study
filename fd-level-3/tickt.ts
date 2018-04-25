export class Ticket {
    constructor(public seqNo: number, public seat: number, public from: number, public to: number, public status: string = "OK") {}

    toJSON(): TICKET_JSON {
        return {
            seqNo: this.seqNo,
            seat: this.seat,
            from: this.from,
            to: this.to,
            status: this.status
        };
    }
}

export type TICKET_JSON = {
    seqNo: number; // 车票序号, 从1开始
    seat: number; // 座位号, 从1开始
    from: number;
    to: number;
    status: string; // 车票状态, 正常为OK
};
