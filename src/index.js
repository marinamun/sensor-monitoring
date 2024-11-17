"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("./scheduler");
console.log("Let's start the sensor measurements...");
(0, scheduler_1.scheduleAllPorts)();
