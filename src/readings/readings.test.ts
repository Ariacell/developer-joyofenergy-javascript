import { meters } from "../meters/meters";
import { readings } from "./readings";
import { readingsData } from "./readings.data";

describe("readings", () => {
    it("should get readings", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings(meters.METER0).length).toBeGreaterThan(0);
    });

    it("should get readings with meter id", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings(meters.METER1)[0]).toHaveProperty("time");
        expect(getReadings(meters.METER1)[0]).toHaveProperty("reading");
    });

    it("should get empty array if can't find meter id", () => {
        const { getReadings } = readings(readingsData);

        // @ts-ignore
        expect(getReadings("meter-no")).toHaveLength(0);
    });

    it("should set readings with meter id", () => {
        const { getReadings, setReadings } = readings(readingsData);

        const length = getReadings(meters.METER0).length;

        setReadings(meters.METER0, [
            { time: 923874692387, reading: 0.26785 },
            { time: 923874692387, reading: 0.26785 },
            { time: 923874692387, reading: 0.111 },
        ]);

        const newLength = getReadings(meters.METER0).length;

        expect(length + 3).toEqual(newLength);
    });

    it('should convert string readings and times to numbers', () => {
        const { getReadings, setReadings } = readings(readingsData);
        const length = getReadings(meters.METER0).length;

        setReadings(meters.METER0, [
            // @ts-ignore
            {time: '12344546', reading: '0.112485'}
        ]);

        expect(getReadings(meters.METER0)[length].reading).toEqual(0.112485)
        expect(getReadings(meters.METER0)[length].time).toEqual(12344546)
    });

});
