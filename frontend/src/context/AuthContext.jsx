import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('admin')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAdmin(JSON.parse(localStorage.getItem('admin') || 'null'))
    }
    setLoading(false)
  }, [])

  const login = async (phoneNumber, password) => {
    const { data } = await api.post('/auth/login', { phoneNumber, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('admin', JSON.stringify(data.admin))
    setAdmin(data.admin)
    navigate('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    setAdmin(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
