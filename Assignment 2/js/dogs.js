document.addEventListener('DOMContentLoaded', () => {
    fetch('https://dog.ceo/api/breeds/image/random/10')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            data.message.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = 'Cute dog';
                carousel.appendChild(img);
            });

            window.simpleslider.getSlider({
                container: carousel,
                delay: 3
            });
        })
        .catch(err => {
            console.error('Failed to load dog images:', err);
        });

    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(breeds => {
            const container = document.getElementById('breed-buttons');

            breeds.forEach(breed => {
                const button = document.createElement('button');
                button.textContent = breed.name;

                button.dataset.description = breed.temperament || 'No description available';
                button.dataset.life = breed.life_span || 'N/A';

                button.addEventListener('click', () => {
                    document.getElementById('breed-name').textContent = breed.name;
                    document.getElementById('breed-description').textContent = button.dataset.description;
                    document.getElementById('breed-lifespan').textContent = button.dataset.life;
                    document.getElementById('breed-info').style.display = 'block';
                });

                container.appendChild(button);
            });
        })
        .catch(err => console.error('Failed to load breeds:', err));

});
