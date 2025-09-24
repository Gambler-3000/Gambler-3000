// Czekaj, aż cały dokument HTML zostanie wczytany i gotowy
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT REFERENCES ---
    const playButton = document.getElementById('playButton');
    const numberResultSpan = document.getElementById('numberResult');
    const gameResultH2 = document.getElementById('gameResult');
    const videoContainer = document.getElementById('video-container');
    const videoPlayer = document.getElementById('scare-video');
    const gameContainer = document.querySelector('.game-container');
    const logo = document.querySelector('.logo-top-left'); // Dodano referencję do logo

    // --- STATE VARIABLES ---
    let jumpingImages = [];
    let animationFrameId;

    // --- CORE FUNCTIONS ---
    function playGame() {
        const drawnNumber = Math.floor(Math.random() * 100) + 1;
        numberResultSpan.textContent = drawnNumber;

        if (drawnNumber === 67) {
            triggerSpecialEvent();
        } else {
            gameResultH2.textContent = 'Masiak przejebał dom, chuj mu w dupe.';
            gameResultH2.style.color = '#e74c3c';
        }
    }

    function triggerSpecialEvent() {
        // --- NOWA SEKWENCJA: WSTĘP ---
        // 1. Ukryj wszystko i zmień tło na czarne
        gameContainer.style.display = 'none';
        logo.style.display = 'none';
        document.body.style.background = 'black';

        // 2. Stwórz i wyświetl komunikat "Trafiłeś 67..."
        const preEventMessage = document.createElement('h1');
        preEventMessage.textContent = 'Trafiłeś 67...';
        preEventMessage.style.color = 'white';
        preEventMessage.style.position = 'fixed';
        preEventMessage.style.top = '50%';
        preEventMessage.style.left = '50%';
        preEventMessage.style.transform = 'translate(-50%, -50%)';
        preEventMessage.style.fontSize = '3em';
        preEventMessage.style.zIndex = '10001';
        document.body.appendChild(preEventMessage);

        // 3. Po 3 sekundach opóźnienia, przywróć stronę i zacznij główny event
        setTimeout(() => {
            // Przywróć wygląd strony
            preEventMessage.remove(); // Usuń komunikat
            document.body.style.background = 'linear-gradient(135deg, #1a2a3a, #0d1a26)'; // Przywróć tło
            gameContainer.style.display = 'block';
            logo.style.display = 'block';

            // --- GŁÓWNY EVENT (tak jak wcześniej) ---
            
            // Zmień przycisk
            gameResultH2.textContent = 'Masiak wygrywa kose! (i tak chuj mu w dupe).';
            gameResultH2.style.color = '#2ecc71';
            playButton.style.backgroundColor = 'black';
            playButton.style.color = 'red';
            playButton.textContent = 'ERROR';
            playButton.disabled = true;
            document.title = 'DIE';
            
            // Uruchom odbijające się obrazki
            const imageUrls = [
                'https://i.ibb.co/L5hY6tB/dark-smile.jpg',
                'https://i.imgflip.com/2/26am.jpg',
                'https://i.ytimg.com/vi/S51zP_ge3Lg/maxresdefault.jpg'
            ];
            for (let i = 0; i < 5; i++) {
                createJumpingImage(imageUrls[i % imageUrls.length]);
            }
            animationFrameId = requestAnimationFrame(animateJumpingImages);

            // Wyświetl alerty
            const notifications = [
                'WARNING: SYSTEM INTEGRITY COMPROMISED!',
                'DATA CORRUPTION IMMINENT.',
                'ACCESS DENIED: YOUR REALITY IS OURS.',
                'FATAL ERROR: RECALIBRATING EXISTENCE.',
                'NO ESCAPE. NO HOPE. ONLY US.'
            ];
            for (const msg of notifications) {
                alert(msg);
            }
            
            // Odtwórz wideo
            playVideoSequence();

        }, 3000); // 3000 milisekund = 3 sekundy opóźnienia
    }

    function playVideoSequence() {
        videoContainer.style.display = 'flex';
        videoContainer.classList.add('visible');
        videoPlayer.muted = true; 
        const playPromise = videoPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                videoPlayer.muted = false;
            }).catch(error => {
                console.error("Autoplay with sound was blocked by the browser:", error);
            });
        }
    }

    function endTheExperience() {
        videoContainer.style.opacity = '0';
        cancelAnimationFrame(animationFrameId);
        setTimeout(() => {
            videoContainer.style.display = 'none';
            jumpingImages.forEach(imgData => imgData.element.remove());
            jumpingImages = [];
            gameContainer.style.display = 'none';
            document.body.style.background = 'black';
        }, 1000);
    }

    function createJumpingImage(imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'jumping-image';
        let x = Math.random() * (window.innerWidth - 150);
        let y = Math.random() * (window.innerHeight - 150);
        let dx = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 3);
        let dy = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 3);
        img.style.top = `${y}px`;
        img.style.left = `${x}px`;
        document.body.appendChild(img);
        jumpingImages.push({ element: img, x: x, y: y, dx: dx, dy: dy });
    }

    function animateJumpingImages() {
        const imgWidth = 150;
        const imgHeight = 150;
        jumpingImages.forEach(imgData => {
            imgData.x += imgData.dx;
            imgData.y += imgData.dy;
            if (imgData.x + imgWidth > window.innerWidth || imgData.x < 0) {
                imgData.dx *= -1;
                if (imgData.x < 0) imgData.x = 0;
                if (imgData.x + imgWidth > window.innerWidth) imgData.x = window.innerWidth - imgWidth;
            }
            if (imgData.y + imgHeight > window.innerHeight || imgData.y < 0) {
                imgData.dy *= -1;
                if (imgData.y < 0) imgData.y = 0;
                if (imgData.y + imgHeight > window.innerHeight) imgData.y = window.innerHeight - imgHeight;
            }
            imgData.element.style.left = `${imgData.x}px`;
            imgData.element.style.top = `${imgData.y}px`;
        });
        animationFrameId = requestAnimationFrame(animateJumpingImages);
    }

    if (playButton) {
        playButton.addEventListener('click', playGame);
    }
    if (videoPlayer) {
        videoPlayer.addEventListener('ended', endTheExperience);
    }

});
