const normalizeExtras = (prices) => {
  return {
    extras: {
      bbq: {
        isAvailable: prices["מנגל"] > 0, // Convert to boolean
        price: Number(prices["מנגל"]) || 0,
      },
      extraLinen: {
        isAvailable: prices["סט מצעים"] > 0,
        price: Number(prices["סט מצעים"]) || 0,
      },
      tent: {
        isAvailable: prices["אוהל"] > 0,
        price: Number(prices["אוהל"]) || 0,
      },
      extraGas: {
        isAvailable: prices["בלון גז"] > 0,
        price: Number(prices["בלון גז"]) || 0,
      },
      picnicSet: {
        isAvailable: prices["סט פיקניק"] > 0,
        price: Number(prices["סט פיקניק"]) || 0,
      },
      cleaningService: {
        isAvailable: prices["שירותי ניקיון"] > 0,
        price: Number(prices["שירותי ניקיון"]) || 0,
      },
    },
  };
};
export default normalizeExtras;
