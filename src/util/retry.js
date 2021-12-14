/**
 * Retries the current call until it completes without error
 * @param cb
 * @param limit
 */
const retry = async (cb, {limit = 10, retryOn, retryInterval = 1}, _attempt = 0) => {
  try {
    const res = await cb();
    return res;
  } catch (e) {
    if (_attempt > limit) {
      throw Error(`Retry exceeded limit: ${e.message}`);
    }
    if (e === retryOn) {
      setTimeout(() => (retry(cb, {limit, retryOn, retryInterval}, _attempt + 1)), retryInterval);
    }
  }
};

const exports = { retry };

export default exports;
