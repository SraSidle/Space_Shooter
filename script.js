const yourShip = document.querySelector(".player_shooter");
const playArea = document.querySelector("#play_area");
const aliensImgs = [
  "./assets/imgs/light_ship.png",
  "./assets/imgs/cartoon_ship.jpg",
  "./assets/imgs/blue_ship.jpg",
];
const instructions = document.querySelector(".instructions");
const startButton = document.querySelector(".start_button");
let alienInterval;

function flyShip(e) {
  if (e.key == "ArrowUp") {
    e.preventDefault();
    moveUp();
  } else if (e.key == "ArrowDown") {
    e.preventDefault();
    moveDown();
  } else if (e.key == " " || "ArrowRight") {
    e.preventDefault();
    fireLaser();
  }
}

function moveUp() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "0px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 50;
    yourShip.style.top = `${position}px`;
  }
}

function moveDown() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "450px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 50;
    yourShip.style.top = `${position}px`;
  }
} /*depois pensar em usar o bottom nessa função */

function fireLaser() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

function createLaserElement() {
  let xPosition = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("top")
  );
  let newLaser = document.createElement("img");
  newLaser.src =
    "./assets/imgs/cartoon-spaceship-5a2c638d8da8d3.6013113515128585095802.jpg";
  newLaser.classList.add("laser");
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser;
}

function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    let aliens = document.querySelectorAll(".alien");

    aliens.forEach((alien) => {
      if (checkLaserCollision(laser, alien)) {
        alien.src = "imageExplosão";
        alien.classList.remove(".alien");
        alien.classList.add("dead-alien");
      }
    });
    if (xPosition === 300) {
      laser.remove();
    } else {
      laser.style.left = `${xPosition + 8}px`;
    }
  }, 10);
}

function createAlien() {
  let newAlien = document.createElement("img");
  let alienSprit = aliensImgs[Math.floor(Math.random() * aliensImgs.length)];
  newAlien.src = alienSprit;
  newAlien.classList.add("alien");
  newAlien.classList.add("alien_transition");
  newAlien.style.left = "350px";
  newAlien.style.top = `${Math.floor(Math.random() * 330 + 30)}px`;
  playArea.append(newAlien);
  moveAlien(newAlien);
}

function moveAlien(alien) {
  let moveAlienInterval = setTimeout(() => {
    let xPosition = parseInt(
      window.getComputedStyle(alien).getPropertyValue("left")
    );
    if (xPosition <= 50) {
      if (Array.from(alien.classList.includes("dead_alien"))) {
        alien.remove();
      } else {
        gameOver();
      }
    } else {
      alien.style.left = `${xPosition - 4}px`;
    }
  }, 30);
}

function checkLaserCollision(laser, alien) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = parseInt(laserTop - 20);
  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = parseInt(alienTop - 30);

  if (laserLeft !== 340 && laserLeft + 40 !== alienLeft) {
    if (laserTop !== alienTop && laserTop >= alienBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function start() {
  startButton.style.display = "none";
  instructions.style.display = "none";
  window.addEventListener("keydown", flyShip);
  alienInterval = setInterval(() => {
    createAlien();
  }, 2000);
}

startButton.addEventListener("click", (event) => {
  start();
});

function gameOver() {
  window.removeEventListener("keydown", flyShip);
  clearInterval(alienInterval);
  let aliens = document.querySelectorAll(".alien");
  aliens.forEach((alien) => alien.remove);
  let lasers = document.querySelectorAll(".laser")
  lasers.forEach((laser) => laser.remove());
  setTimeout(() => {
    alert("Game Over");
    yourShip.style.top = "350px";
    startButton.style.display = "block";
    instructions.style.display = "block";
  })
}
