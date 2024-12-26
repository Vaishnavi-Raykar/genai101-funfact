let facts = [
    "I love hiking in the mountains! 🏔️",
    "I am an avid coder and love to code often! 💻",
    "I once cooked a gourmet Taco! 🌮",
    "I speak three languages fluently! 🗣️",
    "I'm learning to play the guitar! 🎸",
    "I enjoy reading science fiction novels! 📚",
    "I have a pet cat named Whiskers! 🐱",
    "I love to travel and explore new cultures! ✈️",
    "I am a coffee enthusiast! ☕",
    "I enjoy photography and capturing moments! 📸"
];

let favorites = [];
let currentFact = '';

function updateFactCount() {
    document.getElementById('fact-count').textContent = facts.length;
}

function generateFact() {
    const factDisplay = document.getElementById('fact-display');
    const randomIndex = Math.floor(Math.random() * facts.length);
    factDisplay.style.opacity = '0';
    
    setTimeout(() => {
        currentFact = facts[randomIndex];
        factDisplay.textContent = currentFact;
        factDisplay.style.opacity = '1';
    }, 200);
}

function shareOnTwitter() {
    const factText = document.getElementById('fact-display').textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(factText)}&hashtags=FunFacts`;
    window.open(twitterUrl, '_blank');
    showNotification('Opening Twitter... 🐦');
}

function toggleFavorite() {
    if (!currentFact) {
        showNotification('Generate a fact first! ⚠️');
        return;
    }

    if (favorites.includes(currentFact)) {
        favorites = favorites.filter(fact => fact !== currentFact);
        showNotification('Removed from favorites! ❌');
    } else {
        favorites.push(currentFact);
        showNotification('Added to favorites! ❤️');
    }
    updateFavoritesList();
}

function updateFavoritesList() {
    const favoritesList = document.getElementById('favorites-list');
    const favoritesSection = document.getElementById('favorites-section');
    
    if (favorites.length > 0) {
        favoritesSection.style.display = 'block';
        favoritesList.innerHTML = favorites.map(fact => `
            <div class="favorite-item">
                <span>${fact}</span>
                <button onclick="removeFavorite('${fact}')" class="btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    } else {
        favoritesSection.style.display = 'none';
    }
}

function removeFavorite(fact) {
    favorites = favorites.filter(f => f !== fact);
    updateFavoritesList();
    showNotification('Removed from favorites! ❌');
}

function addNewFact() {
    const newFactInput = document.getElementById('newFact');
    const newFact = newFactInput.value.trim();
    
    if (newFact) {
        facts.push(newFact);
        newFactInput.value = '';
        updateFactCount();
        showNotification('New fact added successfully! 🎉');
        generateFact();
    } else {
        showNotification('Please enter a fact first! ⚠️');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.card').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.card').style.opacity = '1';
    }, 300);
    updateFactCount();
});

// Add 3D tilt effect to card
document.querySelector('.card').addEventListener('mousemove', (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
});

document.querySelector('.card').addEventListener('mouseleave', (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
});
