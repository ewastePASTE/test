const games = [
    {title: "1v1.lol", file: "1v1lol.html", icon: "🔫"},
    {title: "Goose Game", file: "Untitled Goose Game.html", icon: "🪿"},
    {title: "Amaze", file: "amaze.html", icon: "🧩"},
    {title: "Block Blast", file: "blockblast.html", icon: "🟥"},
    {title: "Bowmasters", file: "bowmasters.html", icon: "🏹"},
    {title: "Drift Hunters", file: "drifthunters.html", icon: "🏎️"},
    {title: "GTA 2", file: "gta2.html", icon: "⭐️"},
    {title: "Mario Kart", file: "mariokartds.html", icon: "🏎️"},
    {title: "Minecraft", file: "minecraft.html", icon: "📦"},
    {title: "Slope", file: "slope.html", icon: "🏀"},
    {title: "Webfishing", file: "webfishing.html", icon: "🎣"}
];

document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const win = document.getElementById('game-window');
    const frame = document.getElementById('game-frame');
    const title = document.getElementById('win-title');

    // 1. Check URL for ?game=file.html
    const params = new URLSearchParams(window.location.search);
    if (params.has('game')) {
        openGame(params.get('game'), "Loading...");
    }

    // 2. Create Desktop Icons
    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'icon';
        div.innerHTML = `
            <div class="icon-img">${game.icon}</div>
            <div class="icon-text">${game.title}</div>
        `;
        div.onclick = () => {
            // Update URL like ____.io/?game=file.html
            const newUrl = `${window.location.pathname}?game=${encodeURIComponent(game.file)}`;
            window.history.pushState({}, '', newUrl);
            openGame(game.file, game.title);
        };
        desktop.appendChild(div);
    });

    function openGame(file, name) {
        title.innerText = name;
        frame.src = `html/${file}`;
        win.style.display = 'flex';
    }
});

function closeGame() {
    const win = document.getElementById('game-window');
    const frame = document.getElementById('game-frame');
    win.style.display = 'none';
    frame.src = '';
    // Reset URL
    window.history.pushState({}, '', window.location.pathname);
}
