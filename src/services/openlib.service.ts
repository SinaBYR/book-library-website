import fetch from 'node-fetch';
import { HttpResponseError } from '../utils/errors';

export async function getTopSubjects() {
  const response = await fetch('https://openlibrary.org/search/subjects.json?q=%2A&limit=10');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const subjects = await response.json();

  return subjects;
}

export async function getTrendingBooks() {
  const response = await fetch('https://openlibrary.org/trending/now.json?limit=10');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const books = await response.json();

  return books;
}