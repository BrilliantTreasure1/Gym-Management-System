import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { admin, logout } = useAuth()

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1">
          <span className="text-xl font-bold">🏋️ پنل مدیریت باشگاه</span>
        </div>
        <div className="flex-none gap-2">
          <div className="text-sm">{admin?.name} {admin?.lastName}</div>
          <button className="btn btn-ghost btn-circle" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
      <main className="p-4">{children}</main>
    </div>
  )
}
