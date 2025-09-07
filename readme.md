# Global Stocks Trading Dashboard

A fully responsive, real-time trading dashboard for monitoring global stock markets — built with **HTML, CSS, and JavaScript**, and powered by live data from the [Finnhub API](https://finnhub.io/). Includes **persistent watchlist**, **dark/light theme toggle**, **sortable stock list**, and a **secure backend for API management**.

> 🔗 **Live Demo:** _Coming soon..._  
> 📸 **Preview:** _Preview GIF/Image will be added after deployment_

---

## 🧭 Overview

The **Global Stocks Trading Dashboard** delivers a sleek, modern interface to track live stock performance across global markets — optimized for all screen sizes and devices.

### 🔑 Key Highlights
- Live stock prices with percentage change tracking  
- Search by stock symbol or company name  
- Personalized watchlist with **local storage persistence**  
- **Dark/Light mode toggle** with saved user preferences  
- **One-click sorting**: top losers (ascending) or top gainers (descending)  
- Real-time **Top Gainers & Losers** summary cards  
- **Auto-refresh** every 30 seconds for updated market data  

---

## 🚀 Features

- **Live Market Data** — Real-time prices from the **Finnhub API**, accessed securely via a custom backend  
- **Persistent Watchlist** — Saved across sessions using **localStorage**  
- **Theme Toggle (Dark/Light)** — Remembered via **localStorage** for a consistent experience  
- **Sorting Control** — Toggle between ascending (top losers) and descending (top gainers)  
- **Instant Search** — Quickly filter stocks by symbol or name  
- **Market Overview Cards** — Display top-performing and underperforming stocks  
- **Auto Updates** — Dashboard refreshes automatically every 30 seconds  
- **Responsive UI** — Fully mobile-friendly and adapts to all screen sizes  

---

## 🛠️ Technology Stack

| Layer       | Technology |
|-------------|------------|
| **Frontend** | HTML, CSS, JavaScript (ES6 Modules) |
| **Backend**  | Node.js, Express (API key proxy and request handling) |
| **API**      | [Finnhub Stock Data API](https://finnhub.io) |

---

## ⚙️ Setup & Usage

```bash
# Clone the repository
git clone https://github.com/Er-SarthakBansal/global-stocks-dashboard.git
cd global-stocks-dashboard
````

```bash
# Backend Setup
cd backend
# Create a .env file with the following content:
# FINNHUB_API_KEY=your_finnhub_api_key_here
npm install
node server.js
```

```bash
# Frontend
# Open index.html in a modern browser using Live Server or any local server
```

---

## ⚠️ Known Limitations

* Backend server must be running locally to fetch live market data
* Initial setup requires running backend and frontend separately

---

## 📌 Future Enhancements

* Deploy backend and frontend for a seamless live experience
* Add real-time stock chart visualizations
* Integrate user authentication for cloud-synced watchlists

---

## 👨‍💻 Author

**Sarthak Bansal**
📧 [sarthakbansal2542003@gmail.com](mailto:sarthakbansal2542003@gmail.com)
🔗 [@Er-SarthakBansal](https://github.com/Er-SarthakBansal)