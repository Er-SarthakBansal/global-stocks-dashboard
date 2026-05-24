import getStockData from "../services/finnhub.service.js";
import { getCache, setCache } from "../utils/cache.js";
export const fetchStockData = async (req, res) => {
  const symbol = req.query.symbol;
  console.log(symbol);
  if (!symbol) {
    return res.status(400).json({ error: 'Missing symbol query parameter' });
  }
  try {
    const cacheData = await getCache(symbol);
    if(cacheData){
      console.log(`[CACHE HIT] ${symbol}`);
      return res.json({source: "cache", data:cacheData});
    }
    console.log(`[CACHE MISS] ${symbol}`);
    const data = await getStockData(symbol);
    setCache(symbol,data);
    res.json({source: "api", data});
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stock data' });
  }
}