import fetch from 'node-fetch';

export async function getRandomQuote() {
  const response = await fetch('https://api.quotable.io/quotes/random?tags=wisdom');

  const quote = await response.json();
  return {
    text: quote.content as string,
    author: quote.author as string
  }
}