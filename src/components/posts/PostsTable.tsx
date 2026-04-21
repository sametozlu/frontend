import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { NewPost, Post } from '../../types/post'
import type { User } from '../../types/user'
import { getUsers } from '../../services/usersService'
import { createPost, deletePost, getPosts, updatePost } from '../../services/postsService'
import Loader from '../common/Loader'

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [form, setForm] = useState<NewPost>({ userId: 1, title: '', body: '' })

  async function loadPostsAndUsers() {
    try {
      setLoading(true)
      setError(null)
      const [p, u] = await Promise.all([getPosts(), getUsers()])
      setPosts(p)
      setUsers(u)
      setForm((prev) => ({ ...prev, userId: u[0]?.id || 1 }))
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadPostsAndUsers()
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return posts.filter((p) => 
      p.title.toLowerCase().includes(q) || 
      p.body.toLowerCase().includes(q)
    )
  }, [posts, query])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingPost) {
        const updated = await updatePost(editingPost.id, form)
        setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...updated } : p)))
        setEditingPost(null)
      } else {
        const created = await createPost(form)
        const tempId = created.id ?? Math.max(0, ...posts.map((p) => p.id)) + 1
        setPosts((prev) => [{ id: tempId, ...form }, ...prev])
      }
      setForm({ userId: users[0]?.id || 1, title: '', body: '' })
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      await deletePost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  function startEdit(p: Post) {
    setEditingPost(p)
    setForm({ userId: p.userId, title: p.title, body: p.body })
  }

  function cancelEdit() {
    setEditingPost(null)
    setForm({ userId: users[0]?.id || 1, title: '', body: '' })
  }

  function getUserName(userId: number) {
    const user = users.find(u => u.id === userId)
    return user ? user.name : `User ${userId}`
  }

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="🔍 Search posts by title or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="text-sm text-gray-500">
          {filtered.length} of {posts.length} posts
        </div>
      </div>

      <div className="form-container">
        <h3 className="mb-4">{editingPost ? 'Edit Post' : 'Add New Post'}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">Author</label>
            <select 
              value={form.userId} 
              onChange={(e) => setForm({ ...form, userId: Number(e.target.value) })}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} (@{u.username})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              required 
              placeholder="Enter post title" 
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              required 
              placeholder="Enter post content" 
              value={form.body} 
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={3}
            />
          </div>
          <div className="form-group">
            <div className="flex gap-2">
              <button type="submit" className={editingPost ? 'success' : ''}>
                {editingPost ? '💾 Update' : '➕ Add'} Post
              </button>
              {editingPost && (
                <button type="button" onClick={cancelEdit} className="secondary">
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {loading && <Loader label="🔄 Loading posts..." />}
      {error && (
        <div className="error-container">
          ❌ {error}
          <div className="mt-2">
            <button type="button" className="btn-sm secondary" onClick={loadPostsAndUsers}>
              Retry loading posts
            </button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Author</th>
              <th>Title</th>
              <th>Content Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="font-mono text-sm">{p.id}</td>
                <td>
                  <Link 
                    to={`/users/${p.userId}`} 
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {getUserName(p.userId)}
                  </Link>
                </td>
                <td className="font-medium">{p.title}</td>
                <td className="text-gray-600 text-sm max-w-xs truncate">
                  {p.body.length > 100 ? `${p.body.substring(0, 100)}...` : p.body}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => startEdit(p)} 
                      type="button" 
                      className="btn-sm secondary"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)} 
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
            {query ? 'No posts found matching your search.' : 'No posts available.'}
          </div>
        )}
      </div>
    </div>
  )
}


