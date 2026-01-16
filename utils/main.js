const isGreaterThanZero = (total) => {
    const number = total.replace("$", "");
    return Number(number) > 0;
};

function toCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

function updateByObjectID(array, ID, newObject) {
    return array.map((item) =>
        item.id === ID ? newObject : item
    );
}

export { isGreaterThanZero, toCurrency, updateByObjectID };
