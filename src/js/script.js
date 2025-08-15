let watchlist=[];
let tbody= document.querySelector("#stocks-data");
let currentStockData=[];
// let foreignStocks=[
//   {symbol:"AAPL",name:"Apple Inc."},
//   {symbol:"MSFT",name:"Microsoft Corporation"},
//   {symbol:"TSLA",name:"Tesla Inc."},
//   {symbol:"NVDA",name:"Nvidia Corporation"},
//   {symbol:"AMZN",name:"Amazon.com Inc."},
//   {symbol:"META",name:"Meta Platforms Inc."},
//   {symbol:"JPM",name:"JPMorgan Chase & Co."},
//   {symbol:"V",name:"Visa Inc."},
//   {symbol:"WMT",name:"Walmart Inc."},
//   {symbol:"ORCL",name:"Oracle Corporation"},
//   {symbol:"BAC",name:"Bank of America"},
//   {symbol:"NFLX",name:"Netflix Inc."}];

// async function fetchQuote(symbol) {
//   const apiKey="d2cp01hr01qihtcsrb30d2cp01hr01qihtcsrb3g";
//   let url=`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;    let response=await fetch(url);
//   let data=await response.json();
//   return{
//     price:data.c,
//     changePercent:((data.c-data.pc)/data.pc)*100
//    };
// }

// async function fetchAllStocks(stocks) {
//   let promises= stocks.map(stock=>
//     fetchQuote(stock.symbol).then(quote=>({
//       symbol:stock.symbol,
//       name:stock.name,
//       price:quote.price,
//       changePercent:quote.changePercent
//     }))
//     .catch(e=>{
//     console.error("Error Fetching",stock.symbol,e);
//     return null;
//     })
//   );
//     const results=await Promise.all(promises);
//     return results.filter(Boolean);
//   }

import { foreignStocks,fetchAllStocks,fetchQuote } from "./api.js";


// function renderTable(stocks){
//   let tbody= document.querySelector("#stocks-data");
//   tbody.innerHTML="";

//   stocks.forEach(stock => {
//     let tr=document.createElement('tr');
    
//     let symbolTd=document.createElement('th');
//     symbolTd.style.fontSize='20px';
//     symbolTd.innerText=stock.symbol;

//     let nameTd=document.createElement('td');
//     nameTd.innerText=stock.name;

//     let priceTd=document.createElement('td');
//     priceTd.innerText=stock.price.toFixed(2);

//     let changeTd=document.createElement('td');
//     changeTd.innerText=stock.changePercent.toFixed(2)+'%';
//     changeTd.classList.add(stock.changePercent>=0? 'positive':'negative');

//     let addTd=document.createElement('td');
//     let actionBtn=document.createElement('button');
//     if(watchlist.some(s=>s.symbol===stock.symbol)){
//       actionBtn.innerText='REMOVE';
//       actionBtn.classList.add('remove-btn');
//     }
//     else{
//       actionBtn.innerText='Add';
//       actionBtn.classList.add('add-btn');
//     }
//     actionBtn.setAttribute('stock-symbol',stock.symbol);
//     addTd.appendChild(actionBtn);
    
//     tr.append(symbolTd,nameTd,priceTd,changeTd,addTd);
//     tbody.appendChild(tr);
//   });
// }
// renderForeignStocks();

// function updateTopGainerTopLoser(stocks){
// let topGainer=stocks.reduce((max,stock)=>stock.changePercent>max.changePercent? stock:max,stocks[0]);
// let topLoser=stocks.reduce((min,stock)=>stock.changePercent<min.changePercent? stock:min,stocks[0]);

// let gainer=document.querySelector('#gainer');
// gainer.classList.remove('positive','negative');
// gainer.classList.add(topGainer.changePercent>=0? 'positive':'negative');
// gainer.innerText=`${topGainer.name} \n(${topGainer.changePercent.toFixed(2)}%)`;

// let loser=document.querySelector('#loser');
// loser.classList.remove('positive','negative');
// loser.classList.add(topLoser.changePercent>=0? 'positive':'negative');
// loser.innerText=`${topLoser.name} \n(${topLoser.changePercent.toFixed(2)}%)`;
// }

// function showLoading(){
//   tbody.innerHTML=`<tr><td colspan='5' 
//   style="text-align=center; font-style=italic">Loading data, please wait...</td></tr>`;
// }

import { renderTable , updateTopGainerTopLoser, showLoading} from "./ui.js";

renderForeignStocks();

async function renderForeignStocks() {
  showLoading();
  let data=await fetchAllStocks(foreignStocks);
  currentStockData=data;
  renderTable(data,watchlist);
  updateTopGainerTopLoser(data);  
  document.querySelector('#last-updated').innerText =
    new Date().toLocaleTimeString('en-US', { hour12: true });
}

let inputElement=document.querySelector('#search-bar');
let btnElement=document.querySelector('#search-icon');

function performSearch(){
  let query=inputElement.value.trim().toLowerCase();

  let filteredStocks=currentStockData.filter(stock=>{
    return(stock.symbol.toLowerCase().startsWith(query)||
    stock.name.toLowerCase().startsWith(query)
  );
  });
  renderTable(filteredStocks,watchlist);
}
btnElement.addEventListener('click',()=>{
  performSearch();
});
inputElement.addEventListener('keydown',(event)=>{
  if(event.key==='Enter'){
    performSearch();
  }
});


tbody.addEventListener('click',(event)=>{
  if(event.target.tagName==='BUTTON'){
    let tempSymbol=event.target.getAttribute('stock-symbol');

    if(event.target.classList.contains('add-btn')){
      if(!watchlist.some(s=>s.symbol===tempSymbol)){
        let stockToAdd=currentStockData.find(s=>s.symbol===tempSymbol);
        
        if(stockToAdd){
          watchlist.push(stockToAdd);
          // renderForeignStocks();
          renderWatchlist();

          event.target.innerText='REMOVE';
          event.target.classList.remove('add-btn');
          event.target.classList.add('remove-btn');
        }
      }
    }
    else if(event.target.classList.contains('remove-btn')){
      let index=watchlist.findIndex(s=>s.symbol===tempSymbol);
      if(index!==-1){
        watchlist.splice(index,1);
        // renderForeignStocks();
        renderWatchlist();

        event.target.innerText='Add';
        event.target.classList.remove('remove-btn');
        event.target.classList.add('add-btn');
      }
    }
  }
});
function renderWatchlist(){
  let watchlistContainer=document.querySelector('#watchlist-list');
  watchlistContainer.innerHTML='';
  
  if(watchlist.length==0){
    watchlistContainer.innerHTML='<li>Your watchlist is empty.</li>';
    return;
  }
  
  watchlist.forEach(stock=>{
    let li=document.createElement('li');
    li.classList.add('list-data');
    li.textContent=`${stock.symbol} - ${stock.name} (₹${stock.price.toFixed(2)})`;
    
    let removebtn=document.createElement('BUTTON');
    removebtn.textContent="REMOVE"
    removebtn.classList.add('remove-btn');
    removebtn.setAttribute('stock-symbol',stock.symbol);

    removebtn.addEventListener('click',()=>{
      let index=watchlist.findIndex(s=>s.symbol===stock.symbol);
      if(index!==-1){
        watchlist.splice(index,1);
        renderWatchlist();
        // renderForeignStocks();

        let tableButton=document.querySelector(`button[stock-symbol="${stock.symbol}"]`);
        if(tableButton){
          tableButton.innerText='Add';
          tableButton.classList.remove('remove-btn');
          tableButton.classList.add('add-btn');
        }
      }
    });
    li.appendChild(removebtn);
    watchlistContainer.appendChild(li);
  });
}
renderWatchlist();
setInterval(renderForeignStocks,30000);