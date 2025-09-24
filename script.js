const playButton = document.getElementById('playButton');
const numberResultSpan = document.getElementById('numberResult');
const gameResultH2 = document.getElementById('gameResult');
const originalTitle = document.title; // Zapisujemy oryginalny tytuł strony

function playGame() {
    // Losowanie liczby od 1 do 100
    const drawnNumber = Math.floor(Math.random() * 100) + 1;

    numberResultSpan.textContent = drawnNumber;

    // Sprawdzamy, czy wylosowana liczba to 67
    if (drawnNumber === 67) {
        // Jeśli tak, uruchamiamy specjalne wydarzenie
        triggerSpecialEvent();
    } else {
        // Jeśli nie, pokazujemy standardowy wynik
        gameResultH2.textContent = 'Masiak przejebał dom, chuj mu w dupe.';
        gameResultH2.style.color = '#e74c3c';
    }
}

// Funkcja, która uruchamia cały "event"
function triggerSpecialEvent() {
    // Komunikat o wygranej (jeszcze przed chaosem)
    gameResultH2.textContent = 'Masiak wygrywa kose! (i tak chuj mu w dupe).';
    gameResultH2.style.color = '#2ecc71';

    // Zmieniamy przycisk i go wyłączamy
    playButton.style.backgroundColor = 'black';
    playButton.style.color = 'red';
    playButton.textContent = 'ERROR';
    playButton.disabled = true;

    // Zmieniamy tytuł strony
    document.title = 'SYSTEM BREACHED';

    // Tablica z dziwnymi zdjęciami (możesz podmienić linki na własne)
    const imageUrls = [
        'https://i.imgflip.com/2/26am.jpg', // Cursed cat
        'https://i.ytimg.com/vi/S51zP_ge3Lg/maxresdefault.jpg', // Momo
        'https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg' // Trollface
    ];

    // Pętla do tworzenia skaczących obrazków w losowych miejscach
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createJumpingImage(imageUrls[i % imageUrls.length]);
        }, i * 300); // Obrazki pojawiają się co 300ms
    }
    
    // Lista powiadomień po angielsku
    const notifications = [
        'WARNING: Unsafe connection detected!',
        'Your data is being compromised.',
        'Kernel panic: unable to find process 1.',
        'FATAL_ERROR: 0xDEADBEEF',
        'Goodbye.'
    ];

    // Pętla do wyświetlania alertów z opóźnieniem
    notifications.forEach((msg, index) => {
        setTimeout(() => {
            alert(msg);
        }, 1000 + index * 2000); // Alerty co 2 sekundy, zaczynając po 1s
    });

    // Uruchomienie wideo na samym końcu
    const totalEventTime = 1000 + (notifications.length) * 2000;
    setTimeout(showVideo, totalEventTime);
}

// Funkcja do tworzenia pojedynczego "skaczącego" obrazka
function createJumpingImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'jumping-image';

    // Losowa pozycja na ekranie
    const top = Math.random() * (window.innerHeight - 150);
    const left = Math.random() * (window.innerWidth - 150);

    img.style.top = `${top}px`;
    img.style.left = `${left}px`;
    
    document.body.appendChild(img);

    // Usuwamy obrazek po 1.5 sekundach, żeby nie zaśmiecać strony
    setTimeout(() => {
        img.remove();
    }, 1500);
}

// Funkcja do pokazania kontenera z wideo z YouTube
function showVideo() {
    const videoContainer = document.getElementById('video-container');
    
    // Usuwamy wszystkie skaczące obrazki, które mogły zostać
    document.querySelectorAll('.jumping-image').forEach(el => el.remove());

    // Po prostu pokazujemy kontener. Resztą zajmie się YouTube.
    if (videoContainer) {
        videoContainer.style.display = 'flex';
    }
}

playButton.addEventListener('click', playGame);
