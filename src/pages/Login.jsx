import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) return
    setLoading(true)

    try {
      const res = await axios.post(import.meta.env.VITE_API_LOGIN, formData)
      localStorage.setItem('token', res.data.token)
      setSuccess('Login successful!')

      // Check if profile exists
      try {
        const profileRes = await axios.get(`${import.meta.env.VITE_API}/profile/me`, {
          headers: { Authorization: `Bearer ${res.data.token}` }
        })

        // Profile exists - go to dashboard
        if (profileRes.data) {
          setTimeout(() => navigate('/dashboard'), 1200)
        }
        
      } catch (profileErr) {
        // Profile doesn't exist (404) or error - go to profile creation
        if (profileErr.response?.status === 404) {
          setSuccess('Please create your profile first!')
          setTimeout(() => navigate('/profile'), 1200)
        } else {
          // For any other error, also redirect to profile
          setTimeout(() => navigate('/profile'), 1200)
        }
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>
              Sign in or <Link to="/register">create an account</Link>
            </p>
          </div>

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login