const DEMAND_TABLE: Record<number, number> = {
  2500: 850,
  3000: 760,
  3500: 700,
  4000: 640,
  4500: 585,
  5000: 530,
  5500: 480,
  6000: 435,
  6500: 395,
};

export function getDemandForPrice(price: number): number {
  return DEMAND_TABLE[price] || 0;
}
