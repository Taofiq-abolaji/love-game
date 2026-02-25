
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

    noBtn.style.left = "55%";
    noBtn.style.top = "0px";

    noBtn.onmouseover = () => {
        const maxX = row.clientWidth - noBtn.offsetWidth;
        const maxY = 200; // limit vertical movement
        noBtn.style.left = Math.random() * maxX + "px";
        noBtn.style.top = Math.random() * maxY + "px";
    };
}

function yes() {
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
            box.remove(); // 👈 remove options after click
            o.action();
        };
        box.appendChild(btn);
    });
    chat.appendChild(box);
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
    addMsg("That makes my heart smile 🥰💞", 1000);
    addMsg("The world is brighter when you're Happpy 🌟✨", 2600);
    setTimeout(() => stage2Common(), 1500);
}
function stage2Tired() {
    addMsg("Come here… 🫂💗 you’ve done so well today", 1000);
    addMsg("remember am home waiting for you 🌟✨", 2600);
    setTimeout(() => stage2Common(), 1500);

}
function stage2Sad() {
    addMsg("Oh love… 🥺💔 I wish I could hold you right now");
    stage2Common();
}

function stage2Common() {
    addMsg("Do you have energy for me right now? let me make you day a little brighter 😌", 2200);
    setTimeout(() => {
        addOptions([
            { text: "A little 🌸", action: stage3little },
            { text: "Not really 💤", action: stage3really }
        ]);
    }, 4500);
}

function stage3little() {
    addMsg("That my girl 🥰💞", 1000);
    addMsg("You alway see the bright side of life 🌟✨", 2600);
    setTimeout(() => stage3Common(), 1500);
}
function stage3really() {
    addMsg("Come on now, trust me you will love it", 1000);
    addMsg("just give it a try okay 🌟✨", 2600);
    setTimeout(() => stage3Common(), 2500);

}

// Stage 3
function stage3Common() {
    addMsg("i have a suprise for you, where do you think it is? PICK WISELY. 💭❤️");
    setTimeout(() => {
        addOptions([
            { text: "option A 🫂", action: stage4optionA },
            { text: "option B 💖", action: stage4optionB },
            { text: "option C 🥰", action: stage4optionC }
        ]);
    }, 3000);
}

// Stage 2
function stage4optionA() {
    addMsg("option A is not the right choice 🥰", 1000);
    addMsg("try another 🌟✨", 2600);
    setTimeout(() => stage3Common(), 2500);
}
function stage4optionB() {
    addMsg("nop, wrong answer", 1000);
    addMsg("i believe you just have to try harder 🌟✨", 2600);
    setTimeout(() => stage3Common(), 1500);

}
function stage4optionC() {
    addMsg("how did you get here?", 1000);
    addMsg("well i got you a gift  🌟✨", 2600);
    addMsg("and also ticket to sixsus show🌟✨", 4200);
    addMsg("sorry it isn't perfect but i hope you like it 🌟✨", 5800);
    addMsg("if only you know how much i love you 🌟✨", 7400);
    setTimeout(() => stage4Common(), 9000)
}


// Stage 4
function stage4Common() {
    addMsg("Can I ask you something gently? 🥺");
    addMsg("Do you feel right now? ❤️", 2200);

    setTimeout(() => {
        addOptions([
            { text: "much better 💕", action: stage5better },
            { text: "Still having a bad day 😔", action: stage5badday }
        ]);
    }, 4500);
}

function stage5better() {
    addMsg("That's so good to hear 💕✨", 1000);
    addMsg("I'm so proud of you 🥰", 2600);
    setTimeout(() => stage5(), 1500);
}
function stage5badday() {
    addMsg("I'm sorry you're still having a hard day, dont worry 😔", 1000);
    addMsg("when you come back i promise to cubble you still you cant breath ❤️✨", 2600);
    setTimeout(() => stage5(), 1500);
}
 

// Stage 5 – Final
function stage5() {
    addMsg(`Miss ${herName}…,🥹✨`);
    addMsg("ifemi 💎❤️", 2600);
    addMsg("my love, i just want you to know . 💎❤️", 4000);
    addMsg(" that You are deeply loved. Chosen. Cherished. 💎❤️", 5700);
    addMsg("No matter how your day feels… i will always be right here, waiting for you 🫂💭", 7000);
    addMsg("Always yours ❤️♾️", 10000);
    addMsg("i love you ❤️♾️", 12000);
}
