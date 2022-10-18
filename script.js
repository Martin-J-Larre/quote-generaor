const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote-btn');
const loader = document.getElementById('loader');

let apiQuotes = [];

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const unLoading = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    !quote.author ? quoteAuthor.textContent = "Unknown" : quoteAuthor.textContent = quote.author;

    quote.text.length > 100 ? quoteText.classList.add('.long-quote') : quoteText.classList.remove('.long-quote')

    quoteText.textContent = quote.text;
    unLoading();
}

const getQuote = async () => {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        console.log('Error', err);
    }
}

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
