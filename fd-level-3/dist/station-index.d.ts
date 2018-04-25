import { Station } from "./station";
export declare class StationIndex {
    orderStation: Map<number, Station>;
    nameStation: Map<string, Station>;
    build(stations: Station[]): void;
    getStationByOrder(o: string | number): Station;
    getStationByName(n: string): Station;
    getStationByOrderOrName(...ks: Array<string | number>): Station[];
    /**
     * 查询两个站点之间要经过的站
     * // todo: 需要缓存各个站点之间的数据?
     */
    queryStationsFromTo(from: string | number, to: string | number): Station[];
}
