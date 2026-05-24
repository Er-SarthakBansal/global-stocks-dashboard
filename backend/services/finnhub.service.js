import axios from "axios";
async function getStockData(symbol){
  const response = await axios.get(`https://finnhub.io/api/v1/quote`,
    {
      params:{
        symbol,
        token: process.env.API_KEY,
      }
    }
  );
  return response.data;
}
export default getStockData;