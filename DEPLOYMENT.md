# 🚀 MaatiKatha Deployment Guide (Render)

This repository is configured for single-service full-stack deployment on **[Render](https://render.com)**. The Express backend serves both the `/api` endpoints and the production-built React (Vite) client from a single unified URL with zero CORS issues.

---

## 🌟 Prerequisites
- A free account on [Render.com](https://render.com)
- Your GitHub repository: `https://github.com/SwagataGhosh7/maatikatha-original`
- (Optional) API Keys for full AI and live weather features:
  - `GEMINI_API_KEY`: Google Gemini API key ([Google AI Studio](https://aistudio.google.com/app/apikey))
  - `GROK_API_KEY`: xAI Grok or Groq key
  - `WEATHER_API_KEY`: OpenWeatherMap API key
  - `MONGODB_URI`: MongoDB Atlas connection string *(optional — if omitted, the app automatically falls back to the built-in mock database layer)*

---

## 🛠 Option A: 1-Click Render Blueprint (Recommended)

1. Push the latest code to GitHub:
   ```bash
   git add .
   git commit -m "Configure fullstack deployment for Render"
   git push origin main
   ```
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** in the top navigation and select **Blueprint**.
4. Connect your repository `SwagataGhosh7/maatikatha-original`.
5. Render detects [render.yaml](./render.yaml) automatically and presents the configuration.
6. Enter your secret environment variables (`GEMINI_API_KEY`, etc.) when prompted.
7. Click **Apply**. Render will install dependencies, build the frontend, and launch your live service!

---

## 🛠 Option B: Manual Web Service Setup on Render

If you prefer to configure the Web Service manually:

1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** -> **Web Service**.
3. Choose **Build and deploy from a Git repository** and select `maatikatha-original`.
4. Configure the service settings:
   - **Name**: `maatikatha` (or your preferred name)
   - **Region**: Any (e.g. `Oregon (US West)` or `Frankfurt (EU)`)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank — runs from project root)*
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. In the **Environment Variables** section, add:
   | Key | Value | Description |
   |---|---|---|
   | `NODE_ENV` | `production` | Enables production mode & static assets |
   | `DEFAULT_CITY` | `Howrah` | Default city for initial weather forecast |
   | `GEMINI_API_KEY` | *(your key)* | Google Gemini AI engine |
   | `GROK_API_KEY` | *(your key)* | xAI Grok / Groq predictive engine |
   | `WEATHER_API_KEY` | *(your key)* | OpenWeatherMap live weather |
   | `MONGODB_URI` | *(your URI)* | *(Optional)* MongoDB Atlas connection string |
   | `VITE_GOOGLE_MAPS_API_KEY` | *(your key)* | *(Optional)* Google Maps interactive tracking |
6. Click **Create Web Service**.

---

## 🔍 Verifying the Deployment
Once deployed, Render will assign your application a live public URL (e.g., `https://maatikatha.onrender.com`):
1. **Frontend App**: Visit `https://your-app-name.onrender.com/` — your React PWA dashboard will load immediately.
2. **Backend Health Check**: Visit `https://your-app-name.onrender.com/api/health` — should return:
   ```json
   {
     "status": "healthy",
     "timestamp": "...",
     "mongoConnected": true,
     "geminiConfigured": true,
     "grokConfigured": true,
     "weatherConfigured": true
   }
   ```
