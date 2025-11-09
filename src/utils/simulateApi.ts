export function simulateApi<T>(
  result: T,
  failRate = 0.05,
  delay = 250
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate)
        reject(new Error("Simulated network error"));
      else resolve(result);
    }, delay + Math.random() * 300);
  });
}
