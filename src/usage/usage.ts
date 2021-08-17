export const average = (readings) => {
    return (
        readings.reduce((prev, next) => prev + next.reading, 0) /
        readings.length
    );
};

export const timeElapsedInHours = (readings) => {
    readings.sort((a, b) => a.time - b.time);
    const seconds = readings[readings.length - 1].time - readings[0].time;
    const hours = Math.floor(seconds / 3600);
    return hours;
};

export const usage = (readings) => {
    return average(readings) / timeElapsedInHours(readings);
};

export const usageCost = (readings, rate) => {
    return usage(readings) * rate;
};

export const usageForAllPricePlans = (pricePlans, readings) => {
    return Object.entries(pricePlans).map(([key, value]) => {
        return {
            // @ts-ignore
            [key]: usageCost(readings, value.rate),
        };
    });
};
