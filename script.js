var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    fetch('send_mail.php')
      .then(response => {
        if (response.ok) {
          button.textContent = "Check Your Email 🥹";
        } else {
          console.error('Failed to send email');
          button.textContent = "Error 😞";
        }
      })
      .catch(error => {
        // Handle network errors or other issues
        console.error('Error:', error);
        button.textContent = "Error 😞";
      });
  }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(24, window.innerWidth / 30); // Adjust font size based on screen width
    var lineHeight = 6; // Adjusted line height
    var lines = [
        "Hi Sav, How have you been? 😊",
        "I hope you are doing well 🧧",
        "I've been thinking a lot about whatever happened lately, and I wanted to express what I have been feeling in my mind💭",
        "Firstly, I want you to know that I genuinely care💗 about your well-being", 
        "I keep wondering if u have been eating🍴, sleeping🛌 and studying📖 well",
        "Reflecting on our time together, I realize that I have done wrongful things where I haven't treated u better😔",
        "I acknowledge that my behavior, particularly my jealousy and insecurity, have hurt you deeply💔",
        "I want you to understand that I've grown 💪 a lot since the breakup and have been better",
        "I wished I had early communication 🗣️ from u so I could have fixed things soon",
        "I want to sincerely apologize 🙏 for the pain I've caused you",
        "Saying 'I'm sorry' feels really inadequate considering the intensity of my mistakes, but please know that my apology is genuine🥺",
        "I take full responsibility for my actions 🙇",
        "I respect you still a lot, and I value our relationship. You have done a lot for me in the relationship which no one could💝",
        "I've spent a lot of time thinking 🕡 about our relationship💞, and I've come to realize how much you mean to me",
        "I miss you deeply 🥺, and I can't stop thinking about the moments we shared together 🤗",
        "I am really sorry. I respect your feelings 👑",
        "Please forgive me 🫶",
        "With love and sincerity 💖, Apoorv"
    ];

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Calculate current line index based on frame number
    var currentLineIndex = Math.floor(frameNumber / 200);

    // Display current line
    if (currentLineIndex < lines.length) {
        var currentLine = lines[currentLineIndex];
        context.fillStyle = `rgba(45, 45, 255, 1)`;
        context.fillText(currentLine, canvas.width / 2, canvas.height / 2);

        // Increment frame number
        frameNumber++;

        // Continue animation until all lines are displayed
        setTimeout(drawText, 3000 * lines.length); // Display each line for 3 seconds
    } else {
        // Reset shadow effect
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

        // Show "I love u" message above the button
        var loveMessage = document.createElement("div");
        loveMessage.textContent = "I love u ❤️";
        loveMessage.style.fontSize = "100px";
        loveMessage.style.color = "red";
        loveMessage.style.textAlign = "center";
        loveMessage.style.position = "absolute";
        loveMessage.style.top = "250px"; // Adjust the top position as needed
        loveMessage.style.width = "100%";
        document.body.appendChild(loveMessage);

        // Show the button
        button.style.display = "block";
    }
}



function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);

