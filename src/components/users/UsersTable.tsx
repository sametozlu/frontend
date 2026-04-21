import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User, NewUser } from '../../types/user'
import { createUser, deleteUser, getUsers, updateUser } from '../../services/usersService'
import Loader from '../common/Loader'
import { useToast } from '../../hooks/useToast'

/**
 * UsersTable Bileşeni
 * 
 * Kullanıcıları yönetmek için tam CRUD işlemleri içeren kapsamlı tablo bileşeni.
 * Özellikler: gerçek zamanlı arama, form doğrulama, optimistic güncellemeler ve
 * tüm cihaz boyutları için responsive tasarım.
 * 
 * Ana Özellikler:
 * - İsim, kullanıcı adı ve email üzerinde gerçek zamanlı arama
 * - Form doğrulama ile satır içi düzenleme
 * - Daha iyi UX için optimistic UI güncellemeleri
 * - Yıkıcı işlemler için onay diyalogları
 * - Mobil optimizasyon ile responsive tablo tasarımı
 * - Yükleme durumları ve hata yönetimi
 * - Kullanıcı detay sayfalarına doğrudan navigasyon
 * 
 * State Yönetimi:
 * - users: API'den gelen kullanıcı nesneleri dizisi
 * - loading: Yükleme durumu yönetimi için boolean
 * - error: Hata mesajı görüntüleme için string
 * - query: Arama işlevselliği için string
 * - editingUser: Şu anda düzenlenen kullanıcı nesnesi veya null
 * - form: Oluşturma/düzenleme işlemleri için form verisi
 */
export default function UsersTable() {
  // Kullanıcı geri bildirimi için toast bildirimleri
  const { showToast } = useToast()
  
  // Ana state yönetimi
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  // Oluşturma/düzenleme işlemleri için form state'i
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form, setForm] = useState<NewUser>({ name: '', username: '', email: '' })

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)
      const data = await getUsers()
      setUsers(data)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadUsers()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }, [users, query])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingUser) {
        const updated = await updateUser(editingUser.id, form)
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...updated } : u)))
        setEditingUser(null)
        showToast(`User "${form.name}" updated successfully!`, 'success')
      } else {
        const created = await createUser(form)
        const tempId = created.id ?? Math.max(0, ...users.map((u) => u.id)) + 1
        setUsers((prev) => [{ id: tempId, ...form }, ...prev])
        showToast(`User "${form.name}" created successfully!`, 'success')
      }
      setForm({ name: '', username: '', email: '' })
    } catch (e) {
      const errorMessage = (e as Error).message
      setError(errorMessage)
      showToast(`Failed to save user: ${errorMessage}`, 'error')
    }
  }

  async function handleDelete(id: number) {
    const userToDelete = users.find(u => u.id === id)
    if (!confirm(`Are you sure you want to delete user "${userToDelete?.name}"?`)) return
    
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
      showToast(`User "${userToDelete?.name}" deleted successfully!`, 'success')
    } catch (e) {
      const errorMessage = (e as Error).message
      setError(errorMessage)
      showToast(`Failed to delete user: ${errorMessage}`, 'error')
    }
  }

  function startEdit(u: User) {
    setEditingUser(u)
    setForm({ name: u.name, username: u.username, email: u.email })
  }

  function cancelEdit() {
    setEditingUser(null)
    setForm({ name: '', username: '', email: '' })
  }

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="🔍 Search users by name, username, or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="text-sm text-gray-500">
          {filtered.length} of {users.length} users
        </div>
      </div>

      <div className="form-container">
        <h3 className="mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              required 
              placeholder="Enter full name" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              required 
              placeholder="Enter username" 
              value={form.username} 
              onChange={(e) => setForm({ ...form, username: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              required 
              type="email" 
              placeholder="Enter email address" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <div className="flex gap-2">
              <button type="submit" className={editingUser ? 'success' : ''}>
                {editingUser ? '💾 Update' : '➕ Add'} User
              </button>
              {editingUser && (
                <button type="button" onClick={cancelEdit} className="secondary">
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {loading && <Loader label="🔄 Loading users..." />}
      {error && (
        <div className="error-container">
          ❌ {error}
          <div className="mt-2">
            <button type="button" className="btn-sm secondary" onClick={loadUsers}>
              Retry loading users
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="font-mono text-sm">{u.id}</td>
                <td>
                  <Link 
                    to={`/users/${u.id}`} 
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {u.name}
                  </Link>
                </td>
                <td className="text-gray-600">@{u.username}</td>
                <td className="text-gray-600">{u.email}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => startEdit(u)} 
                      type="button" 
                      className="btn-sm secondary"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(u.id)} 
                      type="button" 
                      className="btn-sm danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            {query ? 'No users found matching your search.' : 'No users available.'}
          </div>
        )}
      </div>
    </div>
  )
}


