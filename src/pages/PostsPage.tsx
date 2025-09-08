import PostsTable from '../components/posts/PostsTable'

export default function PostsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2>📝 Posts Management</h2>
        <p className="text-gray-600">
          Manage your posts with full CRUD operations. Posts are linked to users through the author field.
        </p>
      </div>
      <PostsTable />
    </div>
  )
}


