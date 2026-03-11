// Inside your fetch('games.json') .then block:
games.forEach(game => {
    const div = document.createElement('div');
    div.className = 'icon';
    div.innerHTML = `
        <div class="icon-img">
            <img src="${game.icon}" alt="${game.title}">
        </div>
        <span>${game.title}</span>
    `;
    div.onclick = () => openGame(game);
    desktop.appendChild(div);
});

// Update the openGame function to set the taskbar icon too
function openGame(game) {
    document.getElementById('win-app-name').innerText = game.title;
    document.getElementById('win-app-icon').src = game.icon; // Set window title icon
    document.getElementById('game-iframe').src = `html/${game.file}`;
    document.getElementById('window-frame').style.display = 'flex';
    
    // Show in Taskbar
    const indicator = document.getElementById('active-game-indicator');
    document.getElementById('active-app-img').src = game.icon;
    indicator.classList.remove('hidden');
    
    const newUrl = `${window.location.pathname}?game=${encodeURIComponent(game.file)}`;
    window.history.pushState({}, '', newUrl);
}
