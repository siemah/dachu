/**
 * Handle results of a Promise.allSettled
 * 
 * @param results setteled results list of a given promises
 * @returns values list returned by promises
 */
export function handleAllSettledResults<T = any>(results: PromiseSettledResult<T>[]) {
  let errors: PromiseRejectedResult[] = [];
  let resultValues: T[] = [];

  results.forEach(resultItem => {
    if (resultItem.status === "rejected") {
      errors.push(resultItem.reason);
    } else {
      resultValues.push(resultItem.value);
    }
  });

  if (errors.length) {
    // Aggregate all errors into one
    throw new Error(JSON.stringify(errors, null, 2));
  }

  return resultValues;
}