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
exports.getSensorData = getSensorData;
const sleep_1 = require("./sleep");
function getSensorData(sensorId, portId, scanId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Measurement starts at: ${Date.now()}. Port: ${portId}, Scan: ${scanId}, Sensor: ${sensorId}`);
        yield (0, sleep_1.sleep)(100);
        console.log(`Measurement of sensor  ${sensorId} has ended. Port: ${portId}, Scan: ${scanId}`);
    });
}
