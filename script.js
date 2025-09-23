const playButton = document.getElementById('playButton');
const numberResultSpan = document.getElementById('numberResult');
const gameResultH2 = document.getElementById('gameResult');

function playGame() {
    const drawnNumber = Math.floor(Math.random() * 100) + 1;

    numberResultSpan.textContent = drawnNumber;

    if (drawnNumber === 67) {
        gameResultH2.textContent = 'Masiak wygrywa kose! (i tak chuj mu w dupe).';
        gameResultH2.style.color = '#2ecc71';
    } else {
        gameResultH2.textContent = 'Masiak przejebał dom, chuj mu w dupe.';
        gameResultH2.style.color = '#e74c3c';
    }
}

playButton.addEventListener('click', playGame);
