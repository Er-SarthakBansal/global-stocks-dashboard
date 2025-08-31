export let foreignStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "Nvidia Corporation" },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "V", name: "Visa Inc." },
  { symbol: "WMT", name: "Walmart Inc." },
  { symbol: "ORCL", name: "Oracle Corporation" },
  { symbol: "BAC", name: "Bank of America" },
  { symbol: "NFLX", name: "Netflix Inc." }];

export async function fetchQuote(symbol) {
  const apiKey = "d2cp01hr01qihtcsrb30d2cp01hr01qihtcsrb3g";
  let url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`; let response = await fetch(url);
  let data = await response.json();
  return {
    price: data.c,
    changePercent: ((data.c - data.pc) / data.pc) * 100
  };
}

export async function fetchAllStocks(stocks) {
  let promises = stocks.map(stock =>
    fetchQuote(stock.symbol).then(quote => ({
      symbol: stock.symbol,
      name: stock.name,
      price: quote.price,
      changePercent: quote.changePercent
    }))
      .catch(e => {
        console.error("Error Fetching", stock.symbol, e);
        return null;
      })
  );
  const results = await Promise.all(promises);
  return results.filter(Boolean);
}
