# Movie Hub

A single-page, dark-themed movie browsing UI with a fullscreen embedded video player. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

## Features

- **Spotlight & Trending sections** rendered from a JSON data source
- **Glassmorphism card design** with hover animations and star ratings
- **Fullscreen video player** — opens in true browser fullscreen with auto-hiding controls (title, fullscreen toggle, close button)
- **Responsive grid layout** that adapts to any screen size
- **Graceful error state** if the data file is missing or fails to load

## File structure

```
.
├── index.html.html   
└── movie.json                 
```

## Setup

1. Place `sportlink-movie-hub.html` and `movie.json` in the same directory.
2. Serve the folder with any static file server (the page uses `fetch()`, which requires `http://` rather than opening the file directly as `file://`).

   ```bash
   # Example using Python
   python3 -m http.server 8000
   ```

3. Open `http://localhost:8000/sportlink-movie-hub.html` in your browser.

## `movie.json` format

The page expects this shape:

```json
{
  "success": true,
  "data": {
    "spotlight": [
      {
        "title": "Movie Title",
        "year": 2024,
        "type": "movie",
        "rating": 8.4,
        "poster": "/path-to-poster.jpg",
        "overview": "Short description of the movie.",
        "iframe": "https://example.com/embed/12345"
      }
    ],
    "trending": [
      { "...": "same shape as above" }
    ]
  }
}
```

| Field      | Type   | Notes                                                              |
|------------|--------|---------------------------------------------------------------------|
| `title`    | string | Displayed on the card and in the fullscreen player's title bar      |
| `year`     | number | Release year                                                        |
| `type`     | string | e.g. `"movie"` or `"series"` — shown uppercased                     |
| `rating`   | number | Displayed as `★ X.X`                                                |
| `poster`   | string | TMDB poster path; prefixed with `https://image.tmdb.org/t/p/w500`   |
| `overview` | string | Synopsis, clamped to 3 lines on the card                            |
| `iframe`   | string | Full embed URL used as the `<iframe src>` in the player             |



