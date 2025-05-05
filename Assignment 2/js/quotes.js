document.addEventListener("DOMContentLoaded", () => {
    fetch('https://zenquotes.io/api/random')
        .then(response => response.json())
        .then(data => {
            const quote = data[0];
            document.getElementById('quote-text').innerText = `"${quote.q}"`;
            document.getElementById('quote-author').innerText = `— ${quote.a}`;
        })
        .catch(error => {
            document.getElementById('quote-text').innerText = "Could not load quote.";
            console.error("Error fetching quote:", error);
        });
});
