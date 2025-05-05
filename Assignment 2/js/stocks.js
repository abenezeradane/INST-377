let stockChart;

async function fetchStockData(ticker, days) {
    const apiKey = '1LJcLKU2du35l2y5UDPWnoR3dS3g8xlk';
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const format = (date) => date.toISOString().split('T')[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker.toUpperCase()}/range/1/day/${format(startDate)}/${format(endDate)}?adjusted=true&sort=asc&limit=${days}&apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.results?.map(d => ({
        date: new Date(d.t).toLocaleDateString(),
        close: d.c
    })) || [];
}

function renderChart(data, ticker) {
    const ctx = document.getElementById('stock-chart').getContext('2d');

    if (stockChart) stockChart.destroy();

    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: `${ticker.toUpperCase()} Closing Prices`,
                data: data.map(d => d.close),
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}

document.getElementById('lookup-button').addEventListener('click', async () => {
    const ticker = document.getElementById('ticker-input').value;
    const days = parseInt(document.getElementById('days-select').value, 10);

    if (!ticker) return alert('Please enter a stock ticker.');

    const stockData = await fetchStockData(ticker, days);
    if (stockData.length === 0) {
        alert('No data found for this ticker.');
        return;
    }

    renderChart(stockData, ticker);
});


document.addEventListener("DOMContentLoaded", () => {
    fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
        .then(res => res.json())
        .then(data => {
            const top5 = data.slice(0, 5);
            const tbody = document.querySelector("#stocks-table tbody");

            top5.forEach(stock => {
                const row = document.createElement("tr");

                const tickerCell = document.createElement("td");
                const link = document.createElement("a");
                link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
                link.textContent = stock.ticker;
                link.target = "_blank";
                tickerCell.appendChild(link);

                const commentsCell = document.createElement("td");
                commentsCell.textContent = stock.no_of_comments;

                const sentimentCell = document.createElement("td");
                sentimentCell.innerHTML =
                    stock.sentiment.toLowerCase() === "bullish"
                        ? "🐂 Bullish"
                        : "🐻 Bearish";

                row.appendChild(tickerCell);
                row.appendChild(commentsCell);
                row.appendChild(sentimentCell);
                tbody.appendChild(row);
            });

            $('#stocks-table').DataTable();
        })
        .catch(err => {
            console.error("Failed to load Reddit stock data:", err);
        });
});
