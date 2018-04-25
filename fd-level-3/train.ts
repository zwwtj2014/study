import { Station } from "./station";
import { StationIndex } from "./station-index";
import { TICKET_JSON, Ticket } from "./tickt";
import { TicketIndex } from "./ticket-index";

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
export class Train {
    private trainTrip: string;
    private seatNum: number;
    private stations: Array<Station>;

    private seqNO = 1;

    private stationIndex: StationIndex;
    private ticketIndex: TicketIndex;

    constructor() {
        this.stationIndex = new StationIndex();
        this.ticketIndex = new TicketIndex();
    }

    init(data: string) {
        if (data == undefined) {
            return;
        }
        const [trainInfo, , ...stationsInfo] = data.split("\n");

        // line1: 车次,座位数
        const tmpLine1 = trainInfo.split(",");
        if (tmpLine1.length !== 2) {
            throw new RangeError("parameter does not match");
        }
        this.trainTrip = tmpLine1[0];
        this.seatNum = +tmpLine1[1];

        // line3-line: 站序 站名 到站时间 出发时间 停留时间
        this.stations = new Array(stationsInfo.length);
        for (let i = this.stations.length; --i >= 0; ) {
            this.stations[i] = new Station(stationsInfo[i], this.seatNum);
        }

        // build index
        this.stationIndex.build(this.stations);
    }

    query(from: string | number, to: string | number): number {
        const pStations = this.stationIndex.queryStationsFromTo(from, to);
        if (pStations === null) {
            return 0;
        }
        return this.queryIdleSeatByStations(pStations).filter(s => s).length;
    }

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
    book(from: string | number, to: string | number): TICKET_JSON | null {
        const pStations = this.stationIndex.queryStationsFromTo(from, to);
        if (pStations === null) {
            return null;
        }
        const idleSeatStatus = this.queryIdleSeatByStations(pStations);
        // 输出的站顺序有问题或者票已经售罄
        if (idleSeatStatus.filter(s => s).length <= 0) {
            return null;
        }
        // 卖的座位就是剩余状态中的第一张
        const seat = idleSeatStatus.findIndex(s => s);
        // 将经过的站seat位置都标志为false
        for (let i = pStations.length - 2; i >= 0; --i) {
            pStations[i].book(seat);
        }

        // 存索引
        const ticket = new Ticket(this.seqNO++, seat, pStations[0].order, pStations[pStations.length - 1].order);
        this.ticketIndex.build(ticket);

        return ticket.toJSON();
    }

    /**
     * @returns {json|null} ticket json
     */
    queryTicket(seqNo: number): TICKET_JSON | null {
        return this.ticketIndex.getBySeqNo(seqNo);
    }

    cancel(seqNo: number): TICKET_JSON | null {
        let ticket = this.ticketIndex.getBySeqNo(seqNo);
        if (ticket == null) {
            return null;
        }

        // 1. 回收座位
        const pStations = this.stationIndex.queryStationsFromTo(ticket.from, ticket.to);
        // 将经过的站seat位置都标志为true
        for (let i = pStations.length - 2; i >= 0; --i) {
            pStations[i].cancle(ticket.seat);
        }

        // 2. 修改状态
        ticket.status = "CANCEL";
        return ticket;
    }

    /**
     * [
     *    [1,2],
     *    [3,7],
     *    ['xx','yy'],
     *    [6,8]
     * ]
     */
    // 1.每个延迟内最多只能处理一个订单 => 两个订单的时间差大于等于delay ?
    // 2.需要考虑最优解 ?
    // 3.这块代码没时间再细看了, 而且很多逻辑和上面的重复了，比如根据from和to取了多遍的station
    batchOrder(orders: OrderType[], delay: number, doneFn: Function) {
        // 可回收的座位 => 站短的?
        let orderAndGap = [];
        for (let k = orders.length - 1; k >= 0; --k) {
            const o = orders[k];
            const pStations = this.stationIndex.queryStationsFromTo(o[0], o[1]);
            if (pStations === null) {
                continue;
            }
            const gap = pStations.pop().order - pStations[0].order;
            orderAndGap.push({
                gap: gap,
                order: o
            });
        }
        orderAndGap.sort((o1, o2) => {
            return o1.gap - o2.gap;
        });

        let i = 0;
        let len = orderAndGap.length;
        let ts: TICKET_JSON[] = [];
        let fn = () => {
            if (i < len) {
                const o = orderAndGap[i++].order;
                let t = this.book(o[0], o[1]);
                if (t !== null) {
                    ts.push(t);
                }
                setTimeout(fn, delay);
            } else {
                doneFn(ts);
            }
        };
        setTimeout(fn, delay);
    }

    private queryIdleSeatByStations(pStations: Station[]): boolean[] {
        let idleSeatStatus = Array.from({ length: this.seatNum }, () => true);
        // 这里-2是因为空闲座位不用关心到达站
        for (let i = pStations.length - 2; i >= 0; --i) {
            const s = pStations[i];
            s.seatStatus.forEach((ss, i) => {
                idleSeatStatus[i] = idleSeatStatus[i] && ss;
            });
        }
        return idleSeatStatus;
    }
}

export type OrderType = [string | number, string | number];
