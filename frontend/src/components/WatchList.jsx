function Watchlist({
  watchlist
}) {

  return (
    <section className="watchlist-section">

      <div id="Watchlist-heading">
        Watchlist:
      </div>

      <br />

      <ul id="watchlist-list">

        {
          watchlist.length === 0
            ? (
              <li>
                Your watchlist is empty.
              </li>
            )
            : (
              watchlist.map((stock) => (

                <li
                  key={stock.symbol}
                  className="list-data"
                >

                  {stock.symbol}
                  {" - "}
                  {stock.name}
                  {" "}
                  (
                  ₹{stock.price.toFixed(2)}
                  )

                </li>

              ))
            )
        }

      </ul>

    </section>
  )
}

export default Watchlist