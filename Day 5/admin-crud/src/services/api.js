// Simulated API call — 80% success, 20% fail (for demo)
export const simulateApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.2);
    }, 700);
  });
};