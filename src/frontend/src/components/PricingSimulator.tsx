import { useState, useMemo } from 'react';
import MarketSection from './MarketSection';
import { getDemandForPrice } from '@/utils/demandTable';
import { MARGINAL_COST_PER_UNIT } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatCurrency';

interface MarketConfig {
  marketNumber: number;
  capacity: number;
  fixedCost: number;
}

const MARKET_CONFIGS: MarketConfig[] = [
  { marketNumber: 1, capacity: 600, fixedCost: 0 },
  { marketNumber: 2, capacity: 800, fixedCost: 1500000 },
  { marketNumber: 3, capacity: 1000, fixedCost: 3000000 },
  { marketNumber: 4, capacity: 1500, fixedCost: 5000000 },
  { marketNumber: 5, capacity: 1200, fixedCost: 4000000 },
];

export default function PricingSimulator() {
  const [prices, setPrices] = useState<Record<number, number>>({
    1: 2500,
    2: 2500,
    3: 2500,
    4: 2500,
    5: 2500,
  });
  
  const [market5Entered, setMarket5Entered] = useState(true);

  const handlePriceChange = (marketNumber: number, price: number) => {
    setPrices(prev => ({ ...prev, [marketNumber]: price }));
  };

  const handleMarket5Toggle = (entered: boolean) => {
    setMarket5Entered(entered);
  };

  // Calculate total profit across all markets
  const totalProfit = useMemo(() => {
    let total = 0;
    
    MARKET_CONFIGS.forEach((config) => {
      const selectedPrice = prices[config.marketNumber];
      const demand = getDemandForPrice(selectedPrice);
      const quantitySold = Math.min(demand, config.capacity);
      const revenue = selectedPrice * quantitySold;
      const variableCost = MARGINAL_COST_PER_UNIT * quantitySold;
      const totalCost = config.fixedCost + variableCost;
      const profit = revenue - totalCost;
      
      // Market 5 profit is 0 if not entered
      if (config.marketNumber === 5 && !market5Entered) {
        total += 0;
      } else {
        total += profit;
      }
    });
    
    return total;
  }, [prices, market5Entered]);

  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg p-8 border border-amber-200 dark:border-amber-800 shadow-sm">
        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">
          Introduction
        </h2>
        <div className="space-y-4 text-foreground/90 leading-relaxed">
          <p>
            You are the owner of an Indian leather manufacturing and export company producing premium leather shoes and belts. Your company operates in five different export markets, each with different cost structures and production capacities.
          </p>
          <p>
            In every market, you must choose a selling price. Demand depends on the price you select, and production is subject to capacity constraints. Some markets involve fixed operating costs, while others do not. In one market, you also have the option to enter or stay out.
          </p>
          <p>
            Your objective is to maximize total profit across all five markets. The goal is not to sell the highest quantity, but to carefully balance price, demand, cost, and capacity to achieve the highest overall profitability.
          </p>
          <p className="font-semibold text-amber-900 dark:text-amber-100">
            Make your pricing decisions strategically and observe how they impact revenue, cost, and profit in each market.
          </p>
        </div>
      </div>

      {/* Total Profit Display */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-lg p-6 border-2 border-emerald-300 dark:border-emerald-700 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
            Total Profit Across All Markets
          </h3>
          <div className={`text-3xl font-bold ${totalProfit >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
            {formatCurrency(totalProfit)}
          </div>
        </div>
      </div>

      {/* Market Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MARKET_CONFIGS.map((config) => (
          <MarketSection
            key={config.marketNumber}
            marketNumber={config.marketNumber}
            capacity={config.capacity}
            fixedCost={config.fixedCost}
            selectedPrice={prices[config.marketNumber]}
            onPriceChange={(price) => handlePriceChange(config.marketNumber, price)}
            isMarket5={config.marketNumber === 5}
            enterMarket={config.marketNumber === 5 ? market5Entered : undefined}
            onToggleEnterMarket={config.marketNumber === 5 ? handleMarket5Toggle : undefined}
          />
        ))}
      </div>
    </div>
  );
}
