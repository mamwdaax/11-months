const fs = require('fs');

const ids = [
  16498, // Attack on Titan
  52991, // Frieren
  1535, // Death Note
  31043, // Erased
  20583, // Haikyu!!
  46102, // Odd Taxi
  164, // Princess Mononoke
  199, // Spirited Away
  16662, // The Wind Rises
  523, // My Neighbor Totoro
];

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchAnime() {
  const results = [];
  
  for (let id of ids) {
    try {
      console.log(`Fetching ID: ${id}`);
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const json = await res.json();
      
      if (json.data) {
        const anime = json.data;
        results.push({
          id: anime.mal_id.toString(),
          title: anime.title_english || anime.title,
          image: anime.images.jpg.large_image_url,
          synopsis: anime.synopsis,
          genres: anime.genres.map(g => g.name)
        });
      } else {
        console.log(`No results for ${id}:`, json);
      }
      // 1 request per second to be safe
      await delay(1000);
    } catch (e) {
      console.error(`Error fetching ${id}:`, e);
    }
  }

  fs.writeFileSync('src/nishy_anime_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to src/nishy_anime_data.json');
}

fetchAnime();
