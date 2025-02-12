export function sortByStringProperty<T>(
  array: T[],
  property: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const valueA = String(a[property]).toLowerCase();
    const valueB = String(b[property]).toLowerCase();

    if (direction === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
}

export function formatNumber(value: number | string): number {
  return +(Math.ceil(+value * 100) / 100).toFixed(2);
}
