import { gracefulShutdown } from "./gracefulShutdown";
import { scheduleAllPorts } from "./scheduler";

async function main() {
  console.log("Let's start the sensor measurements...");

  try {
    await scheduleAllPorts();
    console.log("All scans finished");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();

//listen for shutdown signals
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
