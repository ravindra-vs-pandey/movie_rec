import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import Navbar from "../components/Navbar"

function Wishlist() {
  const [movies, setMovies] = useState([])
  const username = localStorage.getItem("username")

  const loadWishlist = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", username, "wishlist")
    )
    const list = []
    querySnapshot.forEach((docu) => list.push(docu.data()))
    setMovies(list)
  }

  useEffect(() => {
    loadWishlist()
  }, [])

  const removeMovie = async (id) => {
    await deleteDoc(doc(db, "users", username, "wishlist", id))
    loadWishlist()
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