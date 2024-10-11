
# TradeBrains NIFTY Movers and Stock Details App

A Next.js application to view NIFTY stock movers (Top Gainers, Losers, Volume Movers) and search for stock details with real-time data visualization.

## Features

- **View NIFTY Movers**: Access top gainers, losers, and volume movers.
- **Search Stocks**: Search for stocks using dynamic search functionality.
- **Stock Details**: In-depth details for each stock, including trends.
- **Interactive Charts**: Visualize stock performance using Chart.js.
- **Responsive Design**: Built with Tailwind CSS for all devices.

## Tech Stack

- **Next.js**
- **Axios**
- **Chart.js**
- **Tailwind CSS**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tradebrains-nifty-movers.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tradebrains-nifty-movers
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```
Open your browser and go to `http://localhost:3000`.

## API Endpoints

- **NIFTY Movers**: 
  - `GET https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/`
- **Stock Search**: 
  - `GET https://portal.tradebrains.in/api/assignment/search?keyword={keyword}&length=10`
- **Stock Details**: 
  - `GET https://portal.tradebrains.in/api/assignment/stock/{symbol}/prices?days=30&type=INTRADAY`

## Folder Structure

```bash
├── components
│   ├── Navbar.js
│   ├── StockSearch.js
├── pages
│   ├── index.js
│   ├── nifty-movers.js
│   └── stocks
│       └── [symbol].js
├── public
├── styles
└── README.md
```

## Deployment

Deploy the app using Vercel or Netlify. For Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy:
   ```bash
   vercel
   ```

## License

This project is licensed under the MIT License.

## Author

**Mohd Suaib Warsi**

- GitHub: [suaib92](https://github.com/suaib92)
- LinkedIn: [Mohd Suaib Warsi](https://www.linkedin.com/in/mohd-suaib-warsi)



