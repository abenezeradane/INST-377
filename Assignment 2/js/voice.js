if (typeof annyang !== 'undefined' && annyang) {
    annyang.debug(true);

    const commands = {
        '*input': (input) => {
            const lower = input.toLowerCase().trim();
            console.log('Recognized input:', lower);

            if (lower.startsWith('hello')) {
                alert('Hello World!');
            } else if (lower.startsWith('change the color to')) {
                const color = lower.replace('change the color to', '').trim();
                document.body.style.backgroundColor = color;

            } else if (lower.startsWith('navigate to')) {
                const page = lower.replace('navigate to', '').trim();
                if (page.includes('home')) window.location.href = 'index.html';
                else if (page.includes('stock')) window.location.href = 'stocks.html';
                else if (page.includes('dog')) window.location.href = 'dogs.html';
                else alert(`Unknown page: ${page}`);

            } else if (lower.startsWith('lookup') || lower.startsWith('look up')) {
                const ticker = lower.replace(/look ?up/i, '').trim().replace(/[^\w]/g, '').toUpperCase();
                const tickerInput = document.querySelector('#ticker-input');
                const button = document.querySelector('#lookup-button');

                if (tickerInput && button) {
                    tickerInput.value = ticker;
                    button.click();
                } else {
                    console.warn('Ticker input or button not found on this page.');
                }
            } else if (lower.startsWith('load dog breed')) {
                const spokenBreed = lower
                    .replace('load dog breed', '')
                    .replace(/[^\w\s-]/g, '')
                    .trim()
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');


                const buttons = document.querySelectorAll('#breed-buttons button');
                let matched = false;

                buttons.forEach(btn => {
                    if (btn.textContent.trim().toLowerCase() === spokenBreed.trim().toLowerCase()) {
                        btn.click();
                        matched = true;
                    }
                });

                if (!matched) {
                    alert(`Could not find breed: ${spokenBreed}`);
                }
            }
        }
    };

    annyang.addCommands(commands);
    annyang.setLanguage('en-US');
    annyang.start({ autoRestart: true, continuous: true });

    window.voiceControl = {
        start: () => annyang.start({ autoRestart: true, continuous: true }),
        stop: () => annyang.abort(),
        addCommands: (more) => annyang.addCommands(more)
    };
}