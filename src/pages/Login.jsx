import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async () => {
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      })

      if (res.data.msg === "Login success") {
        // ✅ store user data
        localStorage.setItem("username", res.data.user.username)
        localStorage.setItem("displayName", res.data.user.displayName)

        // 🔐 store JWT token
        localStorage.setItem("token", res.data.token)

        navigate("/home")
      } else {
        alert(res.data.msg)
      }

    } catch (err) {
      console.log("Login error:", err)
      alert("Login failed")
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
            onChange={(e) => setUsername(e.target.value.trim())}
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
          <span className="auth-demo__cred">
            username: <strong>ravindra</strong>
          </span>
          <span className="auth-demo__cred">
            password: <strong>1234</strong>
          </span>
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