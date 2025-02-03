
let game_space = document.getElementById("gamespace");
let befgame=document.getElementById("befgame");
// basket
let basket = document.createElement("img");
basket.src = "basket.png";
basket.id = "basket";
game_space.appendChild(basket);
// Hearts
let hearts=document.getElementById("hearts");
let heart=[,,];
for(i=0;i<3;i++){
heart[i]=document.createElement("img");
heart[i].src="https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart_2x1.jpg"
heart[i].classList.add("hearts");
hearts.appendChild(heart[i]);
}

// score
let score=document.getElementById("score");
let Score=0;
score.innerHTML=`<h2>Score:${Score}</h2>`;


// motion of basket
let interval;
function move_left() {
  let left = (basket.getBoundingClientRect().left / window.innerWidth)*100;
  if (left >4) {
    // Prevent basket from moving out of bounds
    basket.style.left = left -0.3+ "vw";
  }
}

function move_right() {
  let left = (basket.getBoundingClientRect().left / window.innerWidth)*100;
  if (left <85) {
    basket.style.left = left + 0.3 + "vw";
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" ||event.key=== "a" || event.key==="A") {
    clearInterval(interval); 
    interval = setInterval(move_left, 1);
  }
  if (event.key ==="ArrowRight" ||event.key=== "d" ||event.key=== "D") {
    clearInterval(interval);
    interval = setInterval(move_right, 1);
  }
});

document.addEventListener("keyup", () => {
  clearInterval(interval); 
});

//function to create goodblock
function create_good_block(){
let good_block = document.createElement("img");
// good_block.src ="good_block.png";
let y = Math.floor(Math.random() * 10000);
if(y%3==0){
good_block.src="apple.png";
}
else if(y%3==1){
  good_block.src="pineapple.png";
}
else{
  good_block.src="mango.png";
}
good_block.classList.add("block");
const randomX = Math.random() *87 +4; 
good_block.style.left = randomX + "vw"; 
game_space.appendChild(good_block);

let position =(good_block.getBoundingClientRect().top / window.innerHeight)*100; 

function moveBlock() {
    position += 0.6*(1+0.01*Score); 
    good_block.style.top = position + "vh"; 

    if (checkCollision(good_block, basket)) {
        Score += 1; 
        score.innerHTML = `<h2>Score: ${Score}</h2>`;
        good_block.remove(); 
    } else if (position >= 88) {
        good_block.remove(); 
    } else {
        requestAnimationFrame(moveBlock);
    }
}


moveBlock();
}
    
//function to create badblock
function create_bad_block(){
let bad_block = document.createElement("img");
// bad_block.src ="bad_block.png";
bad_block.src="bomb.png";
bad_block.classList.add("block");
const randomX = Math.random() *85 +4;
bad_block.style.left = randomX + "vw"; 
game_space.appendChild(bad_block);

let position =(bad_block.getBoundingClientRect().top / window.innerHeight)*100;

function moveBlock() {
    position += 0.6*(1+0.01*Score); 
    bad_block.style.top = position + "vh"; 

    
if (checkCollision(bad_block, basket)) {
loseHeart(); 
bad_block.remove(); 
} else if (position >=88) {
bad_block.remove(); 
} else {
requestAnimationFrame(moveBlock);
}
}

moveBlock();
}



function checkCollision(block, basket) {
    const blockRect = block.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    return (
        (blockRect.right-30) < basketRect.right &&
        blockRect.left+30 > basketRect.left &&
        blockRect.bottom >basketRect.top
        // blockRect.top > basketRect.bottom
    );
}

function loseHeart() {
if (heart.length > 0) { 
const lostHeart = heart.pop(); 
lostHeart.remove();
if (heart.length === 0) {
alert(`Your score is ${Score},Game Over!`); 
location.reload(); 
        }
   }
}

let fact=4;

let lastGenerationTime = performance.now();
function generate_blocks(timestamp) {
const generationInterval = Math.max(1000 * (1 - (0.02 * Score)), 150); 

if (timestamp - lastGenerationTime > generationInterval) { 
lastGenerationTime = timestamp; 
if(Score<10){
  fact=4;
} else if((Score>=10) &&(Score<30)){
  fact=3;
}
else{
  fact=2;
}

let x = Math.floor(Math.random() * 10000);
if (x % fact === 0) {
create_bad_block();
} else {
create_good_block();
}
}

requestAnimationFrame(generate_blocks); 
}
requestAnimationFrame(generate_blocks); 
