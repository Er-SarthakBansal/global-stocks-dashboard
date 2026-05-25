import { useEffect, useState } from "react"

import "./index.css"

import Header from "./components/Header"
import StatsCard from "./components/StatsCard"
import SearchBar from "./components/SearchBar"
import StocksTable from "./components/StocksTable"
import WatchList from "./components/WatchList"
import Footer from "./components/Footer"

import {
  foreignStocks,
  fetchAllStocks
} from "./services/api"

function App() {

  const [stocks, setStocks] = useState([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [watchlist, setWatchlist] =
    useState(
      JSON.parse(
        localStorage.getItem("watchlist")
      ) || []
    )

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("mode") === "dark"
    )

  const [sortAscending,
    setSortAscending] =
    useState(true)

  useEffect(() => {

    async function loadStocks() {

      setLoading(true)

      const data =
        await fetchAllStocks(
          foreignStocks
        )

      setStocks(data)

      setLoading(false)
    }

    loadStocks()

    const interval =
      setInterval(
        loadStocks,
        30000
      )

    return () =>
      clearInterval(interval)

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    )

  }, [watchlist])

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode"
      )

      localStorage.setItem(
        "mode",
        "dark"
      )

    } else {

      document.body.classList.remove(
        "dark-mode"
      )

      localStorage.removeItem("mode")
    }

  }, [darkMode])

  let filteredStocks =
    stocks.filter((stock) => {

      const query =
        search.toLowerCase()

      return (
        stock.symbol
          .toLowerCase()
          .startsWith(query)
        ||
        stock.name
          .toLowerCase()
          .startsWith(query)
      )
    })

  filteredStocks.sort((a, b) => {

    return sortAscending
      ? a.changePercent - b.changePercent
      : b.changePercent - a.changePercent
  })

  const topGainer =
    stocks.reduce(
      (max, stock) =>
        stock.changePercent >
          max.changePercent
          ? stock
          : max,
      stocks[0] || {}
    )

  const topLoser =
    stocks.reduce(
      (min, stock) =>
        stock.changePercent <
          min.changePercent
          ? stock
          : min,
      stocks[0] || {}
    )

  return (
    <div className="wrapper-container">

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>

        <section className="market-summary">

          <StatsCard
            title="Last Updated:"
            value={
              new Date()
                .toLocaleTimeString(
                  "en-US",
                  { hour12: true }
                )
            }
          />

          <StatsCard
            title="Top Gainer:"
            value={
              topGainer.name
                ?
                `${topGainer.name}
                (${topGainer.changePercent
                  ?.toFixed(2)}%)`
                :
                "--"
            }
            className="positive"
          />

          <StatsCard
            title="Top Loser:"
            value={
              topLoser.name
                ?
                `${topLoser.name}
                (${topLoser.changePercent
                  ?.toFixed(2)}%)`
                :
                "--"
            }
            className="negative"
          />

        </section>

        <SearchBar
          search={search}
          setSearch={setSearch}
          sortAscending={sortAscending}
          setSortAscending={setSortAscending}
        />

        <StocksTable
          stocks={filteredStocks}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
          loading={loading}
        />

        <div className="dashboard-bottom">

          <WatchList
            watchlist={watchlist}
          />

          <section className="chart-area">

            <h2>Price Chart</h2>

            <div className="chart-container">
              [COMING SOON]
            </div>

          </section>

        </div>

      </main>

      <hr />

      <Footer />

    </div>
  )
}

export default App