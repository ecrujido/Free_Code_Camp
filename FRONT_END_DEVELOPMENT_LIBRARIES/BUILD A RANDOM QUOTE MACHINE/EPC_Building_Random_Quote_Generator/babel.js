const randomColors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857"
];

const quoteContainer = document.getElementById("quote-text");
const quoteText = document.getElementById("text");
const newQuoteBtn = document.getElementById("new-quote");
const quoteAuthor = document.getElementById("quote-author");
const author = document.getElementById("author");

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * randomColors.length);
  return randomColors[randomIndex];
}

function getQuote() {
  const quotesURL =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  fetch(quotesURL)
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const randomQuote = data.quotes[randomIndex];
      displayQuote(randomQuote);
    })
    .catch((error) => console.error("Error fetching quotes:", error));
}

function displayQuote(quote) {
  quoteText.textContent = `"${quote.quote}" - `;
  author.textContent = `${quote.author}`;
  quoteText.style.backgroundColor = getRandomColor();
  author.style.color = getRandomColor();
}

newQuoteBtn.addEventListener("click", getQuote);

// Initial quote display
getQuote();