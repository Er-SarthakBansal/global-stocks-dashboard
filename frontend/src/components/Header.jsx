function Header({ darkMode, setDarkMode }) {

  return (
    <header id="header-container">

      <h2>
        Global Stocks Dashboard
      </h2>

      <button
        id="toggle-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

    </header>
  )
}

export default Header