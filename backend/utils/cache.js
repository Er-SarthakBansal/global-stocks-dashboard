const cache = new Map();
const TTL = 30*1000; //30s
export async function getCache(key){
  const cached = cache.get(key);
  if(!cached){
    return null;
  }
  if(cached.expiry<Date.now()){
    cache.delete(key);
    return null;
  }
  return cached.data;
}
export async function setCache(key,data){
  cache.set(key,
    {
      data,
      expiry: Date.now() + TTL
    }
  );
}