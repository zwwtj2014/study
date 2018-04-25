import { TICKET_JSON } from "./tickt";
/******************************
G111,10
站序 站名 到站时间 出发时间 停留时间
01 北京南 ---- 08:35 ----
02 德州东 09:48 09:50 2分钟
03 济南西 10:14 10:17 3分钟
04 泰安 10:35 10:46 11分钟
05 滁州 12:33 12:35 2分钟
06 南京南 12:54 12:57 3分钟
07 丹阳北 13:22 13:24 2分钟
08 无锡东 13:47 13:49 2分钟
09 上海虹桥 14:22 14:22 ----
 */
export declare class Train {
    private trainTrip;
    private seatNum;
    private stations;
    private seqNO;
    private stationIndex;
    private ticketIndex;
    constructor();
    init(data: string): void;
    query(from: string | number, to: string | number): number;
    /**
     * @returns {json|null} ticket json
     * {
     *    seqNo: number; // 车票序号, 从1开始
     *    seat: number; // 座位号, 从1开始
     *    from: number;
     *    to: number;
     *    status: string; // 车票状态, 正常为OK
     * }
     */
    book(from: string | number, to: string | number): TICKET_JSON | null;
    /**
     * @returns {json|null} ticket json
     */
    queryTicket(seqNo: number): TICKET_JSON | null;
    cancel(seqNo: number): TICKET_JSON | null;
    /**
     * [
     *    [1,2],
     *    [3,7],
     *    ['xx','yy'],
     *    [6,8]
     * ]
     */
    batchOrder(orders: OrderType[], delay: number, doneFn: Function): void;
    private queryIdleSeatByStations(pStations);
}
export declare type OrderType = [string | number, string | number];
