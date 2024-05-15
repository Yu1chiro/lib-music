document.querySelectorAll('.filter-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        var selectedCategory = this.getAttribute('data-category');
        var musicCards = document.querySelectorAll('.music-card');

        var firstVisibleCard = null;
        var categoriesToHighlight = ['eng', 'japan', 'lofi'];

        musicCards.forEach(function(card) {
            if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                card.style.display = 'block';
                if (!firstVisibleCard && categoriesToHighlight.includes(card.getAttribute('data-category'))) {
                    firstVisibleCard = card;
                }
            } else {
                card.style.display = 'none';
            }
        });

        if (firstVisibleCard) {
            firstVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstVisibleCard.classList.add('highlight');
            setTimeout(function() {
                firstVisibleCard.classList.remove('highlight');
            }, 1000); 
        }

        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});

const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        box-shadow: 0 0 10px 5px aqua;
    }
`;
document.head.appendChild(style);

// ============
document.addEventListener("DOMContentLoaded", function () {
    const audioPlayers = document.querySelectorAll('.audio-player');
    const playPauseButtons = document.querySelectorAll('.play-pause');
    const volumeControls = document.querySelectorAll('.volume-control');
    const durationDisplays = document.querySelectorAll('.duration');

    playPauseButtons.forEach(function(button, index) {
        button.addEventListener('click', function () {
            const audioPlayer = audioPlayers[index];
            if (audioPlayer.paused) {
                pauseAllPlayers();
                audioPlayer.play();
                button.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audioPlayer.pause();
                button.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });

    audioPlayers.forEach(function(audioPlayer, index) {
        const durationDisplay = durationDisplays[index];
        
        audioPlayer.addEventListener('timeupdate', function () {
            const minutes = Math.floor(audioPlayer.currentTime / 60);
            const seconds = Math.floor(audioPlayer.currentTime % 60);
            durationDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        });

        audioPlayer.addEventListener('loadedmetadata', function () {
            const totalMinutes = Math.floor(audioPlayer.duration / 60);
            const totalSeconds = Math.floor(audioPlayer.duration % 60);
            durationDisplay.textContent = `0:00 / ${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
        });

        audioPlayer.addEventListener('ended', function () {
            playPauseButtons[index].innerHTML = '<i class="fas fa-play"></i>';
        });
    });

    volumeControls.forEach(function(volumeControl, index) {
        volumeControl.addEventListener('input', function () {
            const audioPlayer = audioPlayers[index];
            const volume = volumeControl.value;
            audioPlayer.volume = volume > 1 ? 1 : volume;
        });
    });

    function pauseAllPlayers() {
        audioPlayers.forEach(function(audioPlayer, index) {
            audioPlayer.pause();
            playPauseButtons[index].innerHTML = '<i class="fas fa-play"></i>';
        });
    }
});
