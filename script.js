const playButton = document.getElementById('playButton');
const numberResultSpan = document.getElementById('numberResult');
const gameResultH2 = document.getElementById('gameResult');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('scare-video');
const originalTitle = document.title;

let jumpingImages = [];
let animationFrameId;

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
    gameResultH2.textContent = 'Masiak wygrywa kose! (i tak chuj mu w dupe).';
    gameResultH2.style.color = '#2ecc71';
    playButton.style.backgroundColor = 'black';
    playButton.style.color = 'red';
    playButton.textContent = 'ERROR';
    playButton.disabled = true;
    document.title = 'DIE';

    videoContainer.style.display = 'flex';
    videoContainer.classList.add('visible');

    videoPlayer.muted = true; 
    const playPromise = videoPlayer.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            videoPlayer.muted = false;
        }).catch(error => {
            console.error("Autoplay z dźwiękiem został zablokowany przez przeglądarkę:", error);
        });
    }

    const imageUrls = [
        'https://i.ibb.co/L5hY6tB/dark-smile.jpg',
        'https://i.imgflip.com/2/26am.jpg',
        'https://i.ytimg.com/vi/S51zP_ge3Lg/maxresdefault.jpg'
    ];

    for (let i = 0; i < 5; i++) {
        createJumpingImage(imageUrls[i % imageUrls.length]);
    }
    
    animationFrameId = requestAnimationFrame(animateJumpingImages);

    const notifications = [
        'WARNING: SYSTEM INTEGRITY COMPROMISED!',
        'DATA CORRUPTION IMMINENT.',
        'ACCESS DENIED: YOUR REALITY IS OURS.',
        'FATAL ERROR: RECALIBRATING EXISTENCE.',
        'NO ESCAPE. NO HOPE. ONLY US.'
    ];

    notifications.forEach((msg, index) => {
        setTimeout(() => {
            alert(msg);
        }, 2000 + index * 3000);
    });
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

// --- NOWY KOD: NASŁUCHIWANIE NA KONIEC WIDEO ---
videoPlayer.addEventListener('ended', () => {
    // Ta funkcja zostanie wywołana, gdy wideo się skończy
    window.close();
});

playButton.addEventListener('click', playGame);
