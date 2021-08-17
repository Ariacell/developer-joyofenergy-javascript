export const read = (getData, req) => {
    const meter = req.params.smartMeterId;
    return getData(meter);
};

export const store = (setData, req) => {
    const data = req.body;
    return setData(data.smartMeterId, data.electricityReadings);
};
