/**
 * Call another function sometime in the future, by using `setTimeout` 0.
 * This is typically used to allow the calling function to complete it's cleanup
 * before firing callback methods.
 */
export function callFuture(func, ...args) {
  if (!func) return;
  if (args === undefined) args = {};
  setTimeout(() => {
    func(...args);
  }, 0);
}
