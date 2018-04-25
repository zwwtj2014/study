import { Station } from "./station";

export class StationIndex {
    // order
    orderStation = new Map<number, Station>();
    // name
    nameStation = new Map<string, Station>();

    //

    build(stations: Station[]) {
        for (const s of stations) {
            this.orderStation.set(s.order, s);
            this.nameStation.set(s.name, s);
        }
    }

    getStationByOrder(o: string | number) {
        return this.orderStation.get(+o);
    }

    getStationByName(n: string) {
        return this.nameStation.get(n);
    }

    getStationByOrderOrName(...ks: Array<string | number>) {
        return ks.map(k => {
            return this.getStationByOrder(k) || this.getStationByName(<string>k);
        });
    }

    /**
     * 查询两个站点之间要经过的站
     * // todo: 需要缓存各个站点之间的数据?
     */
    queryStationsFromTo(from: string | number, to: string | number): Station[] {
        const [fStation, tStation] = this.getStationByOrderOrName(from, to);
        if (!fStation || !tStation) {
            return null;
        }
        const fOrder = fStation.order;
        const tOrder = tStation.order;
        if (fOrder >= tOrder) {
            return null;
        }

        let pStations: Station[] = [fStation];
        for (let o = fOrder + 1; o <= tOrder; ++o) {
            pStations.push(this.getStationByOrder(o));
        }
        return pStations;
    }
}
