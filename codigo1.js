const verseChoose = document.querySelector('select');
const poemDisplay = document.querySelector('pre');

verseChoose.addEventListener("change",()=> updateDisplay(verseChoose.value));

const updateDisplay = async verse => {
    verse = verse.replace(" ", "");
    verse = verse.toLowerCase();

    let res = await fetch(`${verse}.txt`)
    let texto = await res.text();
    poemDisplay.textContent = texto;
};

addEventListener("load",()=> updateDisplay(verseChoose.value));