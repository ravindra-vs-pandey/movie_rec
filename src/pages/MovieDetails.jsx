import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const API_KEY = "6e25ca20"

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      )
      setMovie(res.data)
    }
    getMovie()
  }, [])

  if (!movie) return <div className="loading">Loading...</div>

  const genres = movie.Genre?.split(", ") || []

  return (
    <div className="page">
      <div className="details-hero">
        <div
          className="details-hero__bg"
          style={{ backgroundImage: `url(${movie.Poster})` }}
        />
        <div className="details-hero__overlay" />
        <div className="details-hero__content">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="details-hero__poster"
          />
          <div>
            <h1 className="details-hero__title">{movie.Title}</h1>
            <div className="details-rating">
              ★ {movie.imdbRating}
              <span className="details-rating__label">IMDb</span>
            </div>
            <div className="details-genres">
              {genres.map((g) => (
                <span key={g} className="details-genre-pill">{g}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="details-body">
        <p className="details-plot">{movie.Plot}</p>

        <p className="details-section-label">Details</p>
        <div className="details-meta-grid">
          {[
            { label: "Year",     value: movie.Year },
            { label: "Director", value: movie.Director },
            { label: "Actors",   value: movie.Actors },
            { label: "Rated",    value: movie.Rated },
            { label: "Runtime",  value: movie.Runtime },
            { label: "Language", value: movie.Language },
          ].map(({ label, value }) => (
            <div key={label} className="details-meta-card">
              <div className="details-meta-card__label">{label}</div>
              <div className="details-meta-card__value">{value || "—"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails