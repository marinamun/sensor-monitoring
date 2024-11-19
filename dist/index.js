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
const gracefulShutdown_1 = require("./gracefulShutdown");
const scheduler_1 = require("./scheduler");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Let's start the sensor measurements...");
        try {
            yield (0, scheduler_1.scheduleAllPorts)();
            console.log("All scans finished");
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
}
main();
//listen for shutdown signals
process.on("SIGINT", gracefulShutdown_1.gracefulShutdown);
process.on("SIGTERM", gracefulShutdown_1.gracefulShutdown);
