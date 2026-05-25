import StockRow from "./StockRow"

function StocksTable({
  stocks,
  watchlist,
  setWatchlist,
  loading
}) {

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic"
        }}
      >
        Loading data, please wait...
      </p>
    )
  }

  return (
    <section className="stocks-list">

      <table>

        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>%Change</th>
            <th>Add</th>
          </tr>
        </thead>

        <tbody>

          {
            stocks.map((stock) => (

              <StockRow
                key={stock.symbol}
                stock={stock}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />

            ))
          }

        </tbody>

      </table>

    </section>
  )
}

export default StocksTable