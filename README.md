<center>
  <img src="https://readme-typing-svg.herokuapp.com?color=00BFFF&size=40&width=900&height=80&lines=Welcome+to+PricePulse+Tracker" />
</center>

> **PricePulse** is a full-stack Amazon price tracking web app that lets users monitor product prices, visualize historical trends, and get notified via email when prices drop below a desired threshold — helping smart shoppers save more.

---

## 📚 Table of Contents
- [🚀 Key Features](#-key-features)
- [🌐 Live Preview](#-live-preview)
- [🛠️ Tech Stack](#️-tech-stack)
- [📥 Getting Started](#-getting-started)

---

## 🚀 Key Features

- 🔍 **Product Tracking**: Users can add Amazon product URLs to start monitoring prices.
- 📉 **Price History Graph**: Visualize product price changes over time using interactive charts.
- 🎯 **Target Price Alerts**: Set a desired price and get notified when it drops below the threshold.
- 🔁 **Automated Scraping**:
  - Scheduler runs every 30 minutes
  - Checks product price and updates history
- 📬 **Email Notifications**: Alerts sent instantly when price drops below the user-defined target.
- 🧠 **Smart Preview**: View live product image, name, current price, and historical chart.
- 🖥️ **Dashboard View**: Manage tracked products and alerts from a clean, responsive UI.

---

## 🌐 Live Preview

**COMING SOON**

---

## 🛠️ Tech Stack

### Frontend  
- React.js  
- Axios  
- Chart.js (for visualizing price history)  
- Custom CSS  

### Backend  
- Python (Flask)  
- SQLite  
- Flask-CORS  
- Flask-SQLAlchemy  
- Requests + BeautifulSoup (for scraping)

### Others  
- APScheduler (for background scraping every 30 mins)  
- SMTP (for email alerts)  
- REST API Architecture  

---

## 📥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aditi-Agale/PricePulse.git
cd PricePulse
```

### Backend Setup (Flask + SQLite)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup (React.js)

```bash
cd ../frontend
npm install
npm start
```
