const isGreaterThanZero = (total) => {
    const number = total.replace("$", "");
    return Number(number) > 0;
};

function toCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

export { isGreaterThanZero, toCurrency };
