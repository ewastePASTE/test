const grid = document.getElementById("games-grid");
const player = document.getElementById("player");
const frame = document.getElementById("game-frame");
const exitBtn = document.getElementById("exit-btn");

fetch("games.json")
.then(res => res.json())
.then(data => loadItems(data));

function loadItems(items){

grid.innerHTML = "";

items.forEach(item => {

if(item.type === "folder"){

item.items.forEach(game => createGame(game));

}else{

createGame(item);

}

});

}

function createGame(game){

const card = document.createElement("div");
card.className = "game";

card.innerHTML = `
<img src="${game.icon}">
<span>${game.title}</span>
`;

card.onclick = () => openGame(game);

grid.appendChild(card);

}

function openGame(game){

player.classList.remove("hidden");

frame.src = `html/${game.file}`;

document.body.style.overflow = "hidden";

}

exitBtn.onclick = () => {

frame.src = "";

player.classList.add("hidden");

document.body.style.overflow = "auto";

}
