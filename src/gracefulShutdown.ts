import { sleep } from "./sleep";
let isShuttingDown = false;

export const gracefulShutdown = async (): Promise<void> => {
  isShuttingDown = true;
  console.log("Graceful shutdown initiated...");
  await sleep(1000);
  console.log("All scans are finished. Time to exit...");
  process.exit(0);
};
