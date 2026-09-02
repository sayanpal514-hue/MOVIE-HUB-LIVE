# 🎬 Movie Hub

A single-page, dark-themed movie browsing UI with a fullscreen embedded video player. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

---

## ✨ Features

- **Tab-based navigation** – switch between Spotlight, Trending, Popular, Top, and Now Playing sections
- **Live search** – filter movies, TV shows, and anime by title, year, or type
- **Glassmorphism card design** with hover animations and star ratings
- **Fullscreen video player** – opens in true browser fullscreen with auto-hiding controls (title, fullscreen toggle, close button)
- **Responsive grid layout** that adapts to any screen size
- **Graceful error state** if the data file is missing or fails to load
- **Auto-deploy** via GitHub Actions to Vercel

---

## 📁 File Structure

```
.
├── index.html               
├── player.html
             

```

---


```

Each movie object should contain: `title`, `year`, `type`, `rating`, `poster` (TMDB path), `overview`, and `iframe`.

---

## 🚀 Deployment

This project is automatically deployed to Vercel via GitHub Actions.

To deploy manually:

1. Push your changes to the `main` branch.
2. The GitHub Action will build and deploy the site to Vercel.

---

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/sayanpal514-hue/MOVIE-HUB-LIVE.git
   cd MOVIE-HUB-LIVE
   ```
2. Open `index.html` in your browser — no server required.

> 💡 For the best experience, serve the project with a local development server (e.g., VS Code Live Server) to avoid CORS issues.



## 🌐 Live Demo

[View Live](https://movie-hub-s10.vercel.app/)

---

Created by **Sayan Pal**

