import { useState } from 'react';
import MarketSection from './MarketSection';

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

  return (
    <div className="space-y-6">
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
