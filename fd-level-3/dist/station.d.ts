export declare class Station {
    order: number;
    name: string;
    inT: number;
    outT: number;
    stayT: number;
    seatStatus: boolean[];
    private maxOrderLen;
    constructor(sInfo: string, sumIdleSeat: number);
    book(i: number): void;
    cancle(i: number): void;
}
