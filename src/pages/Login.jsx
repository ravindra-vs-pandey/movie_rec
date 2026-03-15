import { useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import "../app.css"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async () => {
    setLoading(true)
    try {
      const userRef = doc(db, "users", username)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const data = userSnap.data()
        if (data.password === password) {
          localStorage.setItem("username", username)
          localStorage.setItem("displayName", data.displayName)
          navigate("/home")
        } else {
          alert("Wrong password")
        }
      } else {
        alert("User not found")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page--center">
      <div className="auth-card">
        <div className="auth-logo">
          <h1 className="auth-logo__name">
            Cine<span className="auth-logo__accent">vault</span>
          </h1>
          <p className="auth-logo__tagline">Your personal movie library</p>
          <div className="auth-logo__divider" />
        </div>

        <div className="auth-form">
          <input
            className="auth-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            autoComplete="current-password"
          />
          <button
            className="auth-btn"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <div className="auth-demo">
          <span className="auth-demo__label">Demo account</span>
          <span className="auth-demo__cred">username: <strong>ravindra</strong></span>
          <span className="auth-demo__cred">password: <strong>1234</strong></span>
        </div>

        <p className="auth-footer">
          Don't have an account?
          <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  )
}

export default Login