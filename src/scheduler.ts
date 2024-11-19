//to handle the scheduling of the sensor measurements
import { getSensorData } from "./sensor";
import { sleep } from "./sleep";

let isShuttingDown = false;

type Sensor = {
  id: number;
};

type Scan = {
  id: number;
  measurementRateInMs: number;
  sensors: Sensor[];
};

type Port = {
  id: number;
  scans: Scan[];
};

const ports: Port[] = [
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
export async function scheduleAllPorts(): Promise<void> {
  const portPromises = ports.map(async (port) => {
    for (const scan of port.scans) {
      //run scan
      await scheduleScan(port.id, scan);
      //exit if shutting down
      if (isShuttingDown) {
        return;
      }
      //i will add a little delay before next scan
      await sleep(scan.measurementRateInMs);
    }
  });
  //wait for all ports to be finished
  await Promise.all(portPromises);
  console.log("All scans finished");
}

//schedulelScan(). runs the scan of one port in order to run all ports sequentially.
export async function scheduleScan(portId: number, scan: Scan): Promise<void> {
  while (true) {
    console.log(`Starting scan ${scan.id} on port ${portId} at ${Date.now()}`);
    for (const sensor of scan.sensors) {
      await getSensorData(sensor.id, portId, scan.id);
      if (isShuttingDown) {
        console.log(
          `Stopping scan ${scan.id} on port ${portId} because of shutdown`
        );
        return;
      }
    }
    console.log(`Finished scan ${scan.id} on port ${portId}`);
    //add a delay before the next run of the same scan starts
    await sleep(scan.measurementRateInMs);
  }
}
