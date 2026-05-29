import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const persianDate = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  return d.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const isExpired = (iso) => {
  if (!iso) return true
  return new Date(iso) < new Date()
}

export default function Dashboard() {
  const [athletes, setAthletes] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchLastName, setSearchLastName] = useState('')
  const [loading, setLoading] = useState(true)

  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registerForm, setRegisterForm] = useState({ name: '', lastName: '', phoneNumber: '', password: '' })

  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [phoneTarget, setPhoneTarget] = useState(null)
  const [newPhone, setNewPhone] = useState('')

  const fetchAthletes = useCallback(async () => {
    try {
      const { data } = await api.get('/athletes')
      setAthletes(data)
    } catch { /* ignore */ }
  }, [])

  useEffect(() => { fetchAthletes().finally(() => setLoading(false)) }, [fetchAthletes])

  const handleSearch = async () => {
    if (!searchName.trim() || !searchLastName.trim()) return
    try {
      const { data } = await api.get('/athlete/fullname', {
        params: { name: searchName.trim(), lastName: searchLastName.trim() }
      })
      setAthletes(data)
    } catch { /* ignore */ }
  }

  const resetSearch = () => {
    setSearchName('')
    setSearchLastName('')
    fetchAthletes()
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await api.post('/register/athlete', registerForm)
      setShowRegisterModal(false)
      setRegisterForm({ name: '', lastName: '', phoneNumber: '', password: '' })
      fetchAthletes()
    } catch (err) {
      alert(err.response?.data?.error || 'خطا در ثبت')
    }
  }

  const handleRenew = async (id) => {
    try {
      await api.patch(`/athlete/${id}/renew`)
      fetchAthletes()
    } catch (err) {
      alert(err.response?.data?.error || 'خطا در تمدید')
    }
  }

  const openPhoneModal = (athlete) => {
    setPhoneTarget(athlete)
    setNewPhone('')
    setShowPhoneModal(true)
  }

  const handleUpdatePhone = async (e) => {
    e.preventDefault()
    if (!phoneTarget) return
    try {
      await api.patch(`/athlete/${phoneTarget.id}/update/phonenumber`, { phoneNumber: newPhone })
      setShowPhoneModal(false)
      setPhoneTarget(null)
      fetchAthletes()
    } catch (err) {
      alert(err.response?.data?.error || 'خطا در ویرایش شماره')
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">مدیریت ورزشکاران</h1>
          <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>
            + ورزشکار جدید
          </button>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex flex-wrap items-end gap-2">
              <div className="form-control">
                <label className="label py-1"><span className="label-text">نام</span></label>
                <input className="input input-bordered input-sm" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="جستجوی نام" />
              </div>
              <div className="form-control">
                <label className="label py-1"><span className="label-text">نام خانوادگی</span></label>
                <input className="input input-bordered input-sm" value={searchLastName} onChange={(e) => setSearchLastName(e.target.value)} placeholder="جستجوی نام خانوادگی" />
              </div>
              <button className="btn btn-sm btn-primary" onClick={handleSearch}>جستجو</button>
              <button className="btn btn-sm btn-ghost" onClick={resetSearch}>نمایش همه</button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>شماره تلفن</th>
                <th>تاریخ عضویت</th>
                <th>تاریخ انقضا</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-8"><span className="loading loading-spinner loading-md"></span></td></tr>
              ) : athletes.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-base-content/50">هیچ ورزشکاری یافت نشد</td></tr>
              ) : athletes.map((a, i) => (
                <tr key={a.id}>
                  <td>{i + 1}</td>
                  <td>{a.name}</td>
                  <td>{a.lastName}</td>
                  <td>{a.phoneNumber}</td>
                  <td>{persianDate(a.createdAt)}</td>
                  <td>{persianDate(a.expire_date)}</td>
                  <td>
                    {isExpired(a.expire_date)
                      ? <span className="badge badge-error badge-sm">منقضی</span>
                      : <span className="badge badge-success badge-sm">فعال</span>}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-xs btn-success" onClick={() => handleRenew(a.id)}>تمدید</button>
                      <button className="btn btn-xs btn-warning" onClick={() => openPhoneModal(a)}>ویرایش شماره</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRegisterModal && (
        <dialog className="modal modal-open" onClick={() => setShowRegisterModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">ثبت ورزشکار جدید</h3>
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="form-control"><label className="label"><span className="label-text">نام</span></label><input className="input input-bordered" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} required /></div>
              <div className="form-control"><label className="label"><span className="label-text">نام خانوادگی</span></label><input className="input input-bordered" value={registerForm.lastName} onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })} required /></div>
              <div className="form-control"><label className="label"><span className="label-text">شماره تلفن</span></label><input className="input input-bordered" value={registerForm.phoneNumber} onChange={(e) => setRegisterForm({ ...registerForm, phoneNumber: e.target.value })} required placeholder="09xxxxxxxxx" /></div>
              <div className="form-control"><label className="label"><span className="label-text">رمز عبور</span></label><input type="password" className="input input-bordered" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required /></div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">ثبت</button>
                <button type="button" className="btn" onClick={() => setShowRegisterModal(false)}>انصراف</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {showPhoneModal && phoneTarget && (
        <dialog className="modal modal-open" onClick={() => setShowPhoneModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg mb-4">ویرایش شماره تلفن</h3>
            <p className="mb-2">ورزشکار: {phoneTarget.name} {phoneTarget.lastName}</p>
            <p className="mb-4 text-sm">شماره فعلی: {phoneTarget.phoneNumber}</p>
            <form onSubmit={handleUpdatePhone} className="space-y-3">
              <div className="form-control"><label className="label"><span className="label-text">شماره جدید</span></label><input className="input input-bordered" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required placeholder="09xxxxxxxxx" /></div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">ذخیره</button>
                <button type="button" className="btn" onClick={() => setShowPhoneModal(false)}>انصراف</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  )
}
