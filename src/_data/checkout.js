module.exports = {
  tax: {
    rate: 0.0550,        // 8.75% as decimal for calculations
    percentage: 7.50,     // Display percentage for UI
    label: "Tax",         // Display label ("Tax", "Sales Tax", "VAT", etc.)
    enabled: true         // Enable/disable tax calculation
  },
  currency: {
    symbol: "$",          // Currency symbol for display
    code: "USD",          // Currency code
    decimals: 2           // Number of decimal places to show
  },
  orderQueue: {
    threshold: 50,        // Order threshold for payment email ("when we reach 50")
    enabled: true,        // Enable queue position display
    message: "when we reach {threshold} we will send you a payment email"
  },
  shipping: {
    enabled: false,       // Future: enable shipping calculations
    freeThreshold: 50     // Future: free shipping threshold
  },
  validation: {
    phoneRequired: true,
    addressRequired: true,
    emailRequired: true
  }
};