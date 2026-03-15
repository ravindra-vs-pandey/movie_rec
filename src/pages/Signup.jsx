import { useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  const signup = async () => {
    setLoading(true)
    try {
      await setDoc(doc(db, "users", username), {
        username,
        password,
        displayName,
      })
      setDone(true)
      setTimeout(() => navigate("/"), 1800)
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
          <p className="auth-logo__tagline">Create your account</p>
          <div className="auth-logo__divider" />
        </div>

        <p className="auth-step-label">New Account</p>

        <div className="auth-form">
          <input
            className="auth-input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            className="auth-input"
            placeholder="Display name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signup()}
            autoComplete="new-password"
          />
          <button
            className="auth-btn"
            onClick={signup}
            disabled={loading || done}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        {done && (
          <div className="auth-success">
            Account created! Redirecting to login...
          </div>
        )}

        <p className="auth-footer">
          Already have an account?
          <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default Signup