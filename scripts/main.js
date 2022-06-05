const btn = document.getElementById("translate");
const yourname = document.getElementById("yourname");
const results = document.getElementById("results");
let lastValidValue = "";

btn.addEventListener("click", () => {
	let input = yourname.value
		.replace(/\s+/g, " ")
		.replace(/[^\w\s]/gi, "")
		.trim();
	if (input == " " || !input) {
		alert("Please something valid!");
		yourname.value = lastValidValue;
	} else {
		let letters = input.toUpperCase().split("");
		let words = input.toUpperCase().split(" ");
		let wordidx = 0;
		results.innerHTML = "";
		let currentWord = words[wordidx];
		let oldWord = "";
		for (let i = 0; i < letters.length; i++) {
			const letter = letters[i];
			currentWord = `words[wordidx]${wordidx}`;
			if (letter == " ") {
				results.innerHTML += '<div class="space"></div>';
				oldWord = `words[wordidx]${wordidx}`;
				wordidx++;
			} else {
				if (currentWord != oldWord) {
					let div = document.createElement("div");
					div.id = currentWord;
					div.style.display = "inline-block";
					results.appendChild(div);
				}
				let wordDiv = document.getElementById(currentWord);
				wordDiv.innerHTML += `<div class="lettercontainer " ><b>${letter}</b>
                    <div class="letter"><img src="./images/${letter}.svg" alt="${letter}"></div>
                </div>`;
			}
		}
		lastValidValue = yourname.value;
	}
});
