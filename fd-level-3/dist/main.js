/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _train__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./train */ "./train.ts");

window["train"] = new _train__WEBPACK_IMPORTED_MODULE_0__["Train"]();


/***/ }),

/***/ "./station-index.ts":
/*!**************************!*\
  !*** ./station-index.ts ***!
  \**************************/
/*! exports provided: StationIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StationIndex", function() { return StationIndex; });
class StationIndex {
    constructor() {
        // order
        this.orderStation = new Map();
        // name
        this.nameStation = new Map();
    }
    //
    build(stations) {
        for (const s of stations) {
            this.orderStation.set(s.order, s);
            this.nameStation.set(s.name, s);
        }
    }
    getStationByOrder(o) {
        return this.orderStation.get(+o);
    }
    getStationByName(n) {
        return this.nameStation.get(n);
    }
    getStationByOrderOrName(...ks) {
        return ks.map(k => {
            return this.getStationByOrder(k) || this.getStationByName(k);
        });
    }
    /**
     * 查询两个站点之间要经过的站
     * // todo: 需要缓存各个站点之间的数据?
     */
    queryStationsFromTo(from, to) {
        const [fStation, tStation] = this.getStationByOrderOrName(from, to);
        if (!fStation || !tStation) {
            return null;
        }
        const fOrder = fStation.order;
        const tOrder = tStation.order;
        if (fOrder >= tOrder) {
            return null;
        }
        let pStations = [fStation];
        for (let o = fOrder + 1; o <= tOrder; ++o) {
            pStations.push(this.getStationByOrder(o));
        }
        return pStations;
    }
}


/***/ }),

/***/ "./station.ts":
/*!********************!*\
  !*** ./station.ts ***!
  \********************/
/*! exports provided: Station */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Station", function() { return Station; });
// 站序 站名 到站时间 出发时间 停留时间
// 01 北京南 ---- 08:35 ----
// 02 德州东 09:48 09:50 2分钟
class Station {
    constructor(sInfo, sumIdleSeat) {
        const sArr = sInfo.split(/\t| /);
        this.order = +sArr[0];
        this.name = sArr[1];
        // inT;outT;stayT
        this.seatStatus = Array.from({ length: sumIdleSeat }, () => true);
    }
    book(i) {
        if (i < 0 || i > this.seatStatus.length) {
            throw new RangeError("seat no. error");
        }
        if (!this.seatStatus[i]) {
            throw new Error("seat has been booked");
        }
        this.seatStatus[i] = false;
    }
    cancle(i) {
        if (i < 0 || i > this.seatStatus.length) {
            throw new RangeError("seat no error");
        }
        this.seatStatus[i] = true;
    }
}


/***/ }),

/***/ "./ticket-index.ts":
/*!*************************!*\
  !*** ./ticket-index.ts ***!
  \*************************/
/*! exports provided: TicketIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketIndex", function() { return TicketIndex; });
class TicketIndex {
    constructor() {
        this.seqNoMap = new Map();
    }
    getBySeqNo(seqNo) {
        return this.seqNoMap.get(seqNo) || null;
    }
    build(ticket) {
        this.seqNoMap.set(ticket.seqNo, ticket);
    }
}


/***/ }),

/***/ "./tickt.ts":
/*!******************!*\
  !*** ./tickt.ts ***!
  \******************/
/*! exports provided: Ticket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ticket", function() { return Ticket; });
class Ticket {
    constructor(seqNo, seat, from, to, status = "OK") {
        this.seqNo = seqNo;
        this.seat = seat;
        this.from = from;
        this.to = to;
        this.status = status;
    }
    toJSON() {
        return {
            seqNo: this.seqNo,
            seat: this.seat,
            from: this.from,
            to: this.to,
            status: this.status
        };
    }
}


/***/ }),

/***/ "./train.ts":
/*!******************!*\
  !*** ./train.ts ***!
  \******************/
/*! exports provided: Train */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Train", function() { return Train; });
/* harmony import */ var _station__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./station */ "./station.ts");
/* harmony import */ var _station_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./station-index */ "./station-index.ts");
/* harmony import */ var _tickt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tickt */ "./tickt.ts");
/* harmony import */ var _ticket_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ticket-index */ "./ticket-index.ts");




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
class Train {
    constructor() {
        this.seqNO = 1;
        this.stationIndex = new _station_index__WEBPACK_IMPORTED_MODULE_1__["StationIndex"]();
        this.ticketIndex = new _ticket_index__WEBPACK_IMPORTED_MODULE_3__["TicketIndex"]();
    }
    init(data) {
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
        for (let i = this.stations.length; --i >= 0;) {
            this.stations[i] = new _station__WEBPACK_IMPORTED_MODULE_0__["Station"](stationsInfo[i], this.seatNum);
        }
        // build index
        this.stationIndex.build(this.stations);
    }
    query(from, to) {
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
    book(from, to) {
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
        const ticket = new _tickt__WEBPACK_IMPORTED_MODULE_2__["Ticket"](this.seqNO++, seat, pStations[0].order, pStations[pStations.length - 1].order);
        this.ticketIndex.build(ticket);
        return ticket.toJSON();
    }
    /**
     * @returns {json|null} ticket json
     */
    queryTicket(seqNo) {
        return this.ticketIndex.getBySeqNo(seqNo);
    }
    cancel(seqNo) {
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
    batchOrder(orders, delay, doneFn) {
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
        let ts = [];
        let fn = () => {
            if (i < len) {
                const o = orderAndGap[i++].order;
                let t = this.book(o[0], o[1]);
                if (t !== null) {
                    ts.push(t);
                }
                setTimeout(fn, delay);
            }
            else {
                doneFn(ts);
            }
        };
        setTimeout(fn, delay);
    }
    queryIdleSeatByStations(pStations) {
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map