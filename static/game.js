const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bikeImg = new Image();
bikeImg.src = "static/assets/bike.png";

let carImg = new Image();
carImg.src = "static/assets/car.png";

let coinImg = new Image();
coinImg.src = "static/assets/coin.png";

let lanes = [60,170,280];
let laneIndex = 1;

let bike = {
x: lanes[laneIndex],
y: 500,
width: 50,
height: 70
};

let cars = [];
let coins = [];

let distance = 0;
let coinScore = 0;

let roadOffset = 0;
let gameRunning = false;

function startGame(){

document.getElementById("startScreen").style.display="none";

gameRunning = true;

gameLoop();

}

function spawnCar(){

let lane = lanes[Math.floor(Math.random()*3)];

cars.push({
x: lane,
y: -80,
width: 50,
height: 80
});

}

function spawnCoin(){

let lane = lanes[Math.floor(Math.random()*3)];

coins.push({
x: lane,
y: -40,
size: 30
});

}

setInterval(spawnCar,1500);
setInterval(spawnCoin,2000);

function drawRoad(){

roadOffset += 6;

ctx.fillStyle = "#222";
ctx.fillRect(0,0,400,600);

ctx.strokeStyle = "white";
ctx.lineWidth = 5;

for(let i = roadOffset % 40; i < 600; i += 40){

ctx.beginPath();
ctx.moveTo(200,i);
ctx.lineTo(200,i+20);
ctx.stroke();

}

}

function drawBike(){

ctx.drawImage(bikeImg,bike.x,bike.y,bike.width,bike.height);

}

function drawCars(){

for(let i=0;i<cars.length;i++){

let c = cars[i];

c.y += 6;

ctx.drawImage(carImg,c.x,c.y,c.width,c.height);

if(
bike.x < c.x + c.width &&
bike.x + bike.width > c.x &&
bike.y < c.y + c.height &&
bike.y + bike.height > c.y
){

gameOver();

}

}

}

function drawCoins(){

for(let i=0;i<coins.length;i++){

let coin = coins[i];

coin.y += 5;

ctx.drawImage(coinImg,coin.x,coin.y,coin.size,coin.size);

if(
bike.x < coin.x + coin.size &&
bike.x + bike.width > coin.x &&
bike.y < coin.y + coin.size &&
bike.y + bike.height > coin.y
){

coinScore++;

coins.splice(i,1);

}

}

}

function drawScore(){

ctx.fillStyle="white";
ctx.font="20px Arial";

ctx.fillText("Distance: "+distance,10,30);
ctx.fillText("Coins: "+coinScore,10,60);

}

function gameLoop(){

if(!gameRunning) return;

ctx.clearRect(0,0,400,600);

drawRoad();
drawBike();
drawCars();
drawCoins();
drawScore();

distance++;

requestAnimationFrame(gameLoop);

}

function moveLeft(){

if(laneIndex>0){

laneIndex--;
bike.x = lanes[laneIndex];

}

}

function moveRight(){

if(laneIndex<2){

laneIndex++;
bike.x = lanes[laneIndex];

}

}

document.addEventListener("keydown",function(e){

if(e.key==="ArrowLeft") moveLeft();
if(e.key==="ArrowRight") moveRight();

});

canvas.addEventListener("touchstart",function(e){

let x = e.touches[0].clientX;

if(x < window.innerWidth/2){
moveLeft();
}else{
moveRight();
}

});

function gameOver(){

gameRunning = false;

let score = distance;

if(window.TelegramGameProxy){
TelegramGameProxy.shareScore(score);
}

ctx.fillStyle="black";
ctx.fillRect(0,0,400,600);

ctx.fillStyle="white";
ctx.font="30px Arial";

ctx.fillText("Game Over",120,260);

ctx.font="20px Arial";

ctx.fillText("Distance: "+score,130,310);
ctx.fillText("Coins: "+coinScore,140,340);

ctx.fillText("Tap to Restart",110,400);

}

canvas.addEventListener("click",function(){

if(!gameRunning){
location.reload();
}

});
