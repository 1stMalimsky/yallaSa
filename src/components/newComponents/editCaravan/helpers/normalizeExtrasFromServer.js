const normalizeExtrasFromServer = (extras) => {
  const normalizedExtras = {
    מנגל: extras.bbq.price || 0,
    "סט מצעים": extras.extraLinen.price || 0,
    אוהל: extras.tent.price || 0,
    "בלון גז": extras.extraGas.price || 0,
    "סט פיקניק": extras.picnicSet.price || 0,
    "שירותי ניקיון": extras.cleaningService.price || 0,
  };

  return normalizedExtras;
};

export default normalizeExtrasFromServer;
