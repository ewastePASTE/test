document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const appWin = document.getElementById('app-window');
    const iframe = document.getElementById('app-iframe');
    const winTitle = document.getElementById('active-window-title');
    const winIcon = document.getElementById('active-window-icon');
    const indicator = document.getElementById('active-indicator');
    const tbActiveIcon = document.getElementById('tb-active-icon');

    // 1. Load Games and build icons
    fetch('games.json')
        .then(res => res.json())
        .then(games => {
            games.forEach(game => {
                const div = document.createElement('div');
                div.className = 'icon';
                div.innerHTML = `<img src="${game.icon}"><span>${game.title}</span>`;
                div.onclick = () => openGame(game);
                desktop.appendChild(div);
            });
            
            // Allow loading directly from URL: ewastepaste.github.io/mathOS/html/amaze.html
            const currentPath = window.location.pathname;
            if (currentPath.includes('/html/')) {
                const fileName = currentPath.split('/').pop();
                const game = games.find(g => g.file === fileName);
                if (game) openGame(game);
            }
        });

    function openGame(game) {
        winTitle.innerText = game.title;
        winIcon.src = game.icon;
        tbActiveIcon.src = game.icon;
        iframe.src = `html/${game.file}`;
        
        appWin.style.display = 'flex';
        indicator.classList.remove('hidden');

        // URL MAGIC: Changes browser bar to look like https://.../html/amaze.html
        // Note: Refreshing this URL on GitHub Pages might lead to the raw game file
        const newPath = window.location.origin + window.location.pathname.replace('index.html', '') + 'html/' + game.file;
        window.history.pushState({ game: game.file }, '', newPath);
    }

    // 2. Windows 11 Clock
    function updateClock() {
        const now = new Date();
        document.getElementById('time').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        document.getElementById('date').innerText = now.toLocaleDateString();
    }
    setInterval(updateClock, 1000);
    updateClock();
});

function closeApp() {
    document.getElementById('app-window').style.display = 'none';
    document.getElementById('app-iframe').src = '';
    document.getElementById('active-indicator').classList.add('hidden');
    
    // Reset URL back to the main OS index
    const rootPath = window.location.pathname.split('/html/')[0];
    window.history.pushState({}, '', rootPath);
}
