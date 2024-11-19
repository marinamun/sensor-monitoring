"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleAllPorts = scheduleAllPorts;
exports.scheduleScan = scheduleScan;
//to handle the scheduling of the sensor measurements
const sensor_1 = require("./sensor");
const sleep_1 = require("./sleep");
let isShuttingDown = false;
const ports = [
    {
        id: 0,
        scans: [
            {
                id: 0,
                measurementRateInMs: 1000,
                sensors: [
                    {
                        id: 0,
                    },
                ],
            },
        ],
    },
    {
        id: 1,
        scans: [
            {
                id: 1,
                measurementRateInMs: 1000,
                sensors: [
                    {
                        id: 1,
                    },
                    {
                        id: 2,
                    },
                ],
            },
            {
                id: 2,
                measurementRateInMs: 2000,
                sensors: [
                    {
                        id: 3,
                    },
                ],
            },
        ],
    },
];
//scheduleAllPorts(). will run all ports concurrently by scheduleScan() onEach scan of those ports.
function scheduleAllPorts() {
    return __awaiter(this, void 0, void 0, function* () {
        const portPromises = ports.map((port) => __awaiter(this, void 0, void 0, function* () {
            for (const scan of port.scans) {
                //run scan
                yield scheduleScan(port.id, scan);
                //exit if shutting down
                if (isShuttingDown) {
                    return;
                }
                //i will add a little delay before next scan
                yield (0, sleep_1.sleep)(scan.measurementRateInMs);
            }
        }));
        //wait for all ports to be finished
        yield Promise.all(portPromises);
        console.log("All scans finished");
    });
}
//schedulelScan(). runs the scan of one port in order to run all ports sequentially.
function scheduleScan(portId, scan) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            console.log(`Starting scan ${scan.id} on port ${portId} at ${Date.now()}`);
            for (const sensor of scan.sensors) {
                yield (0, sensor_1.getSensorData)(sensor.id, portId, scan.id);
                if (isShuttingDown) {
                    console.log(`Stopping scan ${scan.id} on port ${portId} because of shutdown`);
                    return;
                }
            }
            console.log(`Finished scan ${scan.id} on port ${portId}`);
            //add a delay before the next run of the same scan starts
            yield (0, sleep_1.sleep)(scan.measurementRateInMs);
        }
    });
}