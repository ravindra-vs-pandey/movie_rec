import { useState } from "react"

function SearchBar({ searchMovies }) {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (query.trim()) searchMovies(query.trim())
  }

  return (
    <div className="searchbar">
      <div className="searchbar__input-wrap">
        <span className="searchbar__icon">⌕</span>
        <input
          className="searchbar__input"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <button
        className={`searchbar__btn${!query.trim() ? " searchbar__btn--empty" : ""}`}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar