const btn = document.getElementById("translate");
const yourname = document.getElementById("yourname");
const results = document.getElementById("resultsmorse");
const dot = new Audio("audio/dot.wav");
const dash = new Audio("audio/dash.wav");
const play = document.getElementById("play");
const lightbtn = document.getElementById("lightbtn");
const light = document.getElementById("light");
let lastValidValue = "";
let playing = false;

btn.addEventListener("click", () => {
	let input = yourname.value
		.replace(/\s+/g, " ")
		.replace(/[^\w\s]/gi, "")
		.trim();
	if (input == " " || !input) {
		alert("Please enter something valid!");
		yourname.value = lastValidValue;
	} else {
		let letters = input.toUpperCase().split("");
		results.innerHTML = "";
		for (let i = 0; i < letters.length; i++) {
			const letter = letters[i];
			if (letter == " ") {
				results.innerHTML += "/&nbsp;&nbsp;";
			} else {
				results.innerHTML += morse(letter);
				results.innerHTML += "&nbsp;&nbsp;";
			}
		}
		lastValidValue = yourname.value;
	}
});

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
play.addEventListener("click", async () => {
	await playSounds();
});
function morse(letter) {
	switch (letter) {
		case "A":
			return ".-";
		case "B":
			return "-...";
		case "C":
			return "-.-.";
		case "D":
			return "-..";
		case "E":
			return ".";
		case "F":
			return "..-.";
		case "G":
			return "--.";
		case "H":
			return "....";
		case "I":
			return "..";
		case "J":
			return ".---";
		case "K":
			return "-.-";
		case "L":
			return ".-..";
		case "M":
			return "--";
		case "N":
			return "-.";
		case "O":
			return "---";
		case "P":
			return ".--.";
		case "Q":
			return "--.-";
		case "R":
			return ".-.";
		case "S":
			return "...";
		case "T":
			return "-";
		case "U":
			return "..-";
		case "V":
			return "...-";
		case "W":
			return ".--";
		case "X":
			return "-..-";
		case "Y":
			return "-.--";
		case "Z":
			return "--..";
		case "1":
			return ".----";
		case "2":
			return "..---";
		case "3":
			return "...--";
		case "4":
			return "....-";
		case "5":
			return ".....";
		case "6":
			return "-....";
		case "7":
			return "--...";
		case "8":
			return "---..";
		case "9":
			return "----.";
		case "0":
			return "-----";
		default:
			return "";
	}
}

async function playSounds() {
	let dotd = dot.duration * 1000;
	let dashd = dash.duration * 1000;
	if (playing) {
		return;
	}
	playing = true;
	let morse = results.innerHTML;
	let morseArr = morse.split(" ").join().split("&nbsp;&nbsp;");
	for (let i = 0; i < morseArr.length; i++) {
		results.innerHTML = morse;
		if (morseArr[i] == "/") {
			await timer(500);
		} else {
			let morseLetter = morseArr[i];
			let temp = morseLetter;
			let letter = morseLetter.split("");
			for (let j = 0; j < letter.length; j++) {
				let temp2 = morseArr[i].split("");
				temp2[j] = `<span style="background:green">${temp2[j]}</span>`;
				morseArr[i] = `<span style="background:lime">${temp2.join("")}</span>`;
				results.innerHTML = morseArr.join("&nbsp;&nbsp;").split().join(" ");
				if (letter[j] == ".") {
					dot.play();
					light.classList.add("lighton");
					await timer(dotd);
					light.classList.remove("lighton");
					await timer(100);
				} else if (letter[j] == "-") {
					dash.play();
					light.classList.add("lighton");
					await timer(dashd);
					light.classList.remove("lighton");
					await timer(100);
				}
				morseArr[i] = temp;
			}
		}
	}
	playing = false;
	results.innerHTML = morse;
}

lightbtn.addEventListener("click", () => {
	light.classList.toggle("lightactive");
});
