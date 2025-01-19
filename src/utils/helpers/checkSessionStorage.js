const checkSessionStorage = (key) => {
  const data = sessionStorage.getItem(`acc${key}Data`);
  if (data) return data;
  return null;
};

export default checkSessionStorage;
