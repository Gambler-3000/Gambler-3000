document.addEventListener('DOMContentLoaded', () => {

    const playButton = document.getElementById('playButton');

    // --- TEST WIZUALNY ---
    // Sprawdzamy, czy skrypt znalazł przycisk w pliku HTML.
    if (playButton) {
        // Jeśli TAK: Zmień kolor przycisku na zielony i tekst na "GOTOWY!".
        playButton.style.backgroundColor = 'green';
        playButton.textContent = 'GOTOWY!';
        // Dodajemy normalną funkcję klikania.
        playButton.addEventListener('click', () => {
            alert('Przycisk działa!');
            // Tutaj w przyszłości będzie funkcja playGame()
        });
    } else {
        // Jeśli NIE: Zmień tło całej strony na czerwone, aby pokazać błąd.
        document.body.style.background = 'red';
        alert('BŁĄD: Skrypt nie znalazł przycisku z id="playButton" w pliku index.html!');
    }
    // --- KONIEC TESTU ---

    // Reszta kodu na razie jest nieaktywna, dopóki nie rozwiążemy tego problemu.
});
