import { MeterName } from "../meters/meters";

export interface Reading {
    time: any;
    reading: number;
}

type ReadingsObj = (data: any) => {
    getReadings: (meter: MeterName) => Reading[] | [],
    setReadings: (meterId: MeterName, readings: Reading[]) => Reading[]
}

export const readings: ReadingsObj = (data) => ({
    getReadings: (meterId) => data[meterId] || [],
    setReadings: (meterId, readings) => {
        const currentReadings = data[meterId];
        const sanitisedReadings = readings.map(reading => ({time: Number(reading.time), reading: Number(reading.reading)}));
        data[meterId] = [...currentReadings, ...sanitisedReadings];
        return data[meterId];
    },
});
