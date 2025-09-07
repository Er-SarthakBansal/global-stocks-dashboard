const tbody = document.querySelector("#stocks-data");
export function renderTable(stocks, watchlist) {
  tbody.innerHTML = "";

  stocks.forEach(stock => {
    let tr = document.createElement('tr');

    let symbolTd = document.createElement('th');
    symbolTd.classList.add('responsive-th');
    symbolTd.innerText = stock.symbol;

    let nameTd = document.createElement('td');
    nameTd.innerText = stock.name;

    let priceTd = document.createElement('td');
    priceTd.innerText = stock.price.toFixed(2);

    let changeTd = document.createElement('td');
    changeTd.innerText = stock.changePercent.toFixed(2) + '%';
    changeTd.classList.add(stock.changePercent >= 0 ? 'positive' : 'negative');

    let addTd = document.createElement('td');
    let actionBtn = document.createElement('button');
    if (watchlist.some(s => s.symbol === stock.symbol)) {
      actionBtn.innerText = 'REMOVE';
      actionBtn.classList.add('remove-btn');
    }
    else {
      actionBtn.innerText = 'Add';
      actionBtn.classList.add('add-btn');
    }
    actionBtn.setAttribute('stock-symbol', stock.symbol);
    addTd.appendChild(actionBtn);

    tr.append(symbolTd, nameTd, priceTd, changeTd, addTd);
    tbody.appendChild(tr);
  });
}

export function updateTopGainerTopLoser(stocks) {
  let topGainer = stocks.reduce((max, stock) => stock.changePercent > max.changePercent ? stock : max, stocks[0]);
  let topLoser = stocks.reduce((min, stock) => stock.changePercent < min.changePercent ? stock : min, stocks[0]);

  let gainer = document.querySelector('#gainer');
  gainer.classList.remove('positive', 'negative');
  gainer.classList.add(topGainer.changePercent >= 0 ? 'positive' : 'negative');
  gainer.innerText = `${topGainer.name} \n(${topGainer.changePercent.toFixed(2)}%)`;

  let loser = document.querySelector('#loser');
  loser.classList.remove('positive', 'negative');
  loser.classList.add(topLoser.changePercent >= 0 ? 'positive' : 'negative');
  loser.innerText = `${topLoser.name} \n(${topLoser.changePercent.toFixed(2)}%)`;
}

export function showLoading() {
  tbody.innerHTML = `<tr><td colspan='5' 
  style="text-align: center; font-style: italic;">Loading data, please wait...</td></tr>`;
}
