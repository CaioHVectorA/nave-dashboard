export function generateScale(number: number): number {
    if (number <= 0) return 24;
  
    let interval = Math.ceil(number / 42);
    return interval * 24;
  }