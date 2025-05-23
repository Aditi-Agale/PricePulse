<center>
  <img src="https://readme-typing-svg.herokuapp.com?color=FFADD8E6&size=40&width=900&height=80&lines=Welcome+to+PricePulse" />
</center>

> A web app that helps users track historical prices of Amazon products over time. Just paste the product URL, and the app fetches and displays price trends along with the product details!

---

## 📚 Table of Contents
- [🚀 Key Features](#-key-features)
- [🌐 Live Preview](#-live-preview)
- [🛠️ Tech Stack](#️-tech-stack)
- [📥 Getting Started](#-getting-started)
- [🔁 Application Flow](#-application-flow)

---

## 🚀 Key Features
- 🔗 **Amazon Product Input**: Users can paste the Amazon product URL to start tracking.
- 📈 **Live Price Graph**: Displays a beautiful line chart showing historical price trends.
- 🏷️ **Current Price Display**: Shows the latest price and a link preview with the product image and title.
- 🎯 **Target Price Alerts**: Users can enter a desired price, and get notified via email if the price drops below it.
- 📬 **Email Notifications**: Integrated email alerts when the tracked product meets the target price.
- ♻️ **Automated Scraping**: Periodically scrapes the product page to check for price changes.

---

## 🌐 Live Preview

> Coming soon! 

---

## 🛠️ Tech Stack

### Frontend  
- React.js  
- Recharts (for graphing)  
- Axios  

### Backend  
- Python (Flask)  
- SQLite  
- APScheduler  

### Others  
- Email Alerts with SMTP  
- Cron jobs / `APScheduler` for scheduled scraping  

---

## 📥 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Aditi-Agale/PricePulse.git
cd PricePulse
```
### 2. Backend (Flask API)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
### 3. Frontend (React.js)
```bash
cd ../frontend
npm install
npm start
```
---
## 🔁 Application Flow


