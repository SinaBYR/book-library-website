import fetch from 'node-fetch';
import { HttpResponseError } from '../utils/errors';
import { getRating } from '../utils/getRating';

export async function getWork(bookId: string) {
  const promises = [
    getWorkUserStats(bookId),
    getWorkRating(bookId),
    getWorkMetaData(bookId)
  ];

  const data = await Promise.allSettled(promises);

  return {
    // @ts-ignore
    ...data[2].value,
    // @ts-ignore
    rating: data[1].value,
  };
}

async function getWorkUserStats(bookId: string) {
  const response = await fetch('https://openlibrary.org/works/' + bookId + '/bookshelves.json');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const stats = await response.json();

  return stats;
}

async function getWorkRating(bookId: string) {
  const response = await fetch('https://openlibrary.org/works/' + bookId + '/ratings.json');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const result = await response.json();
  const starsNumber = Math.round(result.summary.average);
  const rating = getRating(starsNumber);

  return {
    stars: rating,
    count: result.summary.count
  }
}

async function getWorkMetaData(bookId: string) {
  const response = await fetch('https://openlibrary.org/works/' + bookId + '.json');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const metaData = await response.json();

  const authorsPromises = metaData.authors.map((author: any) => getAuthor(author.author.key));

  const authors = await Promise.all(authorsPromises);

  return {
    title: metaData.title,
    authors,
    description: metaData.description?.value || metaData.description || '- Nothing found to display -',
    subjects: metaData.subjects,
    revision: metaData.revision,
    created_at: metaData.created,
    // could contain more covers
    // it's also possible that a work doesn't have covers
    cover_url: metaData.covers ? 'http://covers.openlibrary.org/b/id/' + metaData.covers[0] + '-M.jpg' : null
  };
}

// key = /authors/authorId
async function getAuthor(key: string) {
  const response = await fetch('https://openlibrary.org' + key + '.json');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const data = await response.json();

  return {
    name: data.name,
    bio: data.bio.value || data.bio,
    remote_ids: data.remote_ids,
    birth_date: data.birth_date,
    // it's possible that an author doesn't have photos
    photo_url: data.photos ? 'https://covers.openlibrary.org/a/id/' + data.photos[0] + '-M.jpg' : null
  };
}

export async function getTopSubjects() {
  const response = await fetch('https://openlibrary.org/search/subjects.json?q=%2A&limit=7');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const subjects = await response.json();

  return subjects;
}

export async function getTrendingBooks() {
  const response = await fetch('https://openlibrary.org/trending/now.json?limit=5');

  if(!response.ok) {
    throw new HttpResponseError(response.status, response.statusText, response);
  }

  const books = await response.json();

  return books;
}