# Specification

## Summary
**Goal:** Create a pricing simulation website for a leather goods export business that allows users to test different pricing strategies across 5 markets and calculate profitability.

**Planned changes:**
- Create 5 market sections displaying capacity and fixed costs (Market 1: 600 units/₹0, Market 2: 800 units/₹15,00,000, Market 3: 1000 units/₹30,00,000, Market 4: 1500 units/₹50,00,000, Market 5: 1200 units/₹40,00,000)
- Add price selectors for each market with 9 price points (₹2,500 to ₹6,500 in ₹500 increments)
- Implement automatic demand lookup based on selected price using the demand table
- Calculate and display Quantity Sold (minimum of demand and capacity)
- Calculate and display Revenue (Price × Quantity Sold)
- Calculate and display Variable Cost (₹1,200 × Quantity Sold)
- Calculate and display Total Cost (Fixed Cost + Variable Cost)
- Calculate and display Profit (Revenue − Total Cost)
- Add Market 5 toggle to choose "Enter Market" or "Do Not Enter" (sets profit to ₹0 when not entering)
- Format all monetary values with Indian Rupee (₹) symbol
- Apply simple, clean design with warm earth tones (browns, tans, creams) reflecting the leather goods industry

**User-visible outcome:** Users can select prices for up to 5 export markets, see real-time calculations of demand, quantity sold, costs, revenue, and profit, and decide whether to enter Market 5 based on profitability analysis.
