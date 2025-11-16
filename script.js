// Current page tracker
let currentPage = 1;
const totalPages = 10;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initHeartGame();
    initCardCarousel();
    initWordCarousel();
    createFloatingHearts();
    createConfetti();
});

// Page Navigation
function nextPage() {
    // Check if page 2 game is completed
    if (currentPage === 2) {
        const gameCompleted = document.querySelectorAll('.grid-cell.filled').length >= 7;
        if (!gameCompleted) {
            alert('Please fill all the hearts first! 💗');
            return;
        }
    }
    
    if (currentPage < totalPages) {
        changePage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        changePage(currentPage - 1);
    }
}

function changePage(pageNumber) {
    // Remove active class from current page
    document.getElementById(`page${currentPage}`).classList.remove('active');
    
    // Add active class to new page
    currentPage = pageNumber;
    document.getElementById(`page${currentPage}`).classList.add('active');
    
    // Special page effects
    if (currentPage === 7) {
        startFloatingHearts();
    }
    
    if (currentPage === 10) {
        createConfetti();
    }
}

function restartJourney() {
    changePage(1);
}

// Page 2: Heart Game
function initHeartGame() {
    const cells = document.querySelectorAll('.grid-cell:not(.center-cell)');
    const nextBtn = document.getElementById('game-next');
    
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            if (!this.classList.contains('filled')) {
                this.classList.add('filled');
                this.textContent = '💗';
                
                // Check if all cells are filled
                const filledCells = document.querySelectorAll('.grid-cell.filled').length;
                if (filledCells >= 7) { // 9 cells - 2 pre-filled = 7 to fill
                    nextBtn.classList.remove('disabled');
                    setTimeout(() => {
                        createMiniConfetti();
                    }, 500);
                }
            }
        });
    });
}

// Page 4: Card Carousel
const cards = [
    {
        img: 'https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
        text: '💐 Flowers For You'
    },
    {
        img: 'https://media.giphy.com/media/xUPGcqxmx0ZXyy6cJa/giphy.gif',
        text: '💝 A Gift For You'
    },
    {
        img: 'https://media.giphy.com/media/l0HlQcuzAA6DHswYo/giphy.gif',
        text: '🌟 You Are A Star'
    }
];

let currentCardIndex = 0;

function initCardCarousel() {
    updateCard();
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    updateCard();
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    updateCard();
}

function updateCard() {
    const cardImg = document.getElementById('currentCard');
    const cardMessage = document.querySelector('.card-message');
    
    cardImg.style.opacity = '0';
    setTimeout(() => {
        cardImg.src = cards[currentCardIndex].img;
        cardMessage.textContent = cards[currentCardIndex].text;
        cardImg.style.opacity = '1';
    }, 200);
}

// Page 5: Music Player
let isPlaying = false;
let progress = 0;
let progressInterval;

function togglePlay() {
    const playBtn = document.querySelector('.play-btn');
    const status = document.querySelector('.status');
    
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playBtn.textContent = '⏸️';
        status.textContent = 'PLAYING';
        startProgress();
    } else {
        playBtn.textContent = '▶️';
        status.textContent = 'PAUSED';
        stopProgress();
    }
}

function startProgress() {
    progressInterval = setInterval(() => {
        progress += 1;
        if (progress > 100) {
            progress = 0;
        }
        updateProgress();
    }, 170); // 17 seconds / 100 = 170ms per percent
}

function stopProgress() {
    clearInterval(progressInterval);
}

function updateProgress() {
    const progressFill = document.getElementById('progress');
    progressFill.style.width = progress + '%';
}

function previousSong() {
    progress = 0;
    updateProgress();
}

function nextSong() {
    progress = 0;
    updateProgress();
}

// Page 7: Floating Hearts
function startFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    
    setInterval(() => {
        createFloatingHeart(container);
    }, 300);
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '💗';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Page 8: Word Carousel
function initWordCarousel() {
    const words = document.querySelectorAll('.carousel-word');
    let currentWordIndex = 0;
    
    setInterval(() => {
        words[currentWordIndex].classList.remove('active');
        currentWordIndex = (currentWordIndex + 1) % words.length;
        words[currentWordIndex].classList.add('active');
    }, 2000);
}

// Floating Hearts Animation for Page 8
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts-animation');
    if (!container) return;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💗', '💕', '💖', '❤️'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 500);
}

// Confetti Effects
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff8ac0', '#ffc0cb', '#ff6b9d', '#ffb6d9', '#ff69b4'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 50);
    }
}

function createMiniConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff8ac0', '#ffc0cb', '#ff6b9d'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 1 + 2) + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        prevPage();
    }
});

// Touch Swipe Support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next page
        nextPage();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous page
        prevPage();
    }
}

// Easter Egg: Shake to show love message
let shakeCount = 0;
let lastShakeTime = Date.now();

if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(e) {
        const acceleration = e.accelerationIncludingGravity;
        const currentTime = Date.now();
        
        if (currentTime - lastShakeTime > 100) {
            const magnitude = Math.sqrt(
                acceleration.x * acceleration.x +
                acceleration.y * acceleration.y +
                acceleration.z * acceleration.z
            );
            
            if (magnitude > 20) {
                shakeCount++;
                if (shakeCount > 3) {
                    showLoveMessage();
                    shakeCount = 0;
                }
            }
            
            lastShakeTime = currentTime;
        }
    });
}

function showLoveMessage() {
    alert('💗 I love you, Priyanshi! 💗');
    createConfetti();
}

// Smooth scroll to top when changing pages
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top on page change
const originalChangePage = changePage;
changePage = function(pageNumber) {
    scrollToTop();
    originalChangePage(pageNumber);
};

