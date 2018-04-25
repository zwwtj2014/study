// 站序 站名 到站时间 出发时间 停留时间
// 01 北京南 ---- 08:35 ----
// 02 德州东 09:48 09:50 2分钟

export class Station {
    public order: number;
    public name: string;
    public inT: number;
    public outT: number;
    public stayT: number;
    public seatStatus: boolean[]; // 空闲的座位, 小于等于整个车厢的座位

    private maxOrderLen; // 最大的order的长度

    constructor(sInfo: string, sumIdleSeat: number) {
        const sArr = sInfo.split(/\t| /);
        this.order = +sArr[0];
        this.name = sArr[1];
        // inT;outT;stayT
        this.seatStatus = Array.from({ length: sumIdleSeat }, () => true);
    }

    book(i: number) {
        if (i < 0 || i > this.seatStatus.length) {
            throw new RangeError("seat no. error");
        }
        if (!this.seatStatus[i]) {
            throw new Error("seat has been booked");
        }
        this.seatStatus[i] = false;
    }

    cancle(i: number) {
        if (i < 0 || i > this.seatStatus.length) {
            throw new RangeError("seat no error");
        }
        this.seatStatus[i] = true;
    }
}
