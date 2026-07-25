# 📈 DASHFORGE - Real-Time Market Monitoring Platform

A powerful, fast, and intuitive market monitoring website that provides real-time stock prices, financial data, and market insights at your fingertips.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow)
![Express](https://img.shields.io/badge/Backend-Express.js-green)
![Node](https://img.shields.io/badge/Node.js-v14+-brightgreen)

---

## 🎯 Features

✅ **Real-Time Stock Tracking** - Get live stock prices and market data  
✅ **Multiple Data Sources** - Integrated with Twelve Data and Yahoo Finance APIs  
✅ **Fast & Lightweight** - Vanilla JavaScript for optimal performance  
✅ **Responsive Design** - Works seamlessly on desktop and mobile  
✅ **Market Insights** - Financial data and market trends  
✅ **Easy Integration** - RESTful API backend with CORS support  
✅ **MongoDB Support** - Store user data and favorites  

---

## 🛠️ Tech Stack

### Frontend
- **Vanilla JavaScript** - Pure JS for lightweight, fast performance
- **HTML5 & CSS3** - Modern, responsive UI
- **Fetch API** - For API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js v5.2.1** - Fast and minimal web framework
- **RESTful API** - Clean API endpoints
- **MongoDB** - Database for persistent storage
- **CORS** - Cross-origin resource sharing

### APIs Integrated
- **Yahoo Finance API** - Financial information and market data
- **Twelve Data API** - Stock market data, prices, and quotes *(Optional)*

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git**
- MongoDB database (local or cloud)

### Clone the Repository
```bash
git clone https://github.com/OMKAR4587/DASHFORGE.git
cd DASHFORGE
```

### Install Dependencies
```bash
# Install backend dependencies
cd Backend
npm install
```

### Environment Setup
Create a `.env` file in the `Backend` directory using `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dashforge
YAHOO_FINANCE_API_KEY=your_key_here
TWELVE_DATA_API_KEY=your_key_here
```

**Get your API keys:**
- [Yahoo Finance API](https://rapidapi.com/apidojo/api/yh-finance) - Via RapidAPI (Free tier available)
- [Twelve Data API](https://twelvedata.com/) - Free tier with 800 calls/day

### Run the Application

**Development Mode:**
```bash
cd Backend
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
```http
GET /api/stock/:symbol
```
Returns current stock price and market data for the given symbol.

**Example:**
```bash
curl http://localhost:5000/api/stock/AAPL
```

**Response:**
```json
{
  "symbol": "AAPL",
  "price": 150.25,
  "change": 2.5,
  "changePercent": 1.69,
  "timestamp": "2026-07-25T10:30:00Z"
}
```

### Get Market Data
```http
GET /api/market/data/:symbol
```
Returns detailed market and financial information.

### Search Stocks
```http
GET /api/search?query=AAPL
```
Search for stocks by symbol or company name.

### Health Check
```http
GET /api/health
```
Check API server status.

---

## 🚀 Usage

### 1. Start the Backend Server
```bash
cd Backend
npm run dev
```
Server runs on `http://localhost:5000`

### 2. Open Frontend
```bash
# In another terminal, navigate to frontend directory
cd Frontend
# Open index.html in browser or use a local server
```

### 3. Search for Stocks
- Enter stock symbol (e.g., AAPL, GOOGL, MSFT)
- View real-time market data
- Monitor price changes

### 4. Monitor Your Portfolio
- Track multiple stocks
- Get market insights
- View price history

---

## 📸 Screenshots

*Screenshots coming soon! 🎨*

### Features Showcase:
- Stock price tracking interface
- Market data visualization
- Responsive mobile view
- Real-time price updates

---

## 🔄 Project Structure

```
DASHFORGE/
├── Backend/
│   ├── Routes/              # API routes
│   ├── Controllers/         # API logic
│   ├── Models/              # Database models
│   ├── Middleware/          # Custom middleware
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env                 # Environment variables (create from .env.example)
│
├── Frontend/
│   ├── index.html           # Main HTML file
│   ├── style.css            # Styling
│   └── script.js            # JavaScript logic
│
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── LICENSE                  # MIT License
├── CONTRIBUTING.md          # Contribution guidelines
└── README.md                # This file
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

MIT License means you can:
- ✅ Use this project commercially
- ✅ Modify the source code
- ✅ Distribute the software
- ✅ Use it privately

**You must:**
- ✅ Include the license and copyright notice

---

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a feature request? Please open an [issue](https://github.com/OMKAR4587/DASHFORGE/issues) on GitHub.

**Include:**
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## 📞 Contact & Support

- **GitHub:** [@OMKAR4587](https://github.com/OMKAR4587)
- **Portfolio:** [OMKAR4587.github.io/Portfolio](https://OMKAR4587.github.io/Portfolio)
- **Issues:** [GitHub Issues](https://github.com/OMKAR4587/DASHFORGE/issues)

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Twelve Data API Docs](https://twelvedata.com/docs)
- [Yahoo Finance API](https://rapidapi.com/apidojo/api/yh-finance)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vanilla JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🚀 Future Enhancements

- [ ] Portfolio tracking feature
- [ ] Price alerts and notifications
- [ ] Historical price charts
- [ ] User authentication
- [ ] Watchlist functionality
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] Social sharing features

---

## 📊 Project Stats

- **Created:** April 2026
- **Last Updated:** July 2026
- **Status:** Active Development
- **License:** MIT

---

**Built with ❤️ by [Omkar](https://github.com/OMKAR4587)**

*Happy Trading! 📈*