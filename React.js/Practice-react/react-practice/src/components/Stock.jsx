import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Stock = () => {
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.42, change: 2.34, changePercent: 1.33 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.87, change: -0.89, changePercent: -0.62 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 389.15, change: 4.21, changePercent: 1.09 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.68, change: -3.12, changePercent: -1.27 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 168.54, change: 1.87, changePercent: 1.12 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.22, change: 8.45, changePercent: 1.74 }
  ]);

  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2;
          const newPrice = parseFloat((stock.price + randomChange).toFixed(2));
          const newChange = parseFloat((newPrice - (stock.price - stock.change)).toFixed(2));
          const newChangePercent = parseFloat(((newChange / (newPrice - newChange)) * 100).toFixed(2));
          
          setAnimatedValues(prev => ({
            ...prev,
            [stock.symbol]: true
          }));

          setTimeout(() => {
            setAnimatedValues(prev => ({
              ...prev,
              [stock.symbol]: false
            }));
          }, 500);

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-blue-800/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">TradeHub Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition">Markets</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Portfolio</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Research</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Trade</a>
            </nav>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Trade Smarter, <span className="text-blue-400">Not Harder</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Access real-time market data, advanced analytics, and execute trades with institutional-grade technology
          </p>
        </div>

        {/* Live Stock Ticker */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-800/30 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Live Market Data</h3>
            </div>
            <span className="text-sm text-gray-400">Real-time updates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className={`bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 hover:border-blue-600/50 transition-all duration-300 ${
                  animatedValues[stock.symbol] ? 'scale-105 shadow-lg shadow-blue-500/20' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white">{stock.symbol}</h4>
                    <p className="text-sm text-gray-400">{stock.name}</p>
                  </div>
                  {stock.change >= 0 ? (
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                  ) : (
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-2xl font-bold text-white">
                      {stock.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {stock.change >= 0 ? (
                      <>
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">
                          +{stock.change.toFixed(2)}
                        </span>
                        <span className="text-green-400 text-sm">
                          (+{stock.changePercent.toFixed(2)}%)
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-semibold">
                          {stock.change.toFixed(2)}
                        </span>
                        <span className="text-red-400 text-sm">
                          ({stock.changePercent.toFixed(2)}%)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-blue-800/20">
            <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-Time Data</h3>
            <p className="text-gray-400">Access live market data and execute trades instantly with zero delay</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-blue-800/20">
            <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-400">Powerful charting tools and technical indicators for informed decisions</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-blue-800/20">
            <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Low Fees</h3>
            <p className="text-gray-400">Competitive pricing with transparent fee structure and no hidden costs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stock;