//to handle the scheduling of the sensor measurements
import { getSensorData } from "./sensor";

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
export function scheduleAllPorts(){
ports.forEach((port)=>{
    port.scans.forEach((scan)=>{
        scheduleScan(port.id,scan)
    })
})
}

//schedulelScan(). runs the scan of one port in order to run all ports sequentially.
export async function scheduleScan(portId: number, scan: Scan){
    for (const sensor of scan.sensors){
        await getSensorData(sensor.id, portId, scan.id);

    }
}