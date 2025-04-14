document.addEventListener("DOMContentLoaded", async () => {
    const title = document.getElementById("title");
    const form = document.getElementById("lookup");
    const tableElem = document.getElementById("table");
    const loadingContainer = document.getElementById('loading-container');

    tableElem.style.display = "none";

    const table = $("#results").DataTable({
        columns: [
            { title: "Title" },
            { title: "Author" },
            { title: "First Publish Year" },
        ],
        paging: true,
        searching: true,
        info: true,
        pageLength: 10,
    });

    const lookup = async (e) => {
        e.preventDefault();

        var loading = document.getElementById("loading-message");
        if (!loading) {
            loading = document.createElement("h2");
            loading.id = "loading-message";
            loading.textContent = "Loading...";
            loadingContainer.appendChild(loading);
        }

        tableElem.style.display = "none";

        try {
            const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title.value)}`);
            const data = await res.json();

            const rows = data.docs.map(book => [
                book.title || 'N/A',
                book.author_name?.join(', ') || 'Unknown',
                book.first_publish_year || 'N/A'
            ]);

            table.clear();
            table.rows.add(rows);
            table.draw();
        } catch (err) {
            alert(`Fetch failed: ${err.message}`);
        } finally {
            loading.remove();
            tableElem.style.display = "block";
            tableElem.style.width = "100%";
        }
    };

    form.addEventListener("submit", lookup);
});
