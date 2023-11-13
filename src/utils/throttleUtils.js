import _ from "lodash";

const createThrottler = (callback, delay = 100) => {
  return _.throttle(callback, delay);
};

export default createThrottler;
