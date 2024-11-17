import {sleep} from "./sleep";

export async function getSensorData(sensorId:number, portId: number, scanId: number){
    console.log(`Measurement starts at: ${Date.now()}. The port is: ${portId}. The scan id is: ${scanId}`)
    await sleep(100);
    console.log(`Measurement of sensor  ${sensorId} has ended`);

}