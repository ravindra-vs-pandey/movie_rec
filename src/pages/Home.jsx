import { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from "../components/SearchBar"
import MovieCard from "../components/MovieCard"
import Navbar from "../components/Navbar"

const API_KEY = "6e25ca20"

function Home() {
  const [movies, setMovies] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const searchMovies = async (query) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      )
      if (res.data.Search) setMovies(res.data.Search)
    } catch (err) {
      console.log("Search error:", err)
    }
  }

  const getLatestMovies = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=2024&type=movie`
      )
      if (res.data.Search) setSuggestions(res.data.Search)
    } catch (err) {
      console.log("Fetch error:", err)
    }
  }

  useEffect(() => {
    getLatestMovies()
  }, [])

  const addToWishlist = async (movie) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/wishlist/add",
        {
          username,
          movie,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 JWT added
          },
        }
      )

      console.log(res.data)

      if (res.data.msg === "Added") {
        alert("Added to wishlist")
      } else {
        alert(res.data.msg)
      }

    } catch (err) {
      console.log("Wishlist add error:", err)
      alert("Failed to add")
    }
  }

  return (
    <div className="page">
      <Navbar />

      <div className="home-body">
        <div className="home__search-section">
          <SearchBar searchMovies={searchMovies} />
        </div>

        {movies.length > 0 && (
          <div className="section">
            <div className="section__header">
              <span className="section__title">Results</span>
              <div className="section__line" />
            </div>
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  addToWishlist={addToWishlist}
                />
              ))}
            </div>
          </div>
        )}

        <div className="section">
          <div className="section__header">
            <span className="section__title">Latest Movies</span>
            <div className="section__line" />
          </div>

          {suggestions.length > 0 ? (
            <div className="movies-grid">
              {suggestions.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  addToWishlist={addToWishlist}
                />
              ))}
            </div>
          ) : (
            <p className="empty-state">Loading movies...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home