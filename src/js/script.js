let watchlist = [];
let tbody = document.querySelector("#stocks-data");
let currentStockData = [];
import { foreignStocks, fetchAllStocks, fetchQuote } from "./api.js";

import { renderTable, updateTopGainerTopLoser, showLoading } from "./ui.js";

showLoading();
renderForeignStocks();

async function renderForeignStocks() {
  let data = await fetchAllStocks(foreignStocks);
  currentStockData = data;
  renderTable(data, watchlist);
  updateTopGainerTopLoser(data);
  document.querySelector('#last-updated').innerText =
    new Date().toLocaleTimeString('en-US', { hour12: true });
}

let inputElement = document.querySelector('#search-bar');
let btnElement = document.querySelector('#search-icon');

function performSearch() {
  let query = inputElement.value.trim().toLowerCase();

  let filteredStocks = currentStockData.filter(stock => {
    return (stock.symbol.toLowerCase().startsWith(query) ||
      stock.name.toLowerCase().startsWith(query)
    );
  });
  renderTable(filteredStocks, watchlist);
}
btnElement.addEventListener('click', () => {
  performSearch();
});
inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});


tbody.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    let tempSymbol = event.target.getAttribute('stock-symbol');

    if (event.target.classList.contains('add-btn')) {
      if (!watchlist.some(s => s.symbol === tempSymbol)) {
        let stockToAdd = currentStockData.find(s => s.symbol === tempSymbol);

        if (stockToAdd) {
          watchlist.push(stockToAdd);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
          renderWatchlist();

          event.target.innerText = 'REMOVE';
          event.target.classList.remove('add-btn');
          event.target.classList.add('remove-btn');
        }
      }
    }
    else if (event.target.classList.contains('remove-btn')) {
      let index = watchlist.findIndex(s => s.symbol === tempSymbol);
      if (index !== -1) {
        watchlist.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        renderWatchlist();

        event.target.innerText = 'Add';
        event.target.classList.remove('remove-btn');
        event.target.classList.add('add-btn');
      }
    }
  }
});

watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function renderWatchlist() {
  let watchlistContainer = document.querySelector('#watchlist-list');
  watchlistContainer.innerHTML = '';

  if (watchlist.length == 0) {
    watchlistContainer.innerHTML = '<li>Your watchlist is empty.</li>';
    return;
  }

  watchlist.forEach(stock => {
    let li = document.createElement('li');
    li.classList.add('list-data');
    li.textContent = `${stock.symbol} - ${stock.name} (₹${stock.price.toFixed(2)})  `;

    let removebtn = document.createElement('BUTTON');
    removebtn.textContent = "REMOVE"
    removebtn.classList.add('remove-btn');
    removebtn.setAttribute('stock-symbol', stock.symbol);

    removebtn.addEventListener('click', () => {
      let index = watchlist.findIndex(s => s.symbol === stock.symbol);
      if (index !== -1) {
        watchlist.splice(index, 1);
        renderWatchlist();

        let tableButton = document.querySelector(`button[stock-symbol="${stock.symbol}"]`);
        if (tableButton) {
          tableButton.innerText = 'Add';
          tableButton.classList.remove('remove-btn');
          tableButton.classList.add('add-btn');
        }
      }
    });
    li.appendChild(removebtn);
    watchlistContainer.appendChild(li);
  });
}
let toggleBtn= document.querySelector('#toggle-btn');
let body=document.body;

if(localStorage.getItem('mode')==='dark'){
  body.classList.add('dark-mode');
}

toggleBtn.addEventListener('click',()=>{
body.classList.toggle('dark-mode');
if(body.classList.contains('dark-mode')){
  localStorage.setItem('mode','dark');
}
else{
  localStorage.removeItem('mode');
}
});

let isAscending=true;
document.querySelector('#toggle-sort-btn').addEventListener('click',()=>{
  const sortedStocks=[...currentStockData].sort((a,b)=>{
    return isAscending? a.changePercent - b.changePercent : b.changePercent - a.changePercent;
  });
  renderTable(sortedStocks,watchlist);
  isAscending = !isAscending;
});
renderWatchlist();
setInterval(renderForeignStocks, 30000);