const isGreaterThanZero = (total) => {
  const number = total.replace("$", "");
  return Number(number) > 0;
};

export { isGreaterThanZero };
