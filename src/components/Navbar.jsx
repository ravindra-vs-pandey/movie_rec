import { useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const name = localStorage.getItem("displayName")

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <span className="navbar__logo" onClick={() => navigate("/home")}>
          Cine<span className="navbar__logo-accent">vault</span>
        </span>

        <div className="navbar__right">
          {name && (
            <span className="navbar__greeting">
              Hello, <strong>{name}</strong>
            </span>
          )}

          <button
            className={`navbar__btn${isActive("/home") ? " navbar__btn--active" : ""}`}
            onClick={() => navigate("/home")}
          >
            Home
          </button>

          <button
            className={`navbar__btn${isActive("/wishlist") ? " navbar__btn--active" : ""}`}
            onClick={() => navigate("/wishlist")}
          >
            Wishlist
          </button>

          <div className="navbar__divider" />

          <button className="navbar__logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar