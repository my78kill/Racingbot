const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bikeImg = new Image();
bikeImg.src = "assets/bike.png";

let carImg = new Image();
carImg.src = "assets/car.png";

let coinImg = new Image();
coinImg.src = "assets/coin.png";

let bike = {x:180,y:500,width:50,height:70};

let cars = [];
let coins = [];

let distance = 0;
let coinScore = 0;
let roadOffset = 0;

function spawnCar(){

cars.push({
x:Math.random()*350,
y:-80,
width:50,
height:80
});

}

function spawnCoin(){

coins.push({
x:Math.random()*360,
y:-40,
size:30
});

}

setInterval(spawnCar,1800);
setInterval(spawnCoin,2000);

function drawRoad(){

roadOffset +=5;

ctx.fillStyle="#333";
ctx.fillRect(0,0,400,600);

ctx.strokeStyle="white";
ctx.lineWidth=5;

for(let i=roadOffset%40;i<600;i+=40){

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

c.y +=6;

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

coin.y +=5;

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

ctx.clearRect(0,0,400,600);

drawRoad();
drawBike();
drawCars();
drawCoins();
drawScore();

distance++;

requestAnimationFrame(gameLoop);

}

gameLoop();

document.addEventListener("keydown",function(e){

if(e.key==="ArrowLeft") bike.x -=25;
if(e.key==="ArrowRight") bike.x +=25;

});

canvas.addEventListener("touchstart",function(e){

let x = e.touches[0].clientX;

if(x < window.innerWidth/2){
bike.x -=25;
}else{
bike.x +=25;
}

});

function gameOver(){

let score = distance;

if (window.TelegramGameProxy){
TelegramGameProxy.shareScore(score);
}

alert("💥 Crash!\nDistance: "+distance+"\nCoins: "+coinScore);

location.reload();

}