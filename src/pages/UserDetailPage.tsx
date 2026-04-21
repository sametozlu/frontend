import { useCallback, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { User } from '../types/user'
import type { Post } from '../types/post'
import { getUsers } from '../services/usersService'
import { getPostsByUser } from '../services/postsService'
import Loader from '../components/common/Loader'

export default function UserDetailPage() {
  const params = useParams()
  const userId = Number(params.id)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUserDetail = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [users, userPosts] = await Promise.all([getUsers(), getPostsByUser(userId)])
      setUser(users.find((u) => u.id === userId) ?? null)
      setPosts(userPosts)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    void loadUserDetail()
  }, [userId])

  if (loading) return <Loader label="🔄 Loading user details..." />
  if (error) {
    return (
      <div className="error-container">
        ❌ {error}
        <div className="mt-2">
          <button type="button" className="btn-sm secondary" onClick={loadUserDetail}>
            Retry loading details
          </button>
        </div>
      </div>
    )
  }
  if (!user) return <div className="error-container">❌ User not found.</div>

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/users">Users</Link>
        <span className="breadcrumb-separator">›</span>
        <span>{user.name}</span>
      </div>

      <div className="user-detail-card">
        <h2>👤 {user.name}</h2>
        <div className="user-info">
          <div className="user-info-item">
            <span className="user-info-label">ID</span>
            <span className="user-info-value font-mono">{user.id}</span>
          </div>
          <div className="user-info-item">
            <span className="user-info-label">Username</span>
            <span className="user-info-value">@{user.username}</span>
          </div>
          <div className="user-info-item">
            <span className="user-info-label">Email</span>
            <span className="user-info-value">{user.email}</span>
          </div>
        </div>
      </div>

      <div className="posts-list">
        <div className="flex justify-between items-center mb-4">
          <h3>📝 Posts by {user.name}</h3>
          <span className="text-sm text-gray-500">{posts.length} posts</span>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            This user hasn't written any posts yet.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-title">{post.title}</div>
                <div className="post-body">{post.body}</div>
                <div className="text-xs text-gray-400 mt-2">
                  Post ID: {post.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


