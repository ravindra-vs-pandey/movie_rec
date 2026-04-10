import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Wishlist() {
  const [movies, setMovies] = useState([])

  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token")

  const loadWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/wishlist/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 JWT
          },
        }
      )

      console.log("WISHLIST DATA:", res.data)

      setMovies(res.data)

    } catch (err) {
      console.log("Fetch error:", err)
    }
  }

  useEffect(() => {
    loadWishlist()
  }, [])

  const removeMovie = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/wishlist/remove",
        {
          username,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 JWT
          },
        }
      )

      loadWishlist()

    } catch (err) {
      console.log("Remove error:", err)
    }
  }

  return (
    <div className="page">
      <Navbar />

      <div className="wishlist-body">
        <div className="wishlist-header">
          <h1 className="wishlist-header__title">My Wishlist</h1>
          <p className="wishlist-header__count">
            {movies.length} {movies.length === 1 ? "movie" : "movies"} saved
          </p>
          <div className="wishlist-header__divider" />
        </div>

        {movies.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty__icon">🎬</div>
            <p className="wishlist-empty__text">No movies saved yet</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="wishlist-card">
                <div className="wishlist-card__poster-wrap">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="wishlist-card__poster"
                    onError={(e) => { e.target.style.opacity = "0.12" }}
                  />
                </div>

                <div className="wishlist-card__body">
                  <div className="wishlist-card__title">{movie.Title}</div>
                  <div className="wishlist-card__year">{movie.Year}</div>

                  {/* ⭐ Rating */}
                  <select
                    defaultValue={movie.rating || 0}
                    onChange={async (e) => {
                      try {
                        await axios.post(
                          "http://localhost:5000/wishlist/update",
                          {
                            username,
                            id: movie.imdbID,
                            rating: Number(e.target.value),
                            note: movie.note || "",
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )

                        loadWishlist()

                      } catch (err) {
                        console.log("Rating error:", err)
                      }
                    }}
                  >
                    <option value="0">No Rating</option>
                    <option value="1">⭐ 1</option>
                    <option value="2">⭐⭐ 2</option>
                    <option value="3">⭐⭐⭐ 3</option>
                    <option value="4">⭐⭐⭐⭐ 4</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5</option>
                  </select>

                  {/* 💬 Note */}
                  <input
                    placeholder="Add note..."
                    defaultValue={movie.note}
                    onBlur={async (e) => {
                      try {
                        await axios.post(
                          "http://localhost:5000/wishlist/update",
                          {
                            username,
                            id: movie.imdbID,
                            rating: movie.rating || 0,
                            note: e.target.value,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                      } catch (err) {
                        console.log("Note error:", err)
                      }
                    }}
                  />

                  <button
                    className="wishlist-card__remove-btn"
                    onClick={() => removeMovie(movie.imdbID)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist