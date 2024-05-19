document.addEventListener("DOMContentLoaded", function() {
    var loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading-spinner';
    loadingSpinner.innerHTML = `
      <div class="spinner6">
        <i class="fas fa-music"></i>
        <i class="fas fa-music"></i>
        <i class="fas fa-music"></i>
        <i class="fas fa-music"></i>
      </div>`;
    document.body.appendChild(loadingSpinner);
  });
  
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loadingSpinner = document.getElementById('loading-spinner');
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }
    }, 2000); // Penundaan 2 detik
  });
  

// =================
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
// 
// ============ Play

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayers = document.querySelectorAll('.audio-player');
    const playPauseButtons = document.querySelectorAll('.play-pause');
    const volumeControls = document.querySelectorAll('.volume-control');
    const durationDisplays = document.querySelectorAll('.duration');
    const circles = document.querySelectorAll('.img-circle');
    const images = document.querySelectorAll('.music-card img:first-child');
    const volumePercentages = document.querySelectorAll('.volume-percentage');
    const progressBars = document.querySelectorAll('.progress-bar');
    const currentTimeDisplays = document.querySelectorAll('.current-time');
    const totalTimeDisplays = document.querySelectorAll('.total-time');

    playPauseButtons.forEach(function(button, index) {
        button.addEventListener('click', function () {
            const audioPlayer = audioPlayers[index];
            const circle = circles[index];
            const image = images[index];
            const progressBar = progressBars[index];
            const currentTimeDisplay = currentTimeDisplays[index];
            const totalTimeDisplay = totalTimeDisplays[index];

            if (audioPlayer.paused) {
                pauseAllPlayers();
                audioPlayer.play();
                button.innerHTML = '<i class="fas fa-pause"></i>';
                circle.classList.add('rotate');
                circle.classList.add('highlight');
                image.classList.add('blur');
                circle.classList.add('img-shadow');
                image.classList.add('blur2');
            } else {
                audioPlayer.pause();
                button.innerHTML = '<i class="fas fa-play"></i>';
                circle.classList.remove('rotate');
                circle.classList.remove('highlight');
                image.classList.remove('blur');
            }

            audioPlayer.addEventListener('timeupdate', function() {
                const currentTime = audioPlayer.currentTime;
                const duration = audioPlayer.duration;
                const progress = (currentTime / duration) * 100;
                progressBar.value = progress;
                progressBar.style.setProperty('--progress', `${progress}%`);

                const currentMinutes = Math.floor(currentTime / 60);
                const currentSeconds = Math.floor(currentTime % 60);
                currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
            });

            audioPlayer.addEventListener('loadedmetadata', function() {
                const duration = audioPlayer.duration;
                const totalMinutes = Math.floor(duration / 60);
                const totalSeconds = Math.floor(duration % 60);
                totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
            });

            audioPlayer.addEventListener('ended', function () {
                playPauseButtons[index].innerHTML = '<i class="fas fa-play"></i>';
                circles[index].classList.remove('rotate');
                circles[index].classList.remove('highlight');
                images[index].classList.remove('blur');
                images[index].classList.add('blur2');
                circles[index].classList.add('img-shadow');
                progressBar.value = 0; // Reset progress bar
                currentTimeDisplay.textContent = '0:00';
            });

            progressBar.addEventListener('input', function () {
                const progress = progressBar.value;
                const currentTime = (progress / 100) * audioPlayer.duration;
                audioPlayer.currentTime = currentTime;
            });
        });
    });

    volumeControls.forEach(function(volumeControl, index) {
        const volumePercentage = volumePercentages[index];
        volumeControl.addEventListener('input', function () {
            const audioPlayer = audioPlayers[index];
            const volume = volumeControl.value;
            audioPlayer.volume = volume;
            volumePercentage.textContent = `${Math.round(volume * 100)}%`;
        });
    });

    function pauseAllPlayers() {
        audioPlayers.forEach(function(audioPlayer, index) {
            if (!audioPlayer.paused) {
                audioPlayer.pause();
                playPauseButtons[index].innerHTML = '<i class="fas fa-play"></i>';
                circles[index].classList.remove('rotate');
                circles[index].classList.remove('highlight');
                images[index].classList.remove('blur');
                images[index].classList.add('blur2');
                circles[index].classList.add('img-shadow');
                progressBars[index].value = 0; // Reset progress bar
                currentTimeDisplays[index].textContent = '0:00';
            }
        });
    }
});

// ===============

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

        const name = document.getElementById('Name').value;
        const email = document.getElementById('Email').value;
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
                    text: 'Thank you! for download lets see your notification',
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
// ================
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
                            text: 'Thank you! We will send your song via email within 1-5 working days thank you'
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

