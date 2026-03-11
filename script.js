// 1. Define your games here (Avoiding the local fetch error)
const games = [
    { title: "Space Explorer", file: "space_game.html", desc: "Retro space shooter." },
    { title: "Platformer Pro", file: "platformer.html", desc: "Classic 2017 style platformer." },
    { title: "Clicker Hero", file: "clicker.html", desc: "High CTR progression game." }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('game-grid');
    const modal = document.getElementById('game-modal');
    const frame = document.getElementById('game-frame');
    const closeBtn = document.querySelector('.close-button');

    // 2. CHECK FOR URL PARAMETERS (e.g., index.html?game=space_game.html)
    const urlParams = new URLSearchParams(window.location.search);
    const gameToLoad = urlParams.get('game');

    if (gameToLoad) {
        loadGame(gameToLoad);
    }

    // 3. BUILD THE MENU
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${game.title}</h3>
            <p>${game.desc}</p>
            <span class="play-link">Play: index.html?game=${game.file}</span>
        `;
        
        card.onclick = () => {
            // Update URL without refreshing page
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?game=' + game.file;
            window.history.pushState({path:newUrl}, '', newUrl);
            loadGame(game.file);
        };
        
        grid.appendChild(card);
    });

    function loadGame(filename) {
        frame.src = `html/${filename}`;
        modal.style.display = 'block';
    }

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        frame.src = ''; 
        // Reset URL when closing
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({path:cleanUrl}, '', cleanUrl);
    };
});
