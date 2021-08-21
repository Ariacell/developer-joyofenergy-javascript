import { MeterName, meters } from "../meters/meters";
import { Reading } from "./readings";

const generateSingle: () => Reading[] = () => {
    const startTime = 1607686125; // Friday, 11 December 2020 11:28:45 GMT+00:00
    const hour = 3600;
    const readingsLength = Math.ceil(Math.random() * 20);

    return [...new Array(readingsLength)].map((reading, index) => ({
        time: startTime - index * hour,
        reading: Math.random() * 2,
    }));
};

const generateAllMeters: () => {readings: {[key in MeterName]: Reading[]}} = () => {
    const readings = {} as any;

    for (const key in meters) {
        if (meters.hasOwnProperty(key)) {
            readings[meters[key]] = generateSingle();
        }
    }

    return readings;
};

export const readingsData = generateAllMeters();
