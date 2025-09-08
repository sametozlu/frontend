import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="card">
      <h1>Welcome to Data Manager</h1>
      <p className="text-gray-600 mb-6">
        Manage your users and posts with ease. This application provides full CRUD operations 
        for both users and posts, with a clean and modern interface.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-gray-50">
          <h3>👥 Users Management</h3>
          <p className="text-gray-600 mb-4">
            View, create, edit, and delete users. Each user has a unique ID, name, username, and email.
          </p>
          <Link to="/users" className="btn-primary">
            Manage Users
          </Link>
        </div>
        
        <div className="card bg-gray-50">
          <h3>📝 Posts Management</h3>
          <p className="text-gray-600 mb-4">
            View, create, edit, and delete posts. Posts are linked to users through the userId field.
          </p>
          <Link to="/posts" className="btn-primary">
            Manage Posts
          </Link>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">✨ Features</h3>
        <ul className="text-gray-600 space-y-1">
          <li>• Full CRUD operations for both users and posts</li>
          <li>• Real-time search and filtering</li>
          <li>• Responsive design for all devices</li>
          <li>• Modern UI with smooth animations</li>
          <li>• Data relationships between users and posts</li>
        </ul>
      </div>
    </div>
  )
}


