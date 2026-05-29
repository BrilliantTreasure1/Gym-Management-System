import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(phoneNumber, password)
    } catch (err) {
      setError(err.response?.data?.error || 'خطا در ورود')
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold text-center mb-2">ورود به پنل مدیریت</h2>
          <p className="text-center text-sm mb-6">باشگاه بدنسازی</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">شماره تلفن</span></label>
              <input
                type="text"
                placeholder="09xxxxxxxxx"
                className="input input-bordered"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">رمز عبور</span></label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-error text-sm">{error}</div>}

            <button type="submit" className="btn btn-primary w-full">ورود</button>
          </form>
        </div>
      </div>
    </div>
  )
}
