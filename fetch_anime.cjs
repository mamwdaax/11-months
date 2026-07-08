const fs = require('fs');
const https = require('https');

const anime_watched = [
    "Death Note",
    "Attack on Titan",
    "Odd Taxi",
    "Haikyuu!!",
    "Frieren: Beyond Journey's End",
    "Erased",
    "Princess Mononoke",
    "Spirited Away",
    "The Wind Rises",
    "My Neighbor Totoro"
];

const anime_to_watch = [
    "Mushishi",
    "ReLIFE",
    "My Teen Romantic Comedy SNAFU",
    "Witch Hat Atelier",
    "I want to eat your pancreas",
    "Re:Zero",
    "Dr. Stone",
    "Chainsaw Man",
    "Jujutsu Kaisen",
    "Vinland Saga",
    "Mob Psycho 100",
    "Kaguya-sama: Love is War",
    "Dororo",
    "Pluto",
    "Terror in Resonance"
];

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
    const results = { watched: [], toWatch: [] };

    for (const title of anime_watched) {
        console.log(`Fetching ${title}...`);
        try {
            const data = await fetchJson(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`);
            if (data && data.data && data.data.length > 0) {
                const result = data.data[0];
                results.watched.push({
                    id: String(result.mal_id),
                    title: result.title_english || result.title,
                    image: result.images.jpg.large_image_url,
                    synopsis: result.synopsis ? result.synopsis.split('\n')[0] : "",
                    genres: result.genres.map(g => g.name)
                });
            }
        } catch (e) {
            console.error(`Error fetching ${title}`, e);
        }
        await delay(1000); // Jikan rate limit
    }

    for (const title of anime_to_watch) {
        console.log(`Fetching ${title}...`);
        try {
            const data = await fetchJson(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`);
            if (data && data.data && data.data.length > 0) {
                const result = data.data[0];
                results.toWatch.push({
                    id: String(result.mal_id),
                    title: result.title_english || result.title,
                    image: result.images.jpg.large_image_url,
                    synopsis: result.synopsis ? result.synopsis.split('\n')[0] : "",
                    genres: result.genres.map(g => g.name)
                });
            }
        } catch (e) {
            console.error(`Error fetching ${title}`, e);
        }
        await delay(1000);
    }

    fs.writeFileSync("src/anime_data.json", JSON.stringify(results, null, 2), "utf-8");
    console.log("Done!");
}

main();
