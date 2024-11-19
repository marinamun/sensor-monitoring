import { sleep } from "./sleep";

export async function getSensorData(
  sensorId: number,
  portId: number,
  scanId: number
) {
  console.log(
    `Measurement starts at: ${Date.now()}. Port: ${portId}, Scan: ${scanId}, Sensor: ${sensorId}`
  );
  await sleep(100);
  console.log(
    `Measurement of sensor  ${sensorId} has ended. Port: ${portId}, Scan: ${scanId}`
  );
}
