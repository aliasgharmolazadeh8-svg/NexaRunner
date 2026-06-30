console.log("Game Loaded");

// =========================
// بررسی ورود کاربر
// =========================

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

document.getElementById("welcome").innerHTML =
    "خوش اومدی " + currentUser + " 👋";


// =========================
// دکمه خروج
// =========================

document.getElementById("logoutBtn").onclick = () => {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

};


// =========================
// دکمه تنظیمات
// =========================

document.getElementById("settingsBtn").onclick = () => {

    window.location.href = "settings.html";

};


// =========================
// پس زمینه
// =========================

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

const bgWidth = 900;

let x1 = 0;
let x2 = bgWidth;


// =========================
// وضعیت بازی
// =========================

let running = false;

let animationId;


// =========================
// حلقه بازی
// =========================

function gameLoop() {
    if (!running) return;

    x1 -= 2;
    x2 -= 2;

    // وقتی تصویر کامل رفت بیرون از چپ
    if (x1 <= -bgWidth) {
        x1 = x2 + bgWidth;
    }

    if (x2 <= -bgWidth) {
        x2 = x1 + bgWidth;
    }

    bg1.style.left = x1 + "px";
    bg2.style.left = x2 + "px";

    animationId = requestAnimationFrame(gameLoop);
    // حرکت سخره
    if (!gameOver) {
        obstacleX -= 6;

        // وقتی رفت بیرون دوباره رندوم برگرده
        if (obstacleX < -50) {
            obstacleX = 900 + Math.random() * 600; // رندوم فاصله
        }

        obstacle.style.right = obstacleX + "px";
    }
    checkCollision();
}


// =========================
// دکمه شروع / توقف
// =========================

const startBtn = document.getElementById("startBtn");

startBtn.onclick = function () {

    if (!running) {

        running = true;

        startBtn.innerHTML = "⏸ توقف بازی";

        gameLoop();

    }

    else {

        running = false;

        cancelAnimationFrame(animationId);

        startBtn.innerHTML = "▶ شروع بازی";

    }

};
const dino = document.getElementById("dino");


let isJumping = false;
let dinoY = 20;
let velocity = 0;

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !isJumping) {
        isJumping = true;
        velocity = 12;
    }
});

function updateDino() {
    if (isJumping) {
        dinoY += velocity;
        velocity -= 0.6;

        if (dinoY <= 20) {
            dinoY = 20;
            isJumping = false;
        }

        dino.style.bottom = dinoY + "px";
    }

    requestAnimationFrame(updateDino);
}

updateDino();

updateDino();
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault(); // 👈 خیلی مهم

        if (!isJumping) {
            isJumping = true;
            velocity = 12;
        }
    }
});
const obstacle = document.getElementById("obstacle");

let obstacleX = 900;
let gameOver = false;
function checkCollision() {
    const dinoBottom = dinoY;

    const obstacleLeft = obstacleX;

    // فاصله برخورد ساده
    if (
        obstacleLeft < 120 &&
        obstacleLeft > 60 &&
        dinoBottom < 60
    ) {
        triggerGameOver();
    }
}
function triggerGameOver() {
    gameOver = true;
    running = false;
    cancelAnimationFrame(animationId);

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "red";
    overlay.style.color = "white";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.fontSize = "40px";
    overlay.style.zIndex = "9999";

    overlay.innerHTML = `
        <div style="margin-bottom:20px;">💀 شما باختید 💀</div>
        <button id="restartBtn"
            style="
                padding: 12px 20px;
                font-size: 20px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                margin: 0px;
                    width: 200px;
    height: 100px;
            ">
            🔄 بازگشت به بازی
        </button>
    `;

    document.body.appendChild(overlay);

    // دکمه ریست
    document.getElementById("restartBtn").onclick = () => {
        window.location.href = "game.html";
    };
}
let score = 0;
let scoreInterval;
score = 0;
document.getElementById("score").innerText = score;

scoreInterval = setInterval(() => {
    if (running && !gameOver) {
        score++;
        document.getElementById("score").innerText = score;
    }
}, 100);
function saveBestScore() {
    const user = currentUser;

    let best = localStorage.getItem("bestScore_" + user);

    if (!best || score > best) {
        localStorage.setItem("bestScore_" + user, score);
    }
}
saveBestScore();
function loadBestScore() {
    const user = currentUser;

    let best = localStorage.getItem("bestScore_" + user) || 0;

    document.getElementById("bestScore").innerText = best;
}


// لمس صفحه (موبایل)
const gameArea = document.getElementById("gameArea");

function jump() {
    if (!isJumping) {
        isJumping = true;
        velocity = 12;
    }
}

// 📱 موبایل (تاچ واقعی)
gameArea.addEventListener("touchstart", function (e) {
    e.preventDefault();
    jump();
}, { passive: false });

// 💻 دسکتاپ (کلیک)
gameArea.addEventListener("click", function () {
    jump();
});

loadBestScore();



