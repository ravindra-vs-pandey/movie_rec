import { useNavigate } from "react-router-dom"
import { useState } from "react"

function MovieCard({ movie, addToWishlist }) {
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToWishlist(movie)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="movie-card">
      <div
        className="movie-card__poster-wrap"
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
      >
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="movie-card__poster"
          onError={(e) => { e.target.style.opacity = "0.12" }}
        />
        <div className="movie-card__overlay">
          <span className="movie-card__view-hint">View details</span>
        </div>
      </div>

      <div className="movie-card__body">
        <div className="movie-card__title">{movie.Title}</div>
        <div className="movie-card__year">{movie.Year}</div>
        <button
          className={`movie-card__add-btn${added ? " movie-card__add-btn--saved" : ""}`}
          onClick={handleAdd}
        >
          {added ? "✓ Saved" : "+ Wishlist"}
        </button>
      </div>
    </div>
  )
}

export default MovieCard