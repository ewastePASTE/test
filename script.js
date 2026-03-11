const grid = document.getElementById("games-grid");
const player = document.getElementById("player");
const frame = document.getElementById("game-frame");
const exitBtn = document.getElementById("exit-btn");
const searchInput = document.getElementById("game-search");

let allGamesData = [];

fetch("games.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            if (item.type === "folder") {
                allGamesData.push(...item.items);
            } else {
                allGamesData.push(item);
            }
        });
        loadItems(allGamesData);
    })
    .catch(error => console.error("Error fetching games:", error));

function loadItems(itemsToDisplay) {
    grid.innerHTML = "";
    itemsToDisplay.forEach(item => {
        createGame(item);
    });
}

function createGame(game) {
    const card = document.createElement("div");
    card.className = "game";

    card.innerHTML = `
        <img src="${game.icon}" alt="${game.title}">
        <span>${game.title}</span>
    `;

    card.onclick = () => openGame(game);
    grid.appendChild(card);
}

function openGame(game) {
    player.classList.remove("hidden");
    // This line assumes your game HTML files are directly in a folder named 'html'
    // relative to your index.html.
    frame.src = `html/${game.file}`;
    document.body.style.overflow = "hidden";
}

exitBtn.onclick = () => {
    frame.src = ""; // Clear the iframe source
    player.classList.add("hidden");
    document.body.style.overflow = "auto";
}

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = allGamesData.filter(game =>
        game.title.toLowerCase().includes(searchTerm)
    );
    loadItems(filteredGames);
});
