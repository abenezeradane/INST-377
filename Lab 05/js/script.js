document.addEventListener("DOMContentLoaded", () => {
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const amountInput = document.getElementById("amount");
    const result = document.querySelector("#conversion > div > span");
    const form = document.getElementById("conversion");

    const populateCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.dev/v1/currencies");
            const currencies = await res.json();
            Object.entries(currencies).forEach(([code, name]) => {
                [from, to].forEach(select => {
                    const option = new Option(name, code);
                    select.appendChild(option);
                });
            });
        } catch (err) {
            alert(`Failed to load currencies: ${err.message}`);
        }
    };

    const convertCurrency = async (e) => {
        e.preventDefault();
        const amount = parseFloat(amountInput.value);
        const fromCurrency = from.value;
        const toCurrency = to.value;

        if (!amount || amount <= 0) {
            return alert("Enter a valid positive amount.");
        }
        if (fromCurrency === toCurrency) {
            return alert("Select two different currencies.");
        }

        try {
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const { rates } = await res.json();
            result.textContent = `${amount} ${fromCurrency} = ${rates[toCurrency].toFixed(2)} ${toCurrency}`;
        } catch (err) {
            alert(`Conversion failed: ${err.message}`);
        }
    };

    populateCurrencies();
    form.addEventListener("submit", convertCurrency);
});