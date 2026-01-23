// Named exports make tree-shaking straightforward for bundlers.
export const sum = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// This function is intentionally unused to show tree shaking in production builds.
export const unusedHeavyCalculation = () => {
  let total = 0;
  for (let i = 0; i < 10000; i += 1) {
    total += Math.sqrt(i);
  }
  return total;
};
