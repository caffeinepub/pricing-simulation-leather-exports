import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getDemandForPrice } from '@/utils/demandTable';
import { MARGINAL_COST_PER_UNIT } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatCurrency';

interface MarketSectionProps {
  marketNumber: number;
  capacity: number;
  fixedCost: number;
  selectedPrice: number;
  onPriceChange: (price: number) => void;
  isMarket5?: boolean;
  enterMarket?: boolean;
  onToggleEnterMarket?: (entered: boolean) => void;
}

const PRICE_OPTIONS = [2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500];

export default function MarketSection({
  marketNumber,
  capacity,
  fixedCost,
  selectedPrice,
  onPriceChange,
  isMarket5 = false,
  enterMarket = true,
  onToggleEnterMarket,
}: MarketSectionProps) {
  const demand = getDemandForPrice(selectedPrice);
  const quantitySold = Math.min(demand, capacity);
  const revenue = selectedPrice * quantitySold;
  const variableCost = MARGINAL_COST_PER_UNIT * quantitySold;
  const totalCost = fixedCost + variableCost;
  const profit = revenue - totalCost;

  const displayProfit = isMarket5 && !enterMarket ? 0 : profit;
  const isDisabled = isMarket5 && !enterMarket;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-accent/30 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Market {marketNumber}</CardTitle>
          {isMarket5 && onToggleEnterMarket && (
            <div className="flex items-center gap-3">
              <Label htmlFor="market5-toggle" className="text-sm font-medium cursor-pointer">
                {enterMarket ? 'Enter Market' : 'Do Not Enter'}
              </Label>
              <Switch
                id="market5-toggle"
                checked={enterMarket}
                onCheckedChange={onToggleEnterMarket}
              />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {/* Market Parameters */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-sm text-muted-foreground">Capacity</p>
            <p className="text-lg font-semibold">{capacity.toLocaleString('en-IN')} units</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fixed Cost</p>
            <p className="text-lg font-semibold">{formatCurrency(fixedCost)}</p>
          </div>
        </div>

        {/* Price Selection */}
        <div>
          <Label htmlFor={`price-${marketNumber}`} className="text-sm font-medium mb-2 block">
            Select Price
          </Label>
          <Select
            value={selectedPrice.toString()}
            onValueChange={(value) => onPriceChange(Number(value))}
            disabled={isDisabled}
          >
            <SelectTrigger id={`price-${marketNumber}`} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRICE_OPTIONS.map((price) => (
                <SelectItem key={price} value={price.toString()}>
                  {formatCurrency(price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calculations */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Demand</span>
            <span className="font-medium">{demand.toLocaleString('en-IN')} units</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Quantity Sold</span>
            <span className="font-medium">{quantitySold.toLocaleString('en-IN')} units</span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Revenue</span>
            <span className="font-semibold text-primary">{formatCurrency(revenue)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Variable Cost</span>
            <span className="font-medium">{formatCurrency(variableCost)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Cost</span>
            <span className="font-medium">{formatCurrency(totalCost)}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t-2 border-border">
            <span className="text-base font-semibold">Profit</span>
            <span className={`text-lg font-bold ${displayProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(displayProfit)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
