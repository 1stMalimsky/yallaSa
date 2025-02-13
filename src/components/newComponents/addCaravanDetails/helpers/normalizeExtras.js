const normalizeExtras = (prices) => {
  console.log("prceis received", prices);

  return {
    extras: {
      bbq: {
        isAvailable: prices["מנגל"]?.price > 0 || false,
        price: Number(prices["מנגל"]?.price || 0),
      },
      extraLinen: {
        isAvailable: prices["סט מצעים"]?.price > 0 || false,
        price: Number(prices["סט מצעים"]?.price) || 0,
      },
      tent: {
        isAvailable: prices["אוהל"]?.price > 0 || false,
        price: Number(prices["אוהל"]?.price) || 0,
      },
      extraGas: {
        isAvailable: prices["בלון גז"]?.price > 0 || false,
        price: Number(prices["בלון גז"]?.price) || 0,
      },
      picnicSet: {
        isAvailable: prices["סט פיקניק"]?.price > 0 || false,
        price: Number(prices["סט פיקניק"]?.price) || 0,
      },
      cleaningService: {
        isAvailable: prices["שירותי ניקיון"]?.price > 0 || false,
        price: Number(prices["שירותי ניקיון"]?.price) || 0,
      },
    },
  };
};
export default normalizeExtras;
