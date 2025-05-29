
NLHomeScout is a property search platform designed to simplify the process of finding rental and sale listings across the Netherlands. By aggregating data from multiple real estate websites (like Pararius), the platform provides a centralized and convenient way to explore available properties.

## 🚧 Current Progress

- **🔐 User Authentication**  
  Session-based login and registration system with secure credential handling.

- **🐍 Backend Scraper (Python)**  
  An efficient Python-based web scraper that extracts property data from various sources. It runs as a background service and stores listings in a structured format in the database.

- **🗃️ Database Integration**  
  Extracted property data is cleaned and stored for quick access and filtering, supporting future search functionality.

- **📦 Tech Stack So Far**
  - **Backend**: Python (scraper), Express (API server)
  - **Auth & Sessions**: Express-session, cookie-based handling
  - **Database**: MongoDB
  - **Frontend (planned)**: Next.js with Tailwind CSS for a modern, responsive UI

## 🌟 Planned Features

- 🔎 **Advanced Search Filters** (location, price, size, furnishing, etc.)
- 📍 **Interactive Map View** using Leaflet or Google Maps
- 📬 **Email Alerts** for saved searches and new matching listings
- 🏷️ **Tagging and Favorites** for user-saved properties
- 📈 **Market Insights Dashboard** (rent trends, availability by region)
- 🕵️‍♂️ **Automatic Deduplication** of listings across platforms


## 🎯 Vision

The goal of NLHomeScout is to become a one-stop platform for discovering verified rental and purchase listings across the Netherlands. The platform aims to reduce the frustration of searching across multiple sources manually.

*Development is ongoing — stay tuned for updates and a live demo soon!*
