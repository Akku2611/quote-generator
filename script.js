const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuoteFromAPI() {
    showLoadingSpinner();
    try {
        const response = await fetch("https://type.fit/api/quotes");
        //const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        const randomQuote = Math.floor(Math.random() * 1600);
        if(data[randomQuote].author === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data[randomQuote].author;
        }

        if(data[randomQuote].text.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[randomQuote].text;
        
        removeLoadingSpinner();
    } 

    catch(error) {
        getQuoteFromAPI();
    }
}

//Tweet Quote

function tweetQuote() {
    const quotes = quoteText.innerText;
    const authors = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes} - ${authors}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuoteFromAPI();