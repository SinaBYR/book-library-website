export function getRating(stars: number) {
  return '★★★★★☆☆☆☆☆'.slice(5 - stars, 10 - stars);
}