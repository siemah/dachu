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
      console.log(`reason of failling is: `, resultItem.reason)
      errors.push(resultItem.reason);
    } else {
      resultValues.push(resultItem.value);
    }
  });

  if (errors.length) {
    // Aggregate all errors into one
    console.log(JSON.stringify(errors, null, 2));
  }

  return resultValues;
}