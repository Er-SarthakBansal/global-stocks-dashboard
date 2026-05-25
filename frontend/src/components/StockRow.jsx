function StockRow({
  stock,
  watchlist,
  setWatchlist
}) {

  const isAdded = watchlist.some(
    (item) =>
      item.symbol === stock.symbol
  )

  function handleWatchlist() {

    if (isAdded) {

      const filtered =
        watchlist.filter(
          (item) =>
            item.symbol !== stock.symbol
        )

      setWatchlist(filtered)

    } else {

      setWatchlist([
        ...watchlist,
        stock
      ])
    }
  }

  return (
    <tr>

      <th className="responsive-th">
        {stock.symbol}
      </th>

      <td>{stock.name}</td>

      <td>
        ₹{stock.price.toFixed(2)}
      </td>

      <td
        className={
          stock.changePercent >= 0
            ? "positive"
            : "negative"
        }
      >
        {stock.changePercent.toFixed(2)}%
      </td>

      <td>

        <button
          className={
            isAdded
              ? "remove-btn"
              : "add-btn"
          }
          onClick={handleWatchlist}
        >
          {isAdded
            ? "REMOVE"
            : "Add"}
        </button>

      </td>

    </tr>
  )
}

export default StockRow