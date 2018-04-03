import CircularJSON from 'circular-json';

const storage = {
  get: (key) => {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return undefined;
      }
      return CircularJSON.parse(serialized);
    } catch (err) {
      return undefined;
    }
  },
  set: (key, value) => {
    try {
      const serialized = CircularJSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  },
  remove: (key) => {
    try{
      localStorage.removeItem(key);
    }catch(err){
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
    }
  }
};

function censor(censor) {
  let i = 0;

  return function (key, value) {
    if (i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
      return '[Circular]';

    if (i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;
  };
}

export default storage;
