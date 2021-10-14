const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loader

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// loading complete

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
  loading();
  // pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  console.log(quote);

  if (quote.strategy.length > 90) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.strategy;
  complete();
}

// get quote from API
async function getQuotes() {
  loading();
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //   const apiUrl = "http://brianeno.needsyourhelp.org/all";
  const apiUrl = "./all.json";
  try {
    const response = await fetch(apiUrl);
    // const response = await fetch(proxyUrl + apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error
  }
}

// tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - Oblique Strategies`;
  window.open(twitterUrl, "_blank");
}

// event listeners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On load

getQuotes();
