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

// ============ Play
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
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                playPauseButtons[index].innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
});

// ====================
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download');
    const form = document.getElementById('use-form');
    const modal = document.querySelector('[data-modal-hide="default-modal"]');
    const telegramBotToken = '7075863316:AAHLnGt1Y6UKKpF3UhQVeWpCMUoICjuwAl0';
    const telegramChatId = '1207734967';
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            form.dataset.audio = button.getAttribute('data-audio'); // Store the audio file in the form
            form.style.display = 'block';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const audioFile = form.dataset.audio;
        const audioFileName = audioFile.split('/').pop();

        const message = `Name: ${name}\nEmail: ${email}\nAudio: ${audioFileName}`;
        const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data berhasil terkirim!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Start the download
                    const link = document.createElement('a');
                    link.href = audioFile;
                    link.download = audioFileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Reset the form
                    form.reset();
                    form.style.display = 'none';

                    // Close the modal
                    const closeButton = modal.querySelector('[data-modal-hide="default-modal"]');
                    if (closeButton) {
                        closeButton.click();
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Data gagal terkirim!'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Terjadi kesalahan saat mengirim data!'
            });
            console.error('Error:', error);
        });
    });
});
// =============
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-music');
    const radioSongs = document.getElementById('default-radio-1');
    const radioInstrumental = document.getElementById('default-radio-2');
    const lyricsSongs = document.getElementById('lyrics-songs');
    const sendButton = document.getElementById('send');

    // Hide lyrics section by default if instrumental is selected
    lyricsSongs.classList.add('hidden');

    // Event listeners for radio buttons
    radioSongs.addEventListener('change', function() {
        if (radioSongs.checked) {
            lyricsSongs.classList.remove('hidden');
        }
    });

    radioInstrumental.addEventListener('change', function() {
        if (radioInstrumental.checked) {
            lyricsSongs.classList.add('hidden');
        }
    });

    // Submit event handler
    sendButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Validate required fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const descSongs = document.getElementById('desc-songs').value;
        const themeSongs = document.getElementById('theme-songs').value;
        let lyrics = '';

        if (radioSongs.checked) {
            lyrics = document.getElementById('lyrics').value;
        }

        if (!name || !email || !descSongs || !themeSongs) {
            alert('Please fill out all required fields.');
            return;
        }

        // Prepare data to send
        const data = {
            name: name,
            email: email,
            type: radioSongs.checked ? 'Songs' : 'Instrumental',
            description: descSongs,
            theme: themeSongs,
            lyrics: lyrics
        };

        const botToken = '7075863316:AAHLnGt1Y6UKKpF3UhQVeWpCMUoICjuwAl0';
        const chatId = '1207734967';

        const message = `
Name: ${data.name}
Email: ${data.email}
Type Songs: ${data.type}
Description: ${data.description}
Theme: ${data.theme}
Lyrics: ${data.lyrics}
        `;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message
                    })
                }).then(response => {
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Data sent successfully!'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                form.reset();
                                lyricsSongs.classList.add('hidden');
                                // Close modal here
                                const modal = document.getElementById(sendButton.dataset.modalHide);
                                if (modal) {
                                    modal.classList.remove('show');
                                    modal.setAttribute('aria-hidden', 'true');
                                    modal.setAttribute('style', 'display: none');
                                    const modalBackdrop = document.querySelector('.modal-backdrop');
                                    if (modalBackdrop) {
                                        modalBackdrop.parentNode.removeChild(modalBackdrop);
                                    }
                                }
                            }
                        });
                    } else {
                        throw new Error('Failed to send data.');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to send data. Please try again.'
                    });
                });
            });
        });

