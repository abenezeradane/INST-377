document.addEventListener("DOMContentLoaded", async () => {
    const map = L.map('map').setView([37.0902, -95.7129], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    const coordinates = Array.from({ length: 3 }, () => ({
        lat: getRandomInRange(30, 35, 3),
        lng: getRandomInRange(-100, -90, 3)
    }));

    const infoContainer = document.createElement('section');
    document.querySelector('main').appendChild(infoContainer);

    for (let i = 0; i < coordinates.length; i++) {
        const { lat, lng } = coordinates[i];

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`Marker ${i + 1}`).openPopup();

        try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
            const data = await res.json();
            const locality = data.locality || data.city || data.principalSubdivision || "Unknown location";

            const info = document.createElement('p');
            info.textContent = `Marker ${i + 1}: (${lat}, ${lng}) ∴ ${locality}`;
            infoContainer.appendChild(info);
        } catch (err) {
            console.error(`Error fetching locality for marker ${i + 1}:`, err);
        }
    }
});