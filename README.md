# 🎬 Movie Hub

A dark-themed movie browsing web app with a fullscreen embedded video player. The front end is built with plain HTML, CSS, and vanilla JavaScript — no framework, no build step — and a small serverless API (Cloudflare Workers) provides the data.

**🌐 Live demo:** [https://sportlink-movie-hub.pages.dev/](https://sportlink-movie-hub.pages.dev/)

---

## ✨ Features

- **Tab-based navigation** – Spotlight, Trending, Popular, Top, and Now Playing sections
- **Live search** – filter movies, TV shows, and anime by title, year, or type
- **Glassmorphism cards** with hover animations and star ratings
- **Dedicated player page** (`player.html`) with true browser fullscreen and auto-hiding controls (title, fullscreen toggle, close button)
- **Responsive grid layout** that adapts to any screen size
- **Graceful error state** if the data fails to load
- **Serverless API** in `api/` configured for Cloudflare Workers via `wrangler.toml`

---

## 📁 Project Structure

```
.
├── api/
│   └── index.js        # Serverless API (Cloudflare Worker entry point)
├── index.html          # Home page: tabs, search, movie grid
├── player.html         # Fullscreen video player page
├── wrangler.toml       # Cloudflare Workers configuration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🗂️ Movie Data

Each movie object contains:

| Field      | Description                                 |
| ---------- | ------------------------------------------- |
| `title`    | Display title                               |
| `year`     | Release year                                |
| `type`     | `movie`, `tv`, or `anime`                   |
| `rating`   | Rating value shown as stars                 |
| `poster`   | TMDB poster path (e.g. `/abc123.jpg`)       |
| `overview` | Short description                           |
| `iframe`   | Embed URL used by the player                |

Example:

```json
{
  "title": "Example Movie",
  "year": 2024,
  "type": "movie",
  "rating": 7.8,
  "poster": "/example-poster.jpg",
  "overview": "A short description of the movie.",
  "iframe": "https://example.com/embed/12345"
}
```

---

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/sayanpal514-hue/MOVIE-HUB-LIVE.git
   cd MOVIE-HUB-LIVE
   ```
2. Serve the front end with a local server (VS Code **Live Server**, or):
   ```bash
   npx serve .
   ```
3. To run the API locally with [Wrangler](https://developers.cloudflare.com/workers/wrangler/):
   ```bash
   npx wrangler dev
   ```

> ⚠️ Open the site through a local server rather than `file://`, otherwise browsers may block data requests (CORS).

---

## 🚀 Deployment

- **Front end:** hosted on Vercel at [movie-hub-s10.vercel.app](https://movie-hub-s10.vercel.app/). Push to `main` to update it.
- **API:** deploy the Worker with Wrangler:
  ```bash
  npx wrangler deploy
  ```

Never commit API keys or secrets. Store them with `npx wrangler secret put <NAME>` and keep local files such as `.dev.vars` in `.gitignore`.

---

## 📝 Disclaimer

Movie Hub only shows metadata and embeds third-party players. It does not host any video content. Make sure any embed sources you use comply with applicable laws and their terms of service.

---

## 📄 License

See the [LICENSE](LICENSE) file for details.

## Support This Project
Your single click = big help ☕

✨ Click here to support by clicking [ https://sportlink10-ajp.pages.dev/support  ]( https://sportlink10-ajp.pages.dev/support  )✨


---

Created by **Sayan Pal**
