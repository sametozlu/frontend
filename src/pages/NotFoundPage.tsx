import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="card text-center py-8">
      <h2>404 - Page not found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        Go back home
      </Link>
    </div>
  )
}
