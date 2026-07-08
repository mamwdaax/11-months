const fs = require('fs');

const animeList = [
  "Attack on Titan",
  "Frieren",
  "Death Note",
  "Erased",
  "Haikyu",
  "Odd Taxi",
  "Princess Mononoke",
  "Spirited Away",
  "The Wind Rises",
  "My neighbor Totoro"
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchAnime() {
  const results = [];
  
  for (let title of animeList) {
    try {
      console.log(`Fetching: ${title}`);
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`);
      const json = await res.json();
      
      if (json.data && json.data.length > 0) {
        const anime = json.data[0];
        results.push({
          id: anime.mal_id.toString(),
          title: anime.title_english || anime.title,
          image: anime.images.jpg.large_image_url,
          synopsis: anime.synopsis,
          genres: anime.genres.map(g => g.name)
        });
      } else {
        console.log(`No results for ${title}`);
      }
      // Jikan rate limit is 3 requests per second, so delay 500ms
      await delay(500);
    } catch (e) {
      console.error(`Error fetching ${title}:`, e);
    }
  }

  fs.writeFileSync('src/nishy_anime_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to src/nishy_anime_data.json');
}

fetchAnime();
