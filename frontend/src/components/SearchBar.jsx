function SearchBar({
  search,
  setSearch,
  sortAscending,
  setSortAscending
}) {

  return (
    <section className="search-section">

      <input
        type="text"
        id="search-bar"
        placeholder="Search Stocks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button
        id="toggle-sort-btn"
        onClick={() =>
          setSortAscending(!sortAscending)
        }
      >
        Sort (⇅)
      </button>

    </section>
  )
}

export default SearchBar