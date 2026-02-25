const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.4; // soft & romantic

let loveScore = 0;

let herName = "";
let qIndex = 0;

const game = document.getElementById("gameScreen");
const chat = document.getElementById("chatScreen");

const questions = [
    "Do you know you are the most beautiful thing that ever happened to me? 🥹❤️",
    "Do you know you are the most special person in my life? 🌍💖",
    "Do you know my heart beat faster whenever I do cubble you close? 💓😌",
    "Would you let me hope you close tonight? 🫂✨",
    "Do you know your smile fixes my worst days? 😊💞",
    "do you know you are the reason i smile every day? 🌸",
    "Would you choose me in every lifetime? 🔁❤️",
    "Do you know I fall in love with you every single day? 😭💘",
    "Will you stay with me no matter what? 🥺🫶",
    "Can I love you now and always? ♾️❤️"
];

/* -------- PHASE 1 -------- */
function startGame() {
    const input = document.getElementById("nameInput").value.trim();
    if (!input) return alert("Please enter your name ❤️");
    herName = input;
    bgMusic.play().catch(() => {});
    nextQuestion();
}

function nextQuestion() {
    if (qIndex >= questions.length) {
        game.classList.add("hidden");
        chat.classList.remove("hidden");
        stage1();
        return;
    }

    game.innerHTML = `
        <h2>Miss ${herName} 💕</h2>
        <p>${questions[qIndex]}</p>
        <div class="button-row">
            <button onclick="yes()">Yes 💖</button>
            <button class="no" id="noBtn">No 🙈</button>
        </div>
    `;

    const noBtn = document.getElementById("noBtn");
    const row = document.querySelector(".button-row");

    noBtn.style.left = "50%";
    noBtn.style.top = "0px";

    noBtn.onmouseover = () => {
        const maxX = row.clientWidth - noBtn.offsetWidth;
        const maxY = 180;
        noBtn.style.left = Math.random() * maxX + "px";
        noBtn.style.top = Math.random() * maxY + "px";
    };
}

function yes() {
    loveScore++; // 💖 every YES matters
    qIndex++;
    nextQuestion();
}

/* -------- CHAT HELPERS -------- */
function addMsg(text, delay = 1200) {
    setTimeout(() => {
        const div = document.createElement("div");
        div.className = "msg";
        div.innerHTML = text;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }, delay);
}

function addOptions(opts) {
    const box = document.createElement("div");
    box.className = "options";
    opts.forEach(o => {
        const btn = document.createElement("button");
        btn.innerText = o.text;
        btn.onclick = () => {
            box.remove();
            o.action();
        };
        box.appendChild(btn);
    });
    chat.appendChild(box);
}



function fadeOutMusic(duration = 3000) {
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const fade = setInterval(() => {
        currentStep++;
        bgMusic.volume = Math.max(0, bgMusic.volume - (0.25 / steps));

        if (currentStep >= steps) {
            clearInterval(fade);
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
    }, stepTime);
}





/* -------- CHAT STAGES -------- */

// Stage 1 – Mood
function stage1() {
    addMsg(`Miss ${herName}… 🥹❤️`, 500);
    addMsg("I’m home right now, thinking of you 💭✨", 2000);
    addMsg("How are you feeling at this moment? 🫂", 3200);

    setTimeout(() => {
        addOptions([
            { text: "Happy 😊", action: stage2Happy },
            { text: "Tired 😴", action: stage2Tired },
            { text: "Not okay 😔", action: stage2Sad }
        ]);
    }, 4500);
}

// Stage 2
function stage2Happy() {
    loveScore += 2;
    addMsg("That makes my heart smile 🥰💞", 1000);
    addMsg("The world is brighter when you're happy 🌟✨", 2600);
    setTimeout(stage2Common, 1500);
}

function stage2Tired() {
    loveScore += 1;
    addMsg("Come here… 🫂💗 you’ve done so well today", 1000);
    addMsg("Remember, I’m home waiting for you 🌟✨", 2600);
    setTimeout(stage2Common, 1500);
}

function stage2Sad() {
    loveScore -= 1;
    addMsg("Oh love… 🥺💔 I wish I could hold you right now");
    stage2Common();
}

function stage2Common() {
    addMsg("Do you have energy for me right now? Let me make your day brighter 😌", 2200);
    setTimeout(() => {
        addOptions([
            { text: "A little 🌸", action: stage3little },
            { text: "Not really 💤", action: stage3really }
        ]);
    }, 4500);
}

function stage3little() {
    loveScore += 1;
    addMsg("That’s my girl 🥰💞", 1000);
    addMsg("You always try, and that means everything 🌟✨", 2600);
    setTimeout(stage3Common, 1500);
}

function stage3really() {
    loveScore -= 1;
    addMsg("Come on now, trust me you will love it 🫂", 1000);
    addMsg("just give it a try okay 🌙✨", 2600);
    setTimeout(stage3Common, 2500);
}

// Stage 3
function stage3Common() {
    addMsg("I have a surprise for you… where do you think it is? PICK WISELY 💭❤️");
    setTimeout(() => {
        addOptions([
            { text: "Option A 🫂", action: stage4optionA },
            { text: "Option B 💖", action: stage4optionB },
            { text: "Option C 🥰", action: stage4optionC }
        ]);
    }, 3000);
}

function stage4optionA() {
    addMsg("Hmm… not quite 😅", 1000);
    addMsg("Try again 🌟✨", 2600);
    setTimeout(stage3Common, 2500);
}

function stage4optionB() {
    addMsg("Almost… but not yet 😉", 1000);
    addMsg("I believe in you 🌟✨", 2600);
    setTimeout(stage3Common, 1500);
}

function stage4optionC() {
    loveScore += 2;
    addMsg("How did you know? 🥹❤️", 1000);
    addMsg("Yes… it’s for you, got a gift its at home 🎁✨", 2600);
    addMsg("And tickets to Sixsus show 🎶💖", 4200);
    addMsg("It may not be perfect… but i hope you love it 💞", 5800);
    setTimeout(stage4Common, 8000);
}

// Stage 4
function stage4Common() {
    addMsg("Can I ask you something gently? 🥺");
    addMsg("Do you feel better right now? ❤️", 2200);

    setTimeout(() => {
        addOptions([
            { text: "Much better 💕", action: stage5better },
            { text: "Still having a bad day 😔", action: stage5badday }
        ]);
    }, 4500);
}

function stage5better() {
    loveScore += 2;
    addMsg("That's so good to hear 💕✨", 1000); 
    addMsg("I'm so proud of you 🥰", 2600); 
    setTimeout(() => stage5(), 3500);
}

function stage5badday() {
    loveScore -= 1;
    addMsg("I'm sorry you're still having a hard day, dont worry 😔", 1000);
    addMsg("when you come back i promise to cubble you still you cant breath ❤️✨", 2600);
    setTimeout(stage5, 3500);
}

// -------- FINAL STAGE (SECRET ENDINGS) --------
function stage5() {
    bgMusic.volume = 0.25;

    addMsg(`Miss ${herName}… 🥹✨`);
    addMsg("My love… 💎❤️", 2600);

    if (loveScore >= 5) {
        // 💖 GOOD ENDING
        addMsg("You unlocked something special… 🔐💖", 4200);
        addMsg("Even on my hardest days, YOU are my peace 🫂✨", 5800);
        addMsg("You are my safe place, my heart, my forever ♾️❤️", 7400);
        addMsg("I love you more than words could ever say 💍💞", 9000);
    } else {
        // 🫂 SOFT ENDING
        addMsg("No matter how today felt… 🫂", 4200);
        addMsg("I’m proud of you for trying 💞✨", 5800);
        addMsg("You don’t have to be okay for me to love you ❤️", 7400);
        addMsg("I’m right here… always 💖🌙", 9000);
    }

    setTimeout(() => {
    fadeOutMusic(); // fade & stop music

    // Fade out chat container
    chat.classList.add("fade-out");
    if (navigator.vibrate) navigator.vibrate([60, 120, 60]);

    setTimeout(() => {
        chat.style.display = "none";

        const final = document.getElementById("finalSurprise");
        final.style.display = "flex";   // enable container
        final.classList.remove("hidden");

        // 🎊 Launch confetti
        launchConfetti();
    }, 1500);

}, 13000);
}

function launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const confettiCount = 150;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * confettiCount,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((c, i) => {
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
            ctx.stroke();

            c.tiltAngle += c.tiltAngleIncremental;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.tilt = Math.sin(c.tiltAngle) * 15;

            if (c.y > canvas.height) {
                confetti[i] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: c.tilt,
                    tiltAngleIncremental: c.tiltAngleIncremental,
                    tiltAngle: c.tiltAngle
                };
            }
        });
        requestAnimationFrame(draw);
    }

    draw();
}