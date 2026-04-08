export const formatCoins = (amount) => {
  const gold = 0;
  const silver = Math.floor(amount / 100);
  const copper = amount % 100;
  return { gold, silver, copper };
};
