# 📈 DASHFORGE - Real-Time Market Monitoring Platform

A powerful, fast, and intuitive market monitoring website that provides real-time stock prices, financial data, and market insights at your fingertips.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow)
![Express](https://img.shields.io/badge/Backend-Express.js-green)

---

## 🎯 Features

✅ **Real-Time Stock Tracking** - Get live stock prices and market data  
✅ **Multiple Data Sources** - Integrated with Twelve Data and Yahoo Finance APIs  
✅ **Fast & Lightweight** - Vanilla JavaScript for optimal performance  
✅ **Responsive Design** - Works seamlessly on desktop and mobile  
✅ **Market Insights** - Financial data and market trends  
✅ **Easy Integration** - RESTful API backend  

---

## 🛠️ Tech Stack

### Frontend
- **Vanilla JavaScript** - Pure JS for lightweight, fast performance
- **HTML5 & CSS3** - Modern, responsive UI
- **Fetch API** - For API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Fast and minimal web framework
- **RESTful API** - Clean API endpoints

### APIs Integrated
- **Twelve Data API** - Stock market data, prices, and quotes
- **Yahoo Finance API** - Financial information and market data

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Clone the Repository
```bash
git clone https://github.com/OMKAR4587/DASHFORGE.git
cd DASHFORGE
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
TWELVE_DATA_API_KEY=your_twelve_data_api_key_here
YAHOO_FINANCE_API_KEY=your_yahoo_finance_api_key_here
NODE_ENV=development
```

Get your API keys:
- [Twelve Data API](https://twelvedata.com/) - Free tier available
- [Yahoo Finance API](https://rapidapi.com/apidojo/api/yh-finance) - Via RapidAPI

### Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The application will be available at `http://localhost:5000`

---

## 📖 API Endpoints

### Get Stock Price
```
GET /api/stock/:symbol
```
Returns current stock price and market data for the given symbol.

**Example:**
```bash
curl http://localhost:5000/api/stock/AAPL
```

### Get Market Data
```
GET /api/market/data/:symbol
```
Returns detailed market and financial information.

### Search Stocks
```
GET /api/search?query=AAPL
```
Search for stocks by symbol or company name.

---

## 🚀 Usage

1. **Start the server**
   ```bash
   npm start
   ```

2. **Open in browser**
   ```
   http://localhost:5000
   ```

3. **Search for stocks** and get real-time market data

4. **Monitor your portfolio** with live price updates

---

## 📸 Screenshots

*(Add your screenshots here)*

---

## 🔄 Project Structure

```
DASHFORGE/
├── public/              # Frontend files
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/              # Backend files
│   ├── routes/          # API routes
│   ├── controllers/      # API logic
│   ├── middleware/       # Custom middleware
│   └── server.js        # Main server file
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a feature request? Please open an [issue](https://github.com/OMKAR4587/DASHFORGE/issues) on GitHub.

---

## 📞 Contact & Support

- **GitHub:** [OMKAR4587](https://github.com/OMKAR4587)
- **Portfolio:** [OMKAR4587.github.io/Portfolio](https://OMKAR4587.github.io/Portfolio)

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Twelve Data API Docs](https://twelvedata.com/docs)
- [Vanilla JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

**Built with ❤️ by [Omkar](https://github.com/OMKAR4587)**

*Last Updated: July 2026*