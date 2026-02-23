export const formatEuro = (cents: number): string => `€${(cents / 100).toFixed(2)}`;
