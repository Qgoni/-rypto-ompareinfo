const axios = require('axios');

const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
});

const fetchCoinData = async (coinSymbol) => {
  try {
    const response = await api.get(`/price?fsym=${coinSymbol}&tsyms=USD,EUR,BTC`);
    const data = response.data;
    console.log(`Current price of ${coinSymbol}:`);
    console.log(`USD: $${data.USD.toFixed(2)}`);
    console.log(`EUR: €${data.EUR.toFixed(2)}`);
    console.log(`BTC: ฿${data.BTC.toFixed(8)}`);
  } catch (error) {
    console.error(`Error fetching coin data for ${coinSymbol}:`, error.message);
  }
};

const fetchCoinDataMultiple = async (coinSymbols) => {
  try {
    const responses = await Promise.all(coinSymbols.map((symbol) => api.get(`/price?fsym=${symbol}&tsyms=USD,EUR,BTC`)));
    const data = responses.map((response) => response.data);
    console.log('Current price of coins:');
    data.forEach((coinData, index) => {
      console.log(`${coinSymbols[index]}:`);
      console.log(`USD: $${coinData.USD.toFixed(2)}`);
      console.log(`EUR: €${coinData.EUR.toFixed(2)}`);
      console.log(`BTC: ฿${coinData.BTC.toFixed(8)}`);
      console.log();
    });
  } catch (error) {
    console.error('Error fetching coin data:', error.message);
  }
};

// Example usage:
fetchCoinData('BTC');
fetchCoinDataMultiple(['BTC', 'ETH', 'LTC']);
