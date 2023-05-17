import fetch from 'node-fetch';
import { HttpResponseError } from '../utils/errors';

export async function getTrendingBooks() {
  const response = await fetch('https://openlibrary.org/trending/now.json?limit=5');
  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const books = response.json();
  return books;
}