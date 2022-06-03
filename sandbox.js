    const QuoteC = document.getElementById('quote-c');
    const QuoteText = document.getElementById('quote');
    const QuoteAuthor = document.getElementById('author');
    const TwitterButton = document.getElementById('twitter');
    const NextQuote = document.getElementById('NewQuote');
    const loader = document.getElementById('loader');

    let apiQuotes = [];

    function loading(){
        loader.hidden = false;
        QuoteC.hidden = true;   
    }
    function complete(){
        QuoteC.hidden = false;
        loader.hidden = true; 
    }

    function newQuote(){
        loading();
        const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
        QuoteAuthor.textContent ='- '+ quote.author;
         
        if(quote.text.length > 50){
            QuoteText.classList.add('long-quote');
        }else{QuoteText.classList.remove('long-quote');}
        QuoteText.textContent = quote.text;
        complete();
    }

    async function getQuotes(){
        loading();
        const apiUrl = 'https://type.fit/api/quotes';
        try{
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            newQuote();
            
        }catch(error){
            //alert("oops! there seems to be a problem");
        }
    }

    function tweet(){
        const twitterUrl = `https://twitter.com/intent/tweet?text=${QuoteText.textContent} -${QuoteAuthor.textContent}`;
        window.open(twitterUrl,'_blank');
    }   

    NextQuote.addEventListener('click',newQuote);
    TwitterButton.addEventListener('click', tweet);
    
    getQuotes(); 