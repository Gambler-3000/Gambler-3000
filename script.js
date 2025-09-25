document.addEventListener('DOMContentLoaded', () => {

    const playButton = document.getElementById('playButton');
    const numberResultSpan = document.getElementById('numberResult');
    const gameResultH2 = document.getElementById('gameResult');
    const videoContainer = document.getElementById('video-container');
    const videoPlayer = document.getElementById('scare-video');
    const gameContainer = document.querySelector('.game-container');
    const logo = document.querySelector('.logo-top-left');

    let jumpingImages = [];
    let animationFrameId = null;

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
        gameContainer.classList.add('hidden');
        logo.classList.add('hidden');
        document.body.style.background = 'black';

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

        setTimeout(() => {
            preEventMessage.remove();
            document.body.style.background = '';
            gameContainer.classList.remove('hidden');
            logo.classList.remove('hidden');
            
            startMainEvent();

        }, 3000); 
    }

    function startMainEvent() {
        // 1. Zmień wygląd przycisku i natychmiast uruchom obrazki
        gameResultH2.textContent = 'Masiak wygrywa kose! (i tak chuj mu w dupe).';
        gameResultH2.style.color = '#2ecc71';
        playButton.style.backgroundColor = 'black';
        playButton.style.color = 'red';
        playButton.textContent = 'ERROR';
        playButton.disabled = true;
        document.title = 'DIE';
        
        const imageUrls = [
            'https://i.ibb.co/L5hY6tB/dark-smile.jpg',
            'https://i.imgflip.com/2/26am.jpg',
            'https://i.ytimg.com/vi/S51zP_ge3Lg/maxresdefault.jpg'
        ];
        for (let i = 0; i < 5; i++) {
            createJumpingImage(imageUrls[i % imageUrls.length]);
        }
        animateJumpingImages();

        // 2. Zaczekaj 5 sekund, pozwalając obrazkom skakać
        setTimeout(() => {
            // 3. Dopiero po 5 sekundach pokaż alerty i wideo
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
            playVideoSequence();
        }, 5000); // ZMIENIONO CZAS NA 5000 milisekund (5 sekund)
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
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        setTimeout(() => {
            videoContainer.style.display = 'none';
            jumpingImages.forEach(imgData => imgData.element.remove());
            jumpingImages = [];
            gameContainer.classList.add('hidden');
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
        jumpingImages.forEach(imgData => {
            imgData.x += imgData.dx;
            imgData.y += imgData.dy;
            if (imgData.x + 150 > window.innerWidth || imgData.x < 0) imgData.dx *= -1;
            if (imgData.y + 150 > window.innerHeight || imgData.y < 0) imgData.dy *= -1;
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
